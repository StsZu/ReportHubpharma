import { useState, useEffect, useRef } from 'react';
import { Report } from './types';
import ReportList from './components/ReportList';
import ReportViewer from './components/ReportViewer';
import ReportUploader from './components/ReportUploader';
import Dashboard from './components/Dashboard';
import { Layout, Database, ShieldCheck, Github, BarChart3, Users, FileText, Bell } from 'lucide-react';

type View = 'reports' | 'dashboard' | 'analytics' | 'team';

const DEFAULT_REPORTS: Report[] = [
  {
    id: '1',
    title: 'Стратегічна стійкість: Фармацевтичні ланцюги постачання 2026',
    description: 'Аналіз впливу геополітичних конфліктів, логістичних криз та нових стандартів GMP на глобальний ринок медикаментів.',
    createdAt: new Date().toISOString(),
    html: `<!DOCTYPE html>
<html lang="uk" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Стратегічна стійкість: Фармацевтичні ланцюги постачання 2026</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#0B132B',
                        secondary: '#F4F4F9',
                        surface: '#FFFFFF',
                        accent1: '#00E5FF',
                        accent2: '#FF5722',
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0B132B; }
        ::-webkit-scrollbar-thumb { background: #3A86FF; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #00E5FF; }
        .glow-text { text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); }
    </style>
</head>
<body class="font-sans text-gray-800 bg-secondary antialiased">
    <nav class="fixed w-full z-50 bg-primary/90 backdrop-blur-md border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <div class="flex-shrink-0 flex items-center gap-2">
                    <svg class="w-8 h-8 text-accent1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                    <span class="text-white font-bold text-xl tracking-tight">PharmaChain<span class="text-accent1">'26</span></span>
                </div>
            </div>
        </div>
    </nav>
    <section id="hero" class="relative bg-primary pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
        <div class="absolute inset-0 opacity-20">
            <div class="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-accent1 blur-[120px] rounded-full"></div>
            <div class="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-accent2 blur-[120px] rounded-full"></div>
            <div class="absolute inset-0" style="background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
        </div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span class="inline-block py-1 px-3 rounded-full bg-gray-800 border border-gray-700 text-accent1 text-sm font-semibold mb-6 tracking-wide uppercase">
                Глобальна аналітика 2026-2030
            </span>
            <h1 class="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Структурна волатильність: <br class="hidden md:block">
                Майбутнє <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent1 to-blue-500">фармацевтичних ланцюгів</span> постачання
            </h1>
            <p class="mt-4 max-w-2xl text-lg md:text-xl text-gray-300 mx-auto mb-10">
                Як геополітичні конфлікти, логістичні кризи та нові стандарти GMP трансформують глобальний ринок медикаментів, API та сировини.
            </p>
        </div>
    </section>
</body>
</html>`
  },
  {
    id: '2',
    title: 'Стратегічна реконфігурація фармацевтичного ланцюга постачань 2026',
    description: 'Від епохи оптимізації витрат до ери стійкості. Як тарифи та регуляторні зміни формують ринок.',
    createdAt: new Date().toISOString(),
    html: `<!DOCTYPE html>
<html lang="uk" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Стратегічна реконфігурація фармацевтичного ланцюга постачань 2026</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] },
                    colors: {
                        navy: { 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
                        teal: { 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e' },
                        coral: { 500: '#f43f5e', 600: '#e11d48' }
                    }
                }
            }
        }
    </script>
    <style>
        .hero-pattern { background-color: #0f172a; background-image: radial-gradient(#1e293b 1px, transparent 1px); background-size: 32px 32px; }
    </style>
</head>
<body class="font-sans text-slate-600 antialiased bg-white">
    <header class="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <div class="flex-shrink-0 flex items-center">
                    <span class="font-extrabold text-2xl tracking-tighter text-navy-900">
                        Pharma<span class="text-teal-600">Strategy</span>
                    </span>
                </div>
            </div>
        </div>
    </header>
    <section class="hero-pattern pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/95 to-transparent"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="max-w-2xl">
                <p class="text-teal-500 font-semibold tracking-wider uppercase text-sm mb-4 border-l-2 border-teal-500 pl-3">Аналітичний звіт 2026</p>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                    Стратегічна реконфігурація глобального фарм-ланцюга.
                </h1>
                <p class="text-lg text-slate-300 mb-10 font-light leading-relaxed">
                    Від епохи оптимізації витрат до ери стійкості. Дізнайтеся, як геополітика, нові тарифи та регуляторні зміни формують ринок ліків.
                </p>
            </div>
        </div>
    </section>
</body>
</html>`
  }
];

export default function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentView, setCurrentView] = useState<View>('reports');
  const isInitialMount = useRef(true);

  // Load reports from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pharma_reports');
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {
        setReports(DEFAULT_REPORTS);
      }
    } else {
      setReports(DEFAULT_REPORTS);
      localStorage.setItem('pharma_reports', JSON.stringify(DEFAULT_REPORTS));
    }
  }, []);

  // Save reports to localStorage whenever they change, but skip initial empty state
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem('pharma_reports', JSON.stringify(reports));
  }, [reports]);

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
