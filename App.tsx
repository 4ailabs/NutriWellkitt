
import React, { useState, useMemo } from 'react';
import { AppMode, Recipe, MolecularMechanism, TroubleshootingItem, Ingredient, Technique, Synergy } from './types';
import { MECHANISMS, SYNERGIES, MASTER_RECIPES, TROUBLESHOOTING, TECHNIQUES } from './constants';
import { 
  Dna, ShieldCheck, Flame, Hourglass, Brain, Microscope, ChefHat, 
  BookOpen, ShoppingCart, AlertTriangle, ChevronRight, ArrowLeft, 
  Plus, Loader2, Sparkles, CheckCircle2, Info, Calculator, Trash2,
  Filter, Search, Send, Clock
} from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  // States para Diagnóstico
  const [diagnosticoStep, setDiagnosticoStep] = useState(0);
  const [userSymptoms, setUserSymptoms] = useState<string[]>([]);

  // States para Verificador
  const [verificadorIngredients, setVerificadorIngredients] = useState<string[]>([]);

  // States para Lista de Compras
  const [selectedProtocolsForList, setSelectedProtocolsForList] = useState<string[]>([]);

  const handleSymptomToggle = (symptom: string) => {
    setUserSymptoms(prev => prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]);
  };

  const getRecommendedProtocol = () => {
    if (userSymptoms.includes('Dolor') || userSymptoms.includes('Inflamación')) return MASTER_RECIPES.find(r => r.id === 'nfkappab_master');
    if (userSymptoms.includes('Fatiga') || userSymptoms.includes('Toxinas')) return MASTER_RECIPES.find(r => r.id === 'nrf2_master');
    if (userSymptoms.includes('Envejecimiento')) return MASTER_RECIPES.find(r => r.id === 'sirt_master');
    return MASTER_RECIPES[0];
  };

  const renderDashboard = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-12 animate-in fade-in duration-700">
      <header className="text-center space-y-4">
        <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-2">
          Ciencia Culinaria Basada en Evidencia
        </div>
        <h1 className="text-6xl font-black text-gray-900 tracking-tighter">
          NUTRIWELLKITT <span className="text-green-600">+</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg max-w-xl mx-auto">Tu plataforma de ingeniería nutricional para la optimización genómica.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MenuCard icon={<Dna />} title="Mi Protocolo" desc="Diagnóstico Guiado" color="bg-blue-600" onClick={() => setMode(AppMode.ELEGIR_PROTOCOLO)} />
        <MenuCard icon={<ChefHat />} title="Recetas Maestro" desc="Los 6 Protocolos" color="bg-green-600" onClick={() => setMode(AppMode.BANCO_RECETAS)} />
        <MenuCard icon={<Microscope />} title="Verificador" desc="Check de Sinergias" color="bg-purple-600" onClick={() => setMode(AppMode.VERIFICADOR_SINERGIAS)} />
        <MenuCard icon={<BookOpen />} title="Biblioteca" desc="Aprende la Ciencia" color="bg-indigo-600" onClick={() => setMode(AppMode.BIBLIOTECA)} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MenuCard icon={<Clock />} title="Técnicas PRO" desc="Hacks paso a paso" color="bg-orange-500" onClick={() => setMode(AppMode.TECNICAS)} />
        <MenuCard icon={<Calculator />} title="Lista de Compras" desc="Generador Semanal" color="bg-teal-600" onClick={() => setMode(AppMode.LISTA_COMPRAS)} />
        <MenuCard icon={<AlertTriangle />} title="Solucionador" desc="Troubleshooting" color="bg-red-600" onClick={() => setMode(AppMode.TROUBLESHOOTING)} />
      </div>
    </div>
  );

  const renderProtocolSelector = () => {
    if (diagnosticoStep === 0) {
      return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
          <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Menú Principal
          </button>
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black">¿Cuál es tu objetivo hoy?</h2>
            <p className="text-gray-500">Selecciona para encontrar el protocolo molecular ideal.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {MASTER_RECIPES.map(recipe => (
              <button key={recipe.id} onClick={() => {setSelectedRecipe(recipe); setMode(AppMode.BANCO_RECETAS);}} className="p-8 bg-white border border-gray-100 rounded-3xl hover:border-blue-500 text-left transition-all hover:shadow-xl group">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ShieldCheck />
                </div>
                <h3 className="text-xl font-black mb-2">{recipe.target}</h3>
                <p className="text-sm text-gray-500">{recipe.molecularGoalDesc}</p>
              </button>
            ))}
            <button onClick={() => setDiagnosticoStep(1)} className="p-8 bg-black text-white rounded-3xl text-left border border-black hover:bg-gray-800 transition-all flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black mb-2">🤔 No sé qué necesito</h3>
                <p className="text-gray-400 text-sm">Realizar diagnóstico guiado</p>
              </div>
              <ChevronRight />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8 animate-in slide-in-from-bottom-4">
        <button onClick={() => setDiagnosticoStep(0)} className="flex items-center text-gray-400"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</button>
        <h2 className="text-3xl font-black">Diagnóstico Guiado</h2>
        <div className="bg-white p-8 rounded-[2rem] border shadow-sm space-y-6">
          <p className="font-bold text-gray-700">Selecciona tus síntomas o preocupaciones:</p>
          <div className="grid grid-cols-2 gap-2">
            {['Fatiga', 'Dolor', 'Inflamación', 'Toxinas', 'Envejecimiento', 'Ansiedad', 'Digestión'].map(s => (
              <button 
                key={s} 
                onClick={() => handleSymptomToggle(s)}
                className={`p-4 rounded-xl text-sm font-bold border transition-all ${userSymptoms.includes(s) ? 'bg-green-600 border-green-600 text-white' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
              >
                {s}
              </button>
            ))}
          </div>
          {userSymptoms.length > 0 && (
            <button 
              onClick={() => {setSelectedRecipe(getRecommendedProtocol()!); setMode(AppMode.BANCO_RECETAS);}}
              className="w-full bg-green-600 text-white py-5 rounded-2xl font-black hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
            >
              VER MI RECOMENDACIÓN
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderBiblioteca = () => (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</button>
      <header className="space-y-4">
        <h2 className="text-5xl font-black tracking-tighter">Biblioteca Nutrigenómica</h2>
        <p className="text-gray-500">Fundamentos científicos para optimizar tu longevidad.</p>
      </header>

      <section className="space-y-6">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Los Mecanismos Maestros</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {MECHANISMS.map(m => (
            <div key={m.id} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-2xl font-black">{m.name}</h4>
                <Info className="text-blue-500" />
              </div>
              <p className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm italic mb-4">"{m.simpleDesc}"</p>
              <div className="space-y-4">
                <p className="text-sm text-gray-600"><strong>Analogía:</strong> {m.analogy}</p>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Beneficios</p>
                  <div className="flex flex-wrap gap-2">
                    {m.whyItMatters.map(w => <span key={w} className="text-[10px] bg-gray-100 px-2 py-1 rounded font-bold">{w}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Sinergias Críticas</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {SYNERGIES.map(s => (
            <div key={s.id} className="bg-white p-6 rounded-2xl border border-purple-100 hover:border-purple-300 transition-all">
              <h4 className="font-bold text-purple-900 mb-2">{s.title}</h4>
              <p className="text-xs font-bold bg-purple-50 text-purple-700 p-2 rounded mb-3">{s.rule}</p>
              <p className="text-[10px] text-gray-500 leading-relaxed">{s.science}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderVerificador = () => {
    const handleIngToggle = (name: string) => {
      setVerificadorIngredients(prev => prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]);
    };

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</button>
        <h2 className="text-4xl font-black">Verificador de Sinergias</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border space-y-6">
              <p className="font-bold text-gray-700">Selecciona tus ingredientes:</p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase mb-3">Bases y Crucíferas</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Kale', 'Espinaca', 'Brócoli', 'Rúcula', 'Col Morada', 'Rábanos'].map(i => (
                      <button key={i} onClick={() => handleIngToggle(i)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${verificadorIngredients.includes(i) ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white text-gray-400'}`}>{i}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase mb-3">Grasas y Bioactivos</h4>
                  <div className="flex flex-wrap gap-2">
                    {['AOVE', 'Aguacate', 'Nueces', 'Cúrcuma', 'Pimienta', 'Mostaza', 'Tomate', 'Limón'].map(i => (
                      <button key={i} onClick={() => handleIngToggle(i)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${verificadorIngredients.includes(i) ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white text-gray-400'}`}>{i}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-[2rem] border border-purple-100">
              <h3 className="font-black text-purple-900 mb-4 flex items-center"><Microscope className="w-4 h-4 mr-2" /> Análisis de Sinergia</h3>
              <div className="space-y-4">
                {verificadorIngredients.length < 2 ? (
                   <p className="text-xs text-purple-400 italic">Selecciona al menos 2 ingredientes para ver sinergias activas.</p>
                ) : (
                  <div className="space-y-4">
                    {verificadorIngredients.includes('Brócoli') && !verificadorIngredients.includes('Mostaza') && (
                      <div className="bg-white p-4 rounded-xl border border-red-100">
                        <p className="text-red-600 font-bold text-[10px] uppercase mb-1">Oportunidad Perdida</p>
                        <p className="text-xs text-gray-700">Añade <strong>Mostaza</strong> para activar el sulforafano del brócoli.</p>
                      </div>
                    )}
                    {verificadorIngredients.includes('Cúrcuma') && !verificadorIngredients.includes('Pimienta') && (
                      <div className="bg-white p-4 rounded-xl border border-red-100">
                        <p className="text-red-600 font-bold text-[10px] uppercase mb-1">Oportunidad Perdida</p>
                        <p className="text-xs text-gray-700">Añade <strong>Pimienta Negra</strong> para absorber la curcumina.</p>
                      </div>
                    )}
                    {verificadorIngredients.includes('Tomate') && verificadorIngredients.includes('AOVE') && (
                      <div className="bg-white p-4 rounded-xl border border-green-100">
                        <p className="text-green-600 font-bold text-[10px] uppercase mb-1">Sinergia Activa ✅</p>
                        <p className="text-xs text-gray-700">El AOVE maximiza la absorción del licopeno del tomate.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderShoppingList = () => (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</button>
      <h2 className="text-4xl font-black">Generador de Compras</h2>
      
      <div className="bg-white p-8 rounded-[2rem] border space-y-8">
        <div>
          <p className="font-bold text-gray-700 mb-4">Selecciona los protocolos de tu semana:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MASTER_RECIPES.map(r => (
              <button 
                key={r.id} 
                onClick={() => setSelectedProtocolsForList(prev => prev.includes(r.id) ? prev.filter(id => id !== r.id) : [...prev, r.id])}
                className={`p-4 rounded-xl text-left border transition-all ${selectedProtocolsForList.includes(r.id) ? 'bg-teal-50 border-teal-500' : 'bg-white'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">{r.name}</span>
                  {selectedProtocolsForList.includes(r.id) && <CheckCircle2 className="text-teal-500 w-4 h-4" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedProtocolsForList.length > 0 && (
          <div className="bg-teal-50 p-6 rounded-2xl space-y-4">
             <h3 className="font-black text-teal-900">Tu Cesta Nutrigenómica</h3>
             <ul className="space-y-2">
                {['2 cabezas de Brócoli', '2 bolsas de Rúcula', '1 Frasco de Mostaza Semilla', '4 Aguacates', 'Cúrcuma fresca'].map(item => (
                  <li key={item} className="flex items-center text-sm text-teal-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                    {item}
                  </li>
                ))}
             </ul>
             <button className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold hover:bg-teal-700 transition-colors">COMPARTIR LISTA</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderTecnicas = () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</button>
      <h2 className="text-4xl font-black">Técnicas Culinarias PRO</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {TECHNIQUES.map(t => (
          <div key={t.id} className="bg-white p-8 rounded-3xl border hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-black">{t.name}</h3>
              <Clock className="text-orange-500" />
            </div>
            <p className="text-sm text-gray-500 mb-6 italic">{t.why}</p>
            <div className="space-y-4">
              {t.steps.map((step, i) => (
                <div key={i} className="flex space-x-3">
                  <span className="bg-orange-100 text-orange-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</span>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRecipeView = (recipe: Recipe) => (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in zoom-in duration-300">
      <div className="flex justify-between items-center">
        <button onClick={() => setSelectedRecipe(null)} className="text-gray-400 flex items-center hover:text-black">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </button>
        <div className="flex space-x-2">
          <button className="bg-white border p-3 rounded-2xl hover:bg-gray-50"><Trash2 className="w-5 h-5 text-gray-400" /></button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center"><Plus className="mr-2" /> Guardar</button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
        <div className="bg-gradient-to-br from-green-600 to-green-800 p-12 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Dna className="w-32 h-32" /></div>
          <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase inline-block mb-4">Protocolo Maestro</div>
          <h2 className="text-5xl font-black mb-4 leading-none uppercase">{recipe.name}</h2>
          <div className="flex items-center space-x-6 text-xs font-bold tracking-widest uppercase text-green-100">
            <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {recipe.totalTime}</span>
            <span className="flex items-center"><Sparkles className="w-4 h-4 mr-2" /> {recipe.target}</span>
          </div>
        </div>
        
        <div className="p-12 space-y-12">
          <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 group relative">
             <div className="absolute top-4 right-4 text-blue-300 opacity-20"><Microscope size={48} /></div>
             <h3 className="text-blue-900 font-black text-xs uppercase tracking-widest mb-4">Objetivo Molecular</h3>
             <p className="text-blue-800 text-lg leading-relaxed font-medium">{recipe.molecularGoalDesc}</p>
             <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white/60 p-3 rounded-xl"><p className="text-[10px] font-black text-blue-400 uppercase">Mecanismo</p><p className="text-xs font-bold text-blue-900">{recipe.scienceQuick.mechanism}</p></div>
                <div className="bg-white/60 p-3 rounded-xl"><p className="text-[10px] font-black text-blue-400 uppercase">Evidencia</p><p className="text-xs font-bold text-blue-900">{recipe.scienceQuick.evidence}</p></div>
                <div className="bg-white/60 p-3 rounded-xl"><p className="text-[10px] font-black text-blue-400 uppercase">Tiempo</p><p className="text-xs font-bold text-blue-900">{recipe.scienceQuick.timeToEffect}</p></div>
             </div>
          </div>

          <div>
             <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 border-b pb-4">Arquitectura de Ingredientes</h3>
             <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {['base', 'crucifera', 'proteina', 'grasa', 'bioactivo'].map(cat => {
                  const items = recipe.ingredients.filter(i => i.category === cat);
                  if (items.length === 0) return null;
                  return (
                    <div key={cat}>
                       <h4 className="text-[10px] font-black text-gray-300 uppercase mb-4 tracking-tighter">{cat}</h4>
                       <ul className="space-y-4">
                         {items.map(i => (
                           <li key={i.name} className="group">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-black text-gray-800">{i.name}</span>
                                <span className="text-xs text-gray-400">{i.amount}</span>
                              </div>
                              <p className="text-[10px] text-gray-400 italic group-hover:text-green-600 transition-colors">{i.reason}</p>
                           </li>
                         ))}
                       </ul>
                    </div>
                  )
                })}
             </div>
          </div>

          <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
             <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Preparación Científica</h3>
             <ol className="space-y-6">
                {recipe.preparation.map((step, i) => (
                  <li key={i} className="flex space-x-6">
                    <span className="text-3xl font-black text-green-600/20">0{i+1}</span>
                    <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
             </ol>
          </div>

          <div className="bg-orange-50 p-8 rounded-3xl border border-orange-200">
             <h4 className="text-orange-900 font-black text-xs uppercase tracking-widest mb-2">El Secreto de la Sinergia</h4>
             <p className="text-orange-800 text-sm italic font-medium">"{recipe.secret}"</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-24 selection:bg-green-100">
      <nav className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => {setMode(AppMode.DASHBOARD); setSelectedRecipe(null); setDiagnosticoStep(0);}}>
          <div className="bg-green-600 p-2 rounded-lg text-white group-hover:rotate-12 transition-transform"><Dna className="w-5 h-5" /></div>
          <span className="font-black tracking-tighter text-2xl text-gray-800">Nutriwellkitt</span>
        </div>
        <div className="flex items-center space-x-4">
           <div className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black text-gray-500 tracking-widest">v2.8 PRO</div>
           <button className="bg-green-600 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-green-700 transition-colors">Premium</button>
        </div>
      </nav>

      <main className="mt-8">
        {mode === AppMode.DASHBOARD && renderDashboard()}
        {mode === AppMode.ELEGIR_PROTOCOLO && renderProtocolSelector()}
        {mode === AppMode.BIBLIOTECA && renderBiblioteca()}
        {mode === AppMode.VERIFICADOR_SINERGIAS && renderVerificador()}
        {mode === AppMode.LISTA_COMPRAS && renderShoppingList()}
        {mode === AppMode.TECNICAS && renderTecnicas()}
        {mode === AppMode.TROUBLESHOOTING && (
          <div className="max-w-2xl mx-auto p-6 space-y-8">
            <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</button>
            <h2 className="text-4xl font-black text-red-600">Solucionador</h2>
            <div className="space-y-4">
              {TROUBLESHOOTING.map(t => (
                <details key={t.issue} className="group bg-white p-6 rounded-2xl border border-red-100 shadow-sm open:shadow-md transition-all">
                  <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none">
                    {t.issue}
                    <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform text-gray-300" />
                  </summary>
                  <div className="mt-6 space-y-6 animate-in slide-in-from-top-2">
                    <div className="space-y-4">
                      {t.solutions.map(s => (
                        <div key={s.title} className="bg-green-50 p-6 rounded-2xl border border-green-100">
                          <p className="font-black text-green-900 text-sm mb-3 uppercase tracking-widest">{s.title}</p>
                          <ul className="text-sm text-green-700 space-y-2 mb-4">
                            {s.steps.map(step => <li key={step} className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 shrink-0 mt-0.5" /> {step}</li>)}
                          </ul>
                          <p className="text-[10px] font-black text-green-600 uppercase italic">Impacto: {s.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
        {mode === AppMode.BANCO_RECETAS && (
          selectedRecipe ? renderRecipeView(selectedRecipe) : (
            <div className="max-w-4xl mx-auto p-6 space-y-8">
              <button onClick={() => setMode(AppMode.DASHBOARD)} className="text-gray-400 flex items-center hover:text-black transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Volver
              </button>
              <div className="space-y-2">
                <h2 className="text-4xl font-black">Banco de Recetas Maestro</h2>
                <p className="text-gray-500">Los 6 pilares de la nutrición funcional.</p>
              </div>
              <div className="grid gap-4">
                {MASTER_RECIPES.map(r => (
                  <button key={r.id} onClick={() => setSelectedRecipe(r)} className="bg-white p-8 rounded-[2rem] border text-left flex justify-between items-center group hover:border-green-500 hover:shadow-xl transition-all">
                    <div>
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">{r.scienceQuick.mechanism}</p>
                      <h3 className="text-2xl font-black group-hover:text-green-600 transition-colors uppercase">{r.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">{r.target}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-all">
                      <ChevronRight />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
};

const MenuCard: React.FC<{ icon: any, title: string, desc: string, color: string, onClick: () => void }> = ({ icon, title, desc, color, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all text-left group flex flex-col items-start"
  >
    <div className={`${color} text-white p-4 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
      {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
    </div>
    <h3 className="text-xl font-black text-gray-800 mb-1 leading-none uppercase tracking-tighter">{title}</h3>
    <p className="text-xs text-gray-400 font-bold mb-4">{desc}</p>
    <div className="mt-auto text-green-600 flex items-center text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
      Explorar <ChevronRight className="w-3 h-3 ml-1" />
    </div>
  </button>
);

export default App;
