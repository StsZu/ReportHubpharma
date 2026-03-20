import { Report } from '../types';
import { Calendar, ChevronRight, Trash2, FileText, Search, Plus } from 'lucide-react';
import { useState } from 'react';

interface ReportListProps {
  reports: Report[];
  onSelect: (report: Report) => void;
  onDelete: (id: string) => void;
  onAddClick: () => void;
}

export default function ReportList({ reports, onSelect, onDelete, onAddClick }: ReportListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Видалити звіт?</h3>
            <p className="text-gray-500 mb-8">Цю дію неможливо буде скасувати. Ви впевнені?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeletingId(null)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
              >
                Скасувати
              </button>
              <button 
                onClick={() => {
                  onDelete(deletingId);
                  setDeletingId(null);
                }}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-100"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Архів звітів</h1>
          <p className="text-gray-500">Управління стратегічною аналітикою PharmaChain</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Пошук звітів..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl w-full md:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={onAddClick}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            <Plus size={20} />
            <span>Додати</span>
          </button>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <FileText size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Звітів не знайдено</h3>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">Спробуйте змінити запит або завантажте свій перший HTML звіт.</p>
          <button 
            onClick={onAddClick}
            className="text-indigo-600 font-bold hover:underline"
          >
            Завантажити зараз
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div 
              key={report.id}
              className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <FileText size={24} />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingId(report.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Видалити звіт"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                {report.title}
              </h3>
              
              <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-grow">
                {report.description || 'Опис відсутній для цього стратегічного звіту.'}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                  <Calendar size={14} />
                  <span>{new Date(report.createdAt).toLocaleDateString('uk-UA')}</span>
                </div>
                <button 
                  onClick={() => onSelect(report)}
                  className="flex items-center gap-1 text-indigo-600 font-bold text-sm hover:gap-2 transition-all"
                >
                  Переглянути
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
