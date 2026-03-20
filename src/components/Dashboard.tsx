import { Report } from '../types';
import { BarChart3, PieChart, TrendingUp, FileText, Clock, Users } from 'lucide-react';

interface DashboardProps {
  reports: Report[];
}

export default function Dashboard({ reports }: DashboardProps) {
  const totalReports = reports.length;
  const latestReport = reports[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Дашборд</h1>
        <p className="text-gray-500">Огляд активності та ключові метрики системи</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <FileText size={24} />
          </div>
          <div className="text-3xl font-black text-gray-900">{totalReports}</div>
          <div className="text-sm text-gray-500 font-medium">Всього звітів</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <TrendingUp size={24} />
          </div>
          <div className="text-3xl font-black text-gray-900">+{totalReports > 0 ? 1 : 0}</div>
          <div className="text-sm text-gray-500 font-medium">Нових за тиждень</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <div className="text-3xl font-black text-gray-900">12</div>
          <div className="text-sm text-gray-500 font-medium">Активних аналітиків</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-indigo-600" />
            Розподіл за категоріями
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Стратегічні', value: 65, color: 'bg-indigo-600' },
              { label: 'Операційні', value: 20, color: 'bg-emerald-500' },
              { label: 'Фінансові', value: 15, color: 'bg-amber-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className="text-gray-500">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock size={20} className="text-indigo-600" />
            Останній звіт
          </h3>
          {latestReport ? (
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-1">{latestReport.title}</h4>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{latestReport.description}</p>
              <div className="text-xs text-indigo-600 font-bold">
                Додано: {new Date(latestReport.createdAt).toLocaleDateString('uk-UA')}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 italic">Звітів поки немає</div>
          )}
        </div>
      </div>
    </div>
  );
}
