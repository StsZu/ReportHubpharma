import React, { useState, useEffect } from 'react';
import { Report } from '../types';
import { X, Code, FileText, CheckCircle } from 'lucide-react';

interface ReportUploaderProps {
  onUpload: (report: Omit<Report, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

export default function ReportUploader({ onUpload, onClose }: ReportUploaderProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [html, setHtml] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !html) return;

    onUpload({ title, description, html });
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Code size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Завантажити новий звіт</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Звіт успішно додано!</h3>
              <p className="text-gray-500">Повертаємось до списку...</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText size={16} /> Назва звіту
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Наприклад: Аналіз ринку 2026"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Короткий опис (необов'язково)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Про що цей звіт..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all h-20 resize-none"
                />
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Code size={16} /> HTML код звіту
                </label>
                <textarea
                  required
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  placeholder="Вставте повний HTML код тут..."
                  className="w-full flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-mono text-sm min-h-[300px]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                >
                  Зберегти звіт
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
