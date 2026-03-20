import { useState, useEffect, useRef } from 'react';
import { Report } from './types';
import ReportList from './components/ReportList';
import ReportViewer from './components/ReportViewer';
import ReportUploader from './components/ReportUploader';
import Dashboard from './components/Dashboard';
import { Layout, Database, ShieldCheck, Github, BarChart3, Users, FileText, Bell } from 'lucide-react';

type View = 'reports' | 'dashboard' | 'analytics' | 'team';

const STORAGE_KEY = 'pharma_reports';
const DEFAULT_REPORTS: Report[] = [];

export default function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentView, setCurrentView] = useState<View>('reports');
  const isInitialMount = useRef(true);

  // Load reports from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setReports(parsed);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (e) {
        console.error('Failed to load reports:', e);
        localStorage.removeItem(STORAGE_KEY);
        setReports([]);
      }
    } else {
      setReports([]);
    }
  }, []);

  // Save reports to localStorage whenever they change, but skip initial empty state
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  }, [reports]);

  const handleReset = () => {
    if (window.confirm('Ви впевнені, що хочете видалити ВСІ звіти та очистити сховище?')) {
      localStorage.removeItem(STORAGE_KEY);
      setReports([]);
      setCurrentView('reports');
    }
  };

  const handleUpload = (newReport: Omit<Report, 'id' | 'createdAt'>) => {
    const report: Report = {
      ...newReport,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    };
    setReports(prev => [report, ...prev]);
  };

  const handleDelete = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard reports={reports} />;
      case 'analytics':
        return (
          <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in duration-500">
            <h1 className="text-4xl font-black mb-4">Аналітика</h1>
            <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
              <BarChart3 size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Модуль поглибленої аналітики в розробці...</p>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in duration-500">
            <h1 className="text-4xl font-black mb-8">Команда</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Олександр Коваль', role: 'Старший аналітик', img: 'https://picsum.photos/seed/alex/100/100' },
                { name: 'Марія Петренко', role: 'Data Scientist', img: 'https://picsum.photos/seed/maria/100/100' },
                { name: 'Ігор Сидоренко', role: 'Менеджер проектів', img: 'https://picsum.photos/seed/igor/100/100' },
              ].map(member => (
                <div key={member.name} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <img src={member.img} className="w-12 h-12 rounded-full" alt={member.name} referrerPolicy="no-referrer" />
                  <div>
                    <div className="font-bold">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <ReportList 
            reports={reports} 
            onSelect={setSelectedReport} 
            onDelete={handleDelete}
            onAddClick={() => setIsUploading(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('reports')}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Layout size={18} />
              </div>
              <span className="font-black text-xl tracking-tighter">ReportHub<span className="text-indigo-600">.pharma</span></span>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className={`relative py-2 transition-colors ${currentView === 'dashboard' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                Дашборд
                {currentView === 'dashboard' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full animate-in fade-in slide-in-from-bottom-1" />}
              </button>
              <button 
                onClick={() => setCurrentView('reports')}
                className={`relative py-2 transition-colors ${currentView === 'reports' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                Звіти
                {currentView === 'reports' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full animate-in fade-in slide-in-from-bottom-1" />}
              </button>
              <button 
                onClick={() => setCurrentView('analytics')}
                className={`relative py-2 transition-colors ${currentView === 'analytics' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                Аналітика
                {currentView === 'analytics' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full animate-in fade-in slide-in-from-bottom-1" />}
              </button>
              <button 
                onClick={() => setCurrentView('team')}
                className={`relative py-2 transition-colors ${currentView === 'team' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                Команда
                {currentView === 'team' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full animate-in fade-in slide-in-from-bottom-1" />}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors relative">
                <Bell size={20} />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
                <ShieldCheck size={14} />
                <span>Secure Storage</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 border border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20">
        {renderView()}
      </main>

      {/* Modals */}
      {selectedReport && (
        <ReportViewer 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)} 
        />
      )}

      {isUploading && (
        <ReportUploader 
          onUpload={handleUpload} 
          onClose={() => setIsUploading(false)} 
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white">
                  <Layout size={14} />
                </div>
                <span className="font-black text-lg tracking-tighter">ReportHub</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Професійна платформа для зберігання та візуалізації стратегічних звітів фармацевтичної галузі.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">Продукт</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-indigo-600">Можливості</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Безпека</a></li>
                  <li><a href="#" className="hover:text-indigo-600">API</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">Компанія</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-indigo-600">Про нас</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Контакти</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Блог</a></li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-900">Статус системи</h4>
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Всі системи працюють стабільно</span>
              </div>
              <div className="pt-2">
                <button 
                  onClick={handleReset}
                  className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors font-bold"
                >
                  Очистити дані (Dev)
                </button>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><Database size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><ShieldCheck size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><Github size={20} /></a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© 2026 ReportHub Pharma. Платформа для внутрішнього використання.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-900">Політика конфіденційності</a>
              <a href="#" className="hover:text-gray-900">Умови використання</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
