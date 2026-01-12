
import React, { useState } from 'react';
// Added missing Ingredient and Synergy types to the import statement
import { AppMode, Recipe, MolecularMechanism, Ingredient, Synergy } from './types';
import { MECHANISMS, SYNERGIES } from './constants';
import { generateProtocolRecipe, checkSynergyWithAI } from './services/gemini';
import { 
  Dna, 
  ShieldCheck, 
  Flame, 
  Hourglass, 
  Brain, 
  Microscope, 
  ChefHat, 
  BookOpen, 
  ShoppingCart, 
  AlertTriangle,
  ChevronRight,
  ArrowLeft,
  Plus,
  Loader2,
  Sparkles
} from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [synergyResult, setSynergyResult] = useState<string | null>(null);

  const renderDashboard = () => (
    <div className="max-w-4xl mx-auto p-4 animate-in fade-in duration-500">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-green-700 mb-2">Nutriwellkitt</h1>
        <p className="text-gray-600 italic">Arquitectura Nutrigenómica para tu Longevidad</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MenuButton 
          icon={<Plus className="w-6 h-6" />} 
          title="Crear Ensalada" 
          desc="Basado en lo que tienes hoy" 
          onClick={() => setMode(AppMode.CREATE_SALAD)}
          color="bg-green-100 text-green-700"
        />
        <MenuButton 
          icon={<Dna className="w-6 h-6" />} 
          title="Objetivo Genómico" 
          desc="Optimiza vías moleculares" 
          onClick={() => setMode(AppMode.GENOMIC_DESIGN)}
          color="bg-blue-100 text-blue-700"
        />
        <MenuButton 
          icon={<Microscope className="w-6 h-6" />} 
          title="Verificar Sinergias" 
          desc="8 sinergias verificadas" 
          onClick={() => setMode(AppMode.CHECK_SYNERGY)}
          color="bg-purple-100 text-purple-700"
        />
        <MenuButton 
          icon={<ChefHat className="w-6 h-6" />} 
          title="Aprender Técnicas" 
          desc="Hacks culinarios validados" 
          onClick={() => setMode(AppMode.LEARN_TECHNIQUES)}
          color="bg-orange-100 text-orange-700"
        />
        <MenuButton 
          icon={<BookOpen className="w-6 h-6" />} 
          title="Entender Nutrigenómica" 
          desc="Guía de fundamentos" 
          onClick={() => setMode(AppMode.LEARN_NUTRIGENOMICS)}
          color="bg-indigo-100 text-indigo-700"
        />
        <MenuButton 
          icon={<AlertTriangle className="w-6 h-6" />} 
          title="Troubleshooting" 
          desc="¿Por qué no veo resultados?" 
          onClick={() => setMode(AppMode.TROUBLESHOOTING)}
          color="bg-red-100 text-red-700"
        />
      </div>
    </div>
  );

  const renderGenomicDesign = () => (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-500 mb-6 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Menú
      </button>
      
      {!recipe ? (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Dna className="mr-2 text-blue-600" /> ¿Qué sistema quieres optimizar hoy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectionCard 
              title="Reparación de ADN" 
              benefit="Salud mental y estabilidad" 
              onClick={() => handleGenerateRecipe("Metilación (Reparación de ADN)")}
              icon={<Dna />}
            />
            <SelectionCard 
              title="Detox Celular" 
              benefit="Nrf2 - Limpieza hepática" 
              onClick={() => handleGenerateRecipe("Nrf2 (Detoxificación)")}
              icon={<ShieldCheck />}
            />
            <SelectionCard 
              title="Control de Inflamación" 
              benefit="NF-κB - Dolor y corazón" 
              onClick={() => handleGenerateRecipe("NF-κB (Anti-inflamatorio)")}
              icon={<Flame />}
            />
            <SelectionCard 
              title="Longevidad (Sirtuinas)" 
              benefit="Metabolismo y autofagia" 
              onClick={() => handleGenerateRecipe("Sirtuinas (Anti-envejecimiento)")}
              icon={<Hourglass />}
            />
            <SelectionCard 
              title="Eje Intestino-Cerebro" 
              benefit="Ánimo y salud digestiva" 
              onClick={() => handleGenerateRecipe("Psicobiótico (Intestino-Cerebro)")}
              icon={<Brain />}
            />
          </div>
        </div>
      ) : (
        <RecipeDisplay recipe={recipe} onReset={() => setRecipe(null)} />
      )}
    </div>
  );

  const handleGenerateRecipe = async (goal: string) => {
    setLoading(true);
    try {
      const result = await generateProtocolRecipe(goal, "Prevención general y optimización");
      setRecipe(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderLearnNutrigenomics = () => (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-500 mb-6 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver
      </button>
      <h2 className="text-3xl font-bold mb-8">Fundamentos Nutrigenómicos</h2>
      
      <div className="space-y-12">
        <section>
          <h3 className="text-xl font-bold mb-4 flex items-center text-blue-800">
            <Sparkles className="mr-2" /> Los 6 Mecanismos Maestros
          </h3>
          <div className="grid gap-6">
            {MECHANISMS.map(m => <MechanismCard key={m.id} mechanism={m} />)}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4 flex items-center text-purple-800">
            <Microscope className="mr-2" /> Sinergias Científicas Verificadas
          </h3>
          <div className="grid gap-4">
            {SYNERGIES.map(s => <SynergyCard key={s.id} synergy={s} />)}
          </div>
        </section>
      </div>
    </div>
  );

  const renderCheckSynergy = () => {
    const [ingredients, setIngredients] = useState("");
    
    const handleCheck = async () => {
        setLoading(true);
        const list = ingredients.split(',').map(i => i.trim());
        const result = await checkSynergyWithAI(list);
        setSynergyResult(result);
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
             <button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center text-gray-500 mb-6 hover:text-gray-700">
                <ArrowLeft className="w-4 h-4 mr-2" /> Volver
            </button>
            <h2 className="text-2xl font-bold mb-4">Verificador de Sinergias</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Introduce tus ingredientes (separados por coma)</label>
                <textarea 
                    className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    rows={4}
                    placeholder="Ej: Brócoli, mostaza, kale, aguacate..."
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
                <button 
                    onClick={handleCheck}
                    disabled={loading || !ingredients}
                    className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 flex justify-center items-center"
                >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : "Verificar Potencial Epigenético"}
                </button>
            </div>

            {synergyResult && (
                <div className="mt-8 bg-purple-50 p-6 rounded-xl border border-purple-100 prose prose-purple max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: synergyResult.replace(/\n/g, '<br/>') }} />
                </div>
            )}
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => setMode(AppMode.DASHBOARD)}>
            <div className="bg-green-600 p-2 rounded-lg mr-2">
              <Dna className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Nutriwellkitt</span>
          </div>
          <button className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
            v2.1 Pro
          </button>
        </div>
      </nav>

      <main className="pt-8">
        {loading && mode !== AppMode.CHECK_SYNERGY && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
            <p className="text-lg font-medium text-gray-700">Calculando sinergias moleculares...</p>
            <p className="text-sm text-gray-500">Optimizando tu lienzo epigenético</p>
          </div>
        )}

        {mode === AppMode.DASHBOARD && renderDashboard()}
        {mode === AppMode.GENOMIC_DESIGN && renderGenomicDesign()}
        {mode === AppMode.LEARN_NUTRIGENOMICS && renderLearnNutrigenomics()}
        {mode === AppMode.CHECK_SYNERGY && renderCheckSynergy()}
        
        {/* Simplified placeholders for other modes to keep the file length manageable */}
        {(mode === AppMode.CREATE_SALAD || mode === AppMode.LEARN_TECHNIQUES || mode === AppMode.TROUBLESHOOTING) && (
            <div className="text-center p-12">
                <div className="bg-white p-8 rounded-2xl shadow-sm inline-block max-w-md">
                    <h3 className="text-xl font-bold mb-2">Próximamente</h3>
                    <p className="text-gray-500 mb-4">Esta función está siendo calibrada con los últimos estudios de 2024.</p>
                    <button onClick={() => setMode(AppMode.DASHBOARD)} className="text-green-600 font-bold">Volver al inicio</button>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

// Sub-components
const MenuButton: React.FC<{ icon: React.ReactNode, title: string, desc: string, onClick: () => void, color: string }> = ({ icon, title, desc, onClick, color }) => (
  <button 
    onClick={onClick}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-300 transition-all text-left group flex flex-col items-start"
  >
    <div className={`${color} p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-gray-500 text-sm">{desc}</p>
    <div className="mt-4 text-green-600 flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
      Explorar <ChevronRight className="w-4 h-4 ml-1" />
    </div>
  </button>
);

const SelectionCard: React.FC<{ title: string, benefit: string, onClick: () => void, icon: React.ReactNode }> = ({ title, benefit, onClick, icon }) => (
  <button 
    onClick={onClick}
    className="bg-white border border-gray-200 p-5 rounded-xl text-left hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center space-x-4"
  >
    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-500">{benefit}</p>
    </div>
  </button>
);

const RecipeDisplay: React.FC<{ recipe: Recipe, onReset: () => void }> = ({ recipe, onReset }) => (
  <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-500">
    <div className="bg-green-700 text-white p-8">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-green-600/50 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Protocolo Nutriwellkitt</span>
        <button onClick={onReset} className="text-white/70 hover:text-white"><Plus className="rotate-45" /></button>
      </div>
      <h2 className="text-4xl font-black mb-2 uppercase">{recipe.name}</h2>
      <div className="flex items-center space-x-4 text-green-100 text-sm">
        <span className="flex items-center"><Hourglass className="w-4 h-4 mr-1" /> {recipe.totalTime}</span>
        <span className="flex items-center"><Sparkles className="w-4 h-4 mr-1" /> {recipe.target}</span>
      </div>
    </div>

    <div className="p-8 space-y-8">
      <section className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
        <h3 className="text-blue-900 font-bold mb-2 flex items-center"><Microscope className="w-5 h-5 mr-2" /> Ciencia Molecular</h3>
        <p className="text-blue-800 text-sm mb-4 leading-relaxed">{recipe.molecularGoalDesc}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><span className="block text-[10px] text-blue-400 font-bold uppercase">Mecanismo</span> <span className="text-xs font-semibold">{recipe.scienceQuick.mechanism}</span></div>
          <div><span className="block text-[10px] text-blue-400 font-bold uppercase">Evidencia</span> <span className="text-xs font-semibold">{recipe.scienceQuick.evidence}</span></div>
          <div><span className="block text-[10px] text-blue-400 font-bold uppercase">Resultados</span> <span className="text-xs font-semibold">{recipe.scienceQuick.timeToEffect}</span></div>
        </div>
      </section>

      <div>
        <h3 className="text-xl font-bold mb-4 border-b pb-2 flex items-center"><ShoppingCart className="w-5 h-5 mr-2" /> Ingredientes Funcionales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <IngredientGroup title="Base (Lienzo Epigenético)" items={recipe.ingredients.base} />
          <IngredientGroup title="Proteína (Activador)" items={recipe.ingredients.protein} />
          <IngredientGroup title="Grasa (Vehículo)" items={recipe.ingredients.fat} />
          <IngredientGroup title="Bioactivos (Fitoquímicos)" items={recipe.ingredients.bioactives} />
          <IngredientGroup title="Aderezo (Farmacia)" items={recipe.ingredients.dressing} />
        </div>
      </div>

      <section className="bg-gray-50 p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4 flex items-center"><ChefHat className="w-5 h-5 mr-2" /> Preparación Maestra</h3>
        <ol className="space-y-4">
          {recipe.preparation.map((step, i) => (
            <li key={i} className="flex space-x-3 text-gray-700">
              <span className="font-bold text-green-600 shrink-0">{i + 1}.</span>
              <p className="text-sm">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
        <h4 className="text-orange-900 font-black text-lg mb-2 flex items-center"><Sparkles className="w-5 h-5 mr-2" /> EL SECRETO DE ESTA RECETA</h4>
        <p className="text-orange-800 text-sm italic">{recipe.secret}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <h5 className="font-bold text-gray-800 mb-2">Optimización PRO</h5>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Cuándo: {recipe.proOptimization.whenToEat}</li>
            <li>• Frecuencia: {recipe.proOptimization.frequency}</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <h5 className="font-bold text-green-800 mb-1 flex items-center text-sm"><Dna className="w-4 h-4 mr-2" /> Rotación Inteligente</h5>
          <p className="text-xs text-green-700">{recipe.smartRotation}</p>
        </div>
      </div>
    </div>
  </div>
);

// Changed parameter type to Ingredient[]
const IngredientGroup: React.FC<{ title: string, items: Ingredient[] }> = ({ title, items }) => (
  <div>
    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="group">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-gray-800">{item.name} <span className="text-gray-400 font-normal">({item.amount})</span></span>
          </div>
          <p className="text-[10px] text-gray-500 italic mt-0.5 group-hover:text-green-600 transition-colors">
            {item.power || item.reason}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

const MechanismCard: React.FC<{ mechanism: MolecularMechanism }> = ({ mechanism }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <h4 className="text-xl font-bold text-blue-900">{mechanism.name}</h4>
      <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">Mecanismo</div>
    </div>
    <div className="space-y-4">
      <div>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Qué es</span>
        <p className="text-sm font-medium text-gray-700 italic">"{mechanism.simpleDesc}"</p>
      </div>
      <div>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Analogía</span>
        <p className="text-sm text-gray-600">{mechanism.analogy}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Nutrientes Clave</span>
          <ul className="text-xs text-gray-600">
            {mechanism.keyNutrients.map((n, i) => <li key={i}>• {n.name} ({n.examples})</li>)}
          </ul>
        </div>
        <div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Bloqueadores</span>
          <ul className="text-xs text-red-500">
            {mechanism.blockers.map((b, i) => <li key={i}>• {b}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Changed parameter type to Synergy
const SynergyCard: React.FC<{ synergy: Synergy }> = ({ synergy }) => (
  <div className="bg-white p-5 rounded-2xl border border-purple-100 hover:border-purple-300 transition-colors">
    <div className="flex justify-between items-center mb-3">
      <h4 className="font-bold text-purple-900">{synergy.title}</h4>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < synergy.evidenceLevel ? "text-yellow-400" : "text-gray-200"}>★</span>
        ))}
      </div>
    </div>
    <p className="text-sm font-bold bg-purple-50 p-2 rounded-lg text-purple-700 mb-3">{synergy.rule}</p>
    <p className="text-xs text-gray-500 leading-relaxed">{synergy.science}</p>
    <div className="mt-4 pt-4 border-t border-purple-50 flex justify-between">
      <div className="text-[10px] text-gray-400">Ver Detalles <ChevronRight className="inline w-3 h-3" /></div>
      <span className="text-[10px] font-bold text-purple-500 uppercase">Sinergia #{synergy.id.split('_')[0]}</span>
    </div>
  </div>
);

export default App;
