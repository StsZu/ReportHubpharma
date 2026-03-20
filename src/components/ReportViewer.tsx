import { useEffect, useRef } from 'react';
import { Report } from '../types';
import { X, Maximize2, Minimize2, Download } from 'lucide-react';

interface ReportViewerProps {
  report: Report;
  onClose: () => void;
}

export default function ReportViewer({ report, onClose }: ReportViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const blob = new Blob([report.html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;

      return () => URL.revokeObjectURL(url);
    }
  }, [report.html]);

  const handleDownload = () => {
    const blob = new Blob([report.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-white z-[200] flex flex-col animate-in slide-in-from-bottom duration-500">
      <header className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4 overflow-hidden">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 flex-shrink-0"
          >
            <X size={24} />
          </button>
          <h2 className="text-lg font-bold text-gray-900 truncate">{report.title}</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Завантажити</span>
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-md shadow-indigo-100"
          >
            Закрити
          </button>
        </div>
      </header>

      <div className="flex-1 bg-gray-50 overflow-hidden relative">
        <iframe
          ref={iframeRef}
          title={report.title}
          className="w-full h-full border-none shadow-inner"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
