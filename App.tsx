
import React, { useState, useMemo, useEffect } from 'react';
import { AppMode, Recipe, MolecularMechanism, TroubleshootingItem, Ingredient, Technique, Synergy } from './types';
import { MECHANISMS, SYNERGIES, MASTER_RECIPES, TROUBLESHOOTING, TECHNIQUES } from './constants';
import { 
  Dna, ShieldCheck, Flame, Hourglass, Brain, Microscope, ChefHat, 
  BookOpen, ShoppingCart, AlertTriangle, ChevronRight, ArrowLeft, 
  Plus, Loader2, Sparkles, CheckCircle2, Info, Calculator, Trash2,
  Filter, Search, Send, Clock, Heart, Share2, Copy, History
} from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  
  // States para Diagnóstico Guiado
  const [diagnosticoStep, setDiagnosticoStep] = useState(0);
  const [userSymptoms, setUserSymptoms] = useState<string[]>([]);

  // States para Verificador
  const [verificadorIngredients, setVerificadorIngredients] = useState<string[]>([]);

  // States para Lista de Compras
  const [selectedProtocolsForList, setSelectedProtocolsForList] = useState<string[]>([]);
  const [peopleCount, setPeopleCount] = useState(1);
  const [daysCount, setDaysCount] = useState(3);

  useEffect(() => {
    const saved = localStorage.getItem('nutriwellkitt_saved');
    if (saved) setSavedRecipes(JSON.parse(saved));
  }, []);

  const saveRecipe = (id: string) => {
    const newSaved = savedRecipes.includes(id) 
      ? savedRecipes.filter(r => r !== id) 
      : [...savedRecipes, id];
    setSavedRecipes(newSaved);
    localStorage.setItem('nutriwellkitt_saved', JSON.stringify(newSaved));
  };

  const handleSymptomToggle = (symptom: string) => {
    setUserSymptoms(prev => prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]);
  };

  const getRecommendedProtocol = () => {
    if (userSymptoms.includes('Dolor') || userSymptoms.includes('Inflamación')) return MASTER_RECIPES.find(r => r.id === 'nfkappab_master');
    if (userSymptoms.includes('Fatiga') || userSymptoms.includes('Toxinas')) return MASTER_RECIPES.find(r => r.id === 'nrf2_master');
    if (userSymptoms.includes('Ansiedad') || userSymptoms.includes('Digestión')) return MASTER_RECIPES.find(r => r.id === 'psychobiotic_master');
    if (userSymptoms.includes('Envejecimiento')) return MASTER_RECIPES.find(r => r.id === 'sirt_master');
    return MASTER_RECIPES[0];
  };

  const renderDashboard = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-12 animate-in fade-in duration-700">
      <header className="text-center space-y-4">
        <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-2">
          Nutrigenómica & Arquitectura Culinaria
        </div>
        <h1 className="text-6xl font-black text-gray-900 tracking-tighter">
          NUTRIWELLKITT <span className="text-green-600">+</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg max-w-xl mx-auto">Optimiza tu expresión genética a través de protocolos diseñados con precisión molecular.</p>
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

      {savedRecipes.length > 0 && (
        <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
            <History className="w-4 h-4 mr-2" /> Tus Protocolos Guardados ({savedRecipes.length})
          </h3>
          <div className="flex flex-wrap gap-4">
            {savedRecipes.map(id => {
              const r = MASTER_RECIPES.find(recipe => recipe.id === id);
              return r ? (
                <button key={id} onClick={() => {setSelectedRecipe(r); setMode(AppMode.BANCO_RECETAS);}} className="bg-gray-50 hover:bg-green-50 px-6 py-3 rounded-2xl font-bold transition-all border border-gray-100 hover:border-green-300">
                  {r.name}
                </button>
              ) : null;
            })}
          </div>
        </section>
      )}
    </div>
  );

  const renderProtocolSelector = () => {
    if (diagnosticoStep === 0) {
      return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in slide-in-from-bottom-4">
          <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Menú Principal
          </button>
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black">¿Cuál es tu objetivo hoy?</h2>
            <p className="text-gray-500">Selecciona para encontrar el protocolo molecular ideal o realiza un diagnóstico.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <button onClick={() => setDiagnosticoStep(1)} className="p-8 bg-black text-white rounded-[2rem] text-left border border-black hover:bg-gray-800 transition-all flex items-center justify-between group">
              <div>
                <h3 className="text-xl font-black mb-2 flex items-center"><Sparkles className="mr-2 text-yellow-400" /> No sé qué necesito</h3>
                <p className="text-gray-400 text-sm">Realizar diagnóstico guiado por síntomas</p>
              </div>
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            {MASTER_RECIPES.map(recipe => (
              <button key={recipe.id} onClick={() => {setSelectedRecipe(recipe); setMode(AppMode.BANCO_RECETAS);}} className="p-8 bg-white border border-gray-100 rounded-[2rem] hover:border-blue-500 text-left transition-all hover:shadow-xl group">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ShieldCheck />
                </div>
                <h3 className="text-xl font-black mb-2">{recipe.target}</h3>
                <p className="text-sm text-gray-500">{recipe.molecularGoalDesc}</p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8 animate-in slide-in-from-bottom-4">
        <button onClick={() => setDiagnosticoStep(0)} className="flex items-center text-gray-400"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</button>
        <div className="space-y-2">
          <h2 className="text-3xl font-black">Diagnóstico Guiado</h2>
          <p className="text-gray-500">Analizando tu lienzo epigenético...</p>
        </div>
        <div className="bg-white p-8 rounded-[3rem] border shadow-sm space-y-6">
          <p className="font-bold text-gray-700">Selecciona tus preocupaciones actuales:</p>
          <div className="grid grid-cols-2 gap-3">
            {['Fatiga', 'Dolor', 'Inflamación', 'Toxinas', 'Envejecimiento', 'Ansiedad', 'Digestión'].map(s => (
              <button 
                key={s} 
                onClick={() => handleSymptomToggle(s)}
                className={`p-4 rounded-2xl text-sm font-bold border transition-all ${userSymptoms.includes(s) ? 'bg-green-600 border-green-600 text-white' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'}`}
              >
                {s}
              </button>
            ))}
          </div>
          {userSymptoms.length > 0 && (
            <div className="pt-6 border-t">
              <button 
                onClick={() => {setSelectedRecipe(getRecommendedProtocol()!); setMode(AppMode.BANCO_RECETAS);}}
                className="w-full bg-green-600 text-white py-5 rounded-2xl font-black hover:bg-green-700 shadow-lg shadow-green-100 transition-all flex items-center justify-center"
              >
                VER RECOMENDACIÓN MOLECULAR <ChevronRight className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBiblioteca = () => (
    <div className="max-w-5xl mx-auto p-6 space-y-12 animate-in fade-in duration-500">
      <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400 hover:text-black transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Menú Principal
      </button>
      <header className="space-y-4">
        <h2 className="text-5xl font-black tracking-tighter">Biblioteca Nutrigenómica</h2>
        <p className="text-gray-500">Los fundamentos moleculares que dictan tu longevidad.</p>
      </header>

      <section className="space-y-6">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><Dna className="w-4 h-4 mr-2" /> Mecanismos Maestros</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {MECHANISMS.map(m => (
            <div key={m.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-2xl font-black">{m.name}</h4>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Protocolo</div>
              </div>
              <p className="bg-blue-50 text-blue-800 p-4 rounded-2xl text-sm italic mb-6 leading-relaxed">"{m.simpleDesc}"</p>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Analogía Visual</p>
                  <p className="text-sm text-gray-700 font-medium">{m.analogy}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Activadores Clave</p>
                  <div className="flex flex-wrap gap-2">
                    {m.keyNutrients.map(n => <span key={n.name} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl text-xs font-bold">{n.name} ({n.examples})</span>)}
                  </div>
                </div>
                <div className="pt-4 border-t text-[11px] text-gray-400 leading-relaxed italic">
                  <strong>Evidencia:</strong> {m.scientificEvidence}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><Microscope className="w-4 h-4 mr-2" /> Sinergias Validadas</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {SYNERGIES.map(s => (
            <div key={s.id} className="bg-white p-6 rounded-[2rem] border border-purple-100 hover:border-purple-300 transition-all flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-purple-900 text-lg">{s.title}</h4>
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => <span key={i} className={`text-xs ${i < s.evidenceLevel ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>)}
                </div>
              </div>
              <p className="text-xs font-black bg-purple-50 text-purple-700 p-2.5 rounded-xl mb-4 border border-purple-100">{s.rule}</p>
              <p className="text-[10px] text-gray-500 leading-relaxed mb-6 flex-1 italic">"{s.science}"</p>
              <div className="text-[9px] font-black text-purple-300 uppercase tracking-widest">Nivel de Evidencia: {s.evidenceLevel}/5</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderVerificador = () => {
    const categories = {
      'Bases': ['Kale', 'Espinaca', 'Rúcula', 'Lechuga romana', 'Col morada'],
      'Crucíferas': ['Brócoli', 'Brotes de brócoli', 'Rábanos', 'Col rizada'],
      'Grasas': ['Aguacate', 'AOVE', 'Nueces', 'Semillas de lino', 'Semillas calabaza'],
      'Activadores': ['Cúrcuma', 'Pimienta negra', 'Mostaza semilla', 'Jengibre', 'Ajo'],
      'Bioactivos': ['Tomate', 'Arándanos', 'Remolacha', 'Cebolla morada', 'Alcaparras']
    };

    const activeSinergies = useMemo(() => {
      const results: string[] = [];
      const ing = verificadorIngredients;
      if (ing.includes('Brócoli') && ing.includes('Mostaza semilla')) results.push("¡Sinergia Activa! El Hack de la Mostaza aumenta sulforafano 4x.");
      if (ing.includes('Cúrcuma') && ing.includes('Pimienta negra') && (ing.includes('AOVE') || ing.includes('Aguacate'))) results.push("¡Sinergia Activa! Trinidad de la Cúrcuma detectada (Absorción x4).");
      if (ing.includes('Tomate') && (ing.includes('AOVE') || ing.includes('Aguacate'))) results.push("¡Sinergia Activa! Licopeno + Grasa = Absorción x5.");
      if (ing.includes('Espinaca') && ing.includes('Limón')) results.push("¡Sinergia Activa! Vitamina C + Hierro No-Hemo.");
      return results;
    }, [verificadorIngredients]);

    const warnings = useMemo(() => {
      const results: string[] = [];
      const ing = verificadorIngredients;
      if (ing.includes('Brócoli') && !ing.includes('Mostaza semilla')) results.push("Brócoli sin activador: Añade Mostaza o Rábanos para rescatar el sulforafano.");
      if (ing.includes('Cúrcuma') && (!ing.includes('Pimienta negra') || (!ing.includes('AOVE') && !ing.includes('Aguacate')))) results.push("Cúrcuma desperdiciada: Falta pimienta negra o grasa para su absorción.");
      if (ing.includes('Tomate') && !ing.includes('AOVE') && !ing.includes('Aguacate')) results.push("Tomate sin vehículo: Sin grasa, el licopeno no se absorberá.");
      return results;
    }, [verificadorIngredients]);

    return (
      <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in">
        <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-4xl font-black">Verificador de Sinergias</h2>
          <button onClick={() => setVerificadorIngredients([])} className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center">
            <Trash2 className="w-3 h-3 mr-1" /> Limpiar Todo
          </button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[3rem] border shadow-sm">
              <div className="space-y-8">
                {Object.entries(categories).map(([cat, items]) => (
                  <div key={cat}>
                    <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-3">{cat}</h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map(i => (
                        <button 
                          key={i} 
                          onClick={() => setVerificadorIngredients(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}
                          className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-all ${verificadorIngredients.includes(i) ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-100' : 'bg-white border-gray-100 text-gray-400 hover:border-purple-300'}`}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-50 p-8 rounded-[3rem] border border-purple-100 sticky top-24">
              <h3 className="font-black text-purple-900 mb-6 flex items-center"><Microscope className="w-5 h-5 mr-2" /> Análisis Genómico</h3>
              
              {verificadorIngredients.length === 0 ? (
                <div className="text-center py-12 text-purple-300 space-y-2">
                  <Plus className="w-12 h-12 mx-auto opacity-20" />
                  <p className="text-sm font-medium">Selecciona ingredientes para analizar su potencial epigenético.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {activeSinergies.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Sinergias Activas ✅</p>
                      {activeSinergies.map((s, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl border border-green-100 text-xs text-green-800 font-bold shadow-sm">
                          {s}
                        </div>
                      ))}
                    </div>
                  )}

                  {warnings.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Oportunidades Perdidas ⚠️</p>
                      {warnings.map((w, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl border border-red-100 text-xs text-red-800 font-medium shadow-sm">
                          {w}
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSinergies.length === 0 && warnings.length === 0 && (
                    <p className="text-xs text-purple-400 italic">No se detectaron sinergias maestras. Intenta combinar activadores con sus vehículos correspondientes.</p>
                  )}
                  
                  <div className="pt-6 border-t border-purple-200">
                    <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">Ingredientes ({verificadorIngredients.length})</p>
                    <p className="text-xs font-medium text-purple-800 leading-relaxed">{verificadorIngredients.join(', ')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderShoppingList = () => {
    const listIngredients = useMemo(() => {
      const list: Record<string, {amount: string, reason: string}> = {};
      selectedProtocolsForList.forEach(id => {
        const recipe = MASTER_RECIPES.find(r => r.id === id);
        if (recipe) {
          recipe.ingredients.forEach(i => {
            // Check for existing entry to avoid indexing issues with TypeScript's flow analysis
            const entry = list[i.name];
            if (entry) {
              // Simple aggregation logic: if it exists, just list both reasons
              entry.reason += ` & ${recipe.name}`;
            } else {
              list[i.name] = { amount: i.amount, reason: recipe.name };
            }
          });
        }
      });
      return list;
    }, [selectedProtocolsForList]);

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in">
        <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</button>
        <h2 className="text-4xl font-black">Generador de Compras</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[3rem] border shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6">Selecciona Protocolos para tu Semana:</h3>
              <div className="space-y-3">
                {MASTER_RECIPES.map(r => (
                  <button 
                    key={r.id} 
                    onClick={() => setSelectedProtocolsForList(prev => prev.includes(r.id) ? prev.filter(id => id !== r.id) : [...prev, r.id])}
                    className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${selectedProtocolsForList.includes(r.id) ? 'bg-teal-50 border-teal-500' : 'bg-white'}`}
                  >
                    <div>
                      <p className="font-bold text-sm">{r.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{r.target}</p>
                    </div>
                    {selectedProtocolsForList.includes(r.id) ? <CheckCircle2 className="text-teal-500" /> : <Plus className="text-gray-200" />}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Personas</label>
                  <input type="number" min="1" value={peopleCount} onChange={e => setPeopleCount(parseInt(e.target.value))} className="w-full p-3 border rounded-xl font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Días/Semana</label>
                  <input type="number" min="1" value={daysCount} onChange={e => setDaysCount(parseInt(e.target.value))} className="w-full p-3 border rounded-xl font-bold" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-teal-50 p-8 rounded-[3rem] border border-teal-100 min-h-[400px]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-teal-900 flex items-center"><ShoppingCart className="w-5 h-5 mr-2" /> Tu Lista Semanal</h3>
                {Object.keys(listIngredients).length > 0 && (
                  <button className="text-[10px] font-black text-teal-600 uppercase tracking-widest flex items-center">
                    <Share2 className="w-3 h-3 mr-1" /> Compartir
                  </button>
                )}
              </div>

              {Object.keys(listIngredients).length === 0 ? (
                <div className="text-center py-20 text-teal-300">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-10" />
                  <p className="font-bold">Selecciona protocolos para calcular tu lista de compras inteligente.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-teal-600 bg-white inline-block px-3 py-1 rounded-full border border-teal-200">
                    Cálculo para {peopleCount} {peopleCount === 1 ? 'persona' : 'personas'} x {daysCount} días
                  </p>
                  <div className="space-y-2">
                    {Object.entries(listIngredients).map(([name, data]) => (
                      <div key={name} className="bg-white p-4 rounded-2xl flex justify-between items-start shadow-sm border border-teal-50 group hover:border-teal-300 transition-colors">
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{name}</p>
                          <p className="text-[10px] text-gray-400 truncate max-w-[200px]">{data.reason}</p>
                        </div>
                        <span className="text-xs font-black text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">x{peopleCount * daysCount}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 bg-teal-600 text-white py-4 rounded-2xl font-black hover:bg-teal-700 transition-all flex items-center justify-center">
                    <Copy className="w-4 h-4 mr-2" /> COPIAR LISTA PARA NOTAS
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTecnicas = () => (
    <div className="max-w-5xl mx-auto p-6 space-y-12 animate-in fade-in">
      <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400 hover:text-black transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver
      </button>
      <header className="space-y-4">
        <h2 className="text-5xl font-black tracking-tighter">Técnicas Culinarias PRO</h2>
        <p className="text-gray-500">Hacks científicos para maximizar la biodisponibilidad en tu cocina.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {TECHNIQUES.map(t => (
          <div key={t.id} className="bg-white p-10 rounded-[3rem] border hover:shadow-xl transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-orange-100 transition-colors"></div>
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-black">{t.name}</h3>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center text-[10px] font-black text-orange-500 uppercase tracking-widest"><Clock className="w-3 h-3 mr-1" /> {t.duration}</span>
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => <span key={i} className={`text-xs ${i < t.evidenceLevel ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>)}
                  </div>
                </div>
              </div>
            </div>
            <p className="bg-gray-50 p-5 rounded-2xl text-sm italic text-gray-600 mb-8 leading-relaxed border border-gray-100">
              "{t.why}"
            </p>
            <div className="space-y-6">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Paso a Paso</p>
              {t.steps.map((step, i) => (
                <div key={i} className="flex space-x-4">
                  <span className="bg-orange-100 text-orange-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i+1}</span>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">{step}</p>
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
        <button onClick={() => setSelectedRecipe(null)} className="text-gray-400 flex items-center hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Banco
        </button>
        <div className="flex space-x-3">
          <button 
            onClick={() => saveRecipe(recipe.id)} 
            className={`p-3 rounded-2xl border transition-all ${savedRecipes.includes(recipe.id) ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-100 text-gray-400 hover:text-red-500'}`}
          >
            <Heart className={`w-6 h-6 ${savedRecipes.includes(recipe.id) ? 'fill-current' : ''}`} />
          </button>
          <button className="bg-green-600 text-white px-8 py-3 rounded-2xl font-black flex items-center shadow-lg shadow-green-100 hover:bg-green-700 transition-colors">
            <Plus className="mr-2 w-5 h-5" /> AGREGAR A LISTA
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-gray-100">
        <div className="bg-gradient-to-br from-green-700 to-green-900 p-16 text-white relative">
          <div className="absolute top-0 right-0 p-12 opacity-10"><Dna size={200} /></div>
          <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-black tracking-[0.2em] uppercase inline-block mb-6 border border-white/10">Protocolo de Precisión</div>
          <h2 className="text-6xl font-black mb-6 leading-none uppercase tracking-tighter">{recipe.name}</h2>
          <div className="flex flex-wrap items-center gap-6 text-[11px] font-black tracking-widest uppercase text-green-100">
            <span className="flex items-center bg-black/20 px-4 py-2 rounded-xl"><Clock className="w-4 h-4 mr-2" /> {recipe.totalTime}</span>
            <span className="flex items-center bg-black/20 px-4 py-2 rounded-xl"><Sparkles className="w-4 h-4 mr-2" /> {recipe.target}</span>
            <div className="flex items-center bg-black/20 px-4 py-2 rounded-xl">
              {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}
            </div>
          </div>
        </div>
        
        <div className="p-16 space-y-16">
          <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100 group relative overflow-hidden">
             <div className="absolute -top-4 -right-4 text-blue-200 opacity-20"><Microscope size={120} /></div>
             <h3 className="text-blue-900 font-black text-[11px] uppercase tracking-[0.3em] mb-6 flex items-center">
               <Microscope className="w-4 h-4 mr-2" /> Objetivo Molecular
             </h3>
             <p className="text-blue-800 text-xl leading-relaxed font-bold italic mb-10">"{recipe.molecularGoalDesc}"</p>
             <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/70 p-5 rounded-2xl backdrop-blur-sm border border-white/30">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Mecanismo</p>
                  <p className="text-sm font-bold text-blue-900">{recipe.scienceQuick.mechanism}</p>
                </div>
                <div className="bg-white/70 p-5 rounded-2xl backdrop-blur-sm border border-white/30">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Evidencia</p>
                  <p className="text-sm font-bold text-blue-900">{recipe.scienceQuick.evidence}</p>
                </div>
                <div className="bg-white/70 p-5 rounded-2xl backdrop-blur-sm border border-white/30">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Efecto</p>
                  <p className="text-sm font-bold text-blue-900">{recipe.scienceQuick.timeToEffect}</p>
                </div>
             </div>
          </section>

          <div>
             <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mb-12 border-b pb-6 flex items-center">
               <ShoppingCart className="w-4 h-4 mr-2" /> Arquitectura de Ingredientes
             </h3>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12">
                {['base', 'crucifera', 'proteina', 'grasa', 'bioactivo', 'aderezo'].map(cat => {
                  const items = recipe.ingredients.filter(i => i.category === cat);
                  if (items.length === 0) return null;
                  return (
                    <div key={cat} className="animate-in fade-in slide-in-from-left duration-500">
                       <h4 className="text-[11px] font-black text-gray-300 uppercase mb-6 tracking-widest border-l-2 border-gray-100 pl-4">{cat}</h4>
                       <ul className="space-y-6">
                         {items.map(i => (
                           <li key={i.name} className="group cursor-default">
                              <div className="flex justify-between items-start mb-1.5">
                                <span className="text-base font-black text-gray-800 group-hover:text-green-600 transition-colors leading-tight">{i.name}</span>
                                <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap ml-4">{i.amount}</span>
                              </div>
                              <p className="text-[11px] text-gray-400 italic font-medium leading-relaxed group-hover:text-gray-600 transition-colors">{i.power || i.reason}</p>
                           </li>
                         ))}
                       </ul>
                    </div>
                  )
                })}
             </div>
          </div>

          <section className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100">
             <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mb-10 flex items-center">
               <ChefHat className="w-5 h-5 mr-3" /> Preparación Científica
             </h3>
             <ol className="space-y-10">
                {recipe.preparation.map((step, i) => (
                  <li key={i} className="flex space-x-8 group">
                    <span className="text-4xl font-black text-green-600/10 group-hover:text-green-600/30 transition-colors tabular-nums">0{i+1}</span>
                    <p className="text-gray-700 leading-relaxed pt-2 font-medium text-lg">{step}</p>
                  </li>
                ))}
             </ol>
          </section>

          <div className="bg-orange-50 p-10 rounded-[2.5rem] border border-orange-200 relative group overflow-hidden">
             <div className="absolute top-0 right-0 p-8 text-orange-200 opacity-20 group-hover:rotate-12 transition-transform duration-700"><Sparkles size={64} /></div>
             <h4 className="text-orange-900 font-black text-[11px] uppercase tracking-[0.4em] mb-4 flex items-center relative z-10"><Sparkles className="w-4 h-4 mr-2" /> El Secreto de la Sinergia</h4>
             <p className="text-orange-800 text-lg italic font-bold leading-relaxed relative z-10">"{recipe.secret}"</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t">
             <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Optimización PRO</p>
                <div className="flex items-center text-sm font-bold text-gray-700"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500" /> Momento: {recipe.proOptimization.whenToEat}</div>
                <div className="flex items-center text-sm font-bold text-gray-700"><CheckCircle2 className="w-4 h-4 mr-3 text-purple-500" /> Frecuencia: {recipe.proOptimization.frequency}</div>
             </div>
             <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-2">Sugerencia de Rotación</p>
                <p className="text-sm font-bold text-green-800 leading-relaxed">{recipe.smartRotation}</p>
             </div>
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
        <div className="flex items-center space-x-6">
           <div className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black text-gray-500 tracking-widest">v3.0 MASTER</div>
           <button className="bg-green-600 text-white px-5 py-1.5 rounded-full text-xs font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100">Premium</button>
        </div>
      </nav>

      <main className="mt-12">
        {mode === AppMode.DASHBOARD && renderDashboard()}
        {mode === AppMode.ELEGIR_PROTOCOLO && renderProtocolSelector()}
        {mode === AppMode.BIBLIOTECA && renderBiblioteca()}
        {mode === AppMode.VERIFICADOR_SINERGIAS && renderVerificador()}
        {mode === AppMode.LISTA_COMPRAS && renderShoppingList()}
        {mode === AppMode.TECNICAS && renderTecnicas()}
        {mode === AppMode.TROUBLESHOOTING && (
          <div className="max-w-3xl mx-auto p-6 space-y-8 animate-in fade-in">
            <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400 hover:text-black transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Volver</button>
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-red-600 tracking-tighter">Solucionador</h2>
              <p className="text-gray-500">¿Tienes dudas o molestias? Tenemos la respuesta científica.</p>
            </div>
            <div className="space-y-6">
              {TROUBLESHOOTING.map(t => (
                <details key={t.issue} className="group bg-white p-8 rounded-[2.5rem] border border-red-100 shadow-sm open:shadow-xl transition-all">
                  <summary className="font-bold text-xl cursor-pointer flex justify-between items-center list-none outline-none">
                    <span className="group-open:text-red-600 transition-colors">{t.issue}</span>
                    <ChevronRight className="w-6 h-6 group-open:rotate-90 transition-transform text-gray-300 group-open:text-red-600" />
                  </summary>
                  <div className="mt-8 space-y-8 animate-in slide-in-from-top-4 duration-500">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">Diagnóstico Sugerido</p>
                      <div className="flex flex-wrap gap-2">
                        {t.diagnosis.map(d => <span key={d} className="bg-red-50 text-red-600 text-xs px-4 py-1.5 rounded-xl font-bold border border-red-100">{d}</span>)}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <p className="text-[10px] font-black text-green-400 uppercase tracking-[0.2em]">Soluciones Validadas</p>
                      {t.solutions.map(s => (
                        <div key={s.title} className="bg-green-50 p-8 rounded-[2rem] border border-green-100 relative group/sol">
                          <h5 className="font-black text-green-900 text-lg mb-4 flex items-center">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-green-600" /> {s.title}
                          </h5>
                          <ul className="text-sm text-green-700 space-y-3 mb-6">
                            {s.steps.map(step => <li key={step} className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-3 mt-1.5 shrink-0" /> {step}
                            </li>)}
                          </ul>
                          <div className="bg-white/50 px-4 py-2 rounded-xl text-[10px] font-black text-green-600 uppercase tracking-widest inline-block border border-white">
                            Impacto: {s.impact}
                          </div>
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
            <div className="max-w-4xl mx-auto p-6 space-y-12 animate-in fade-in">
              <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-400 hover:text-black transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Menú Principal</button>
              <div className="space-y-4">
                <h2 className="text-5xl font-black tracking-tighter">Banco de Recetas Maestro</h2>
                <p className="text-gray-500 font-medium">Arquitectura culinaria diseñada para la longevidad celular.</p>
              </div>
              <div className="grid gap-6">
                {MASTER_RECIPES.map(r => (
                  <button key={r.id} onClick={() => setSelectedRecipe(r)} className="bg-white p-10 rounded-[3rem] border text-left flex justify-between items-center group hover:border-green-500 hover:shadow-2xl transition-all">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                         <span className="text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">{r.scienceQuick.mechanism}</span>
                         <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest bg-yellow-50 px-3 py-1 rounded-full">{r.scienceQuick.evidence}</span>
                      </div>
                      <h3 className="text-3xl font-black group-hover:text-green-600 transition-colors tracking-tight">{r.name}</h3>
                      <p className="text-gray-500 font-medium">{r.target}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-[2rem] group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                      <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
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
    className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all text-left group flex flex-col items-start min-h-[240px] relative overflow-hidden"
  >
    <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
       {React.cloneElement(icon as React.ReactElement, { size: 120 })}
    </div>
    <div className={`${color} text-white p-5 rounded-[1.5rem] mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500 relative z-10`}>
      {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8" })}
    </div>
    <div className="relative z-10">
      <h3 className="text-2xl font-black text-gray-800 mb-2 leading-none tracking-tight">{title}</h3>
      <p className="text-sm text-gray-400 font-bold mb-6">{desc}</p>
      <div className="text-green-600 flex items-center text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
        Abrir Módulo <ChevronRight className="w-3 h-3 ml-2" />
      </div>
    </div>
  </button>
);

export default App;
