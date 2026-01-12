
import { MolecularMechanism, Synergy, Technique, TroubleshootingItem, Recipe } from './types';

export const MECHANISMS: MolecularMechanism[] = [
  {
    id: 'nrf2',
    name: 'Activación Nrf2',
    simpleDesc: 'El interruptor maestro de la limpieza celular.',
    analogy: 'Es como enviar un equipo de limpieza 24/7 a tus células para eliminar residuos tóxicos.',
    whyItMatters: ['Detox hepática profunda', 'Protección contra contaminación', 'Aumento de glutatión'],
    keyNutrients: [{ name: 'Sulforafano', examples: 'Brotes de brócoli, rábanos' }],
    blockers: ['Exceso de fructosa', 'Sedentarismo', 'Estrés oxidativo'],
    scientificEvidence: 'Vía Keap1-Nrf2-ARE. El sulforafano es el activador natural más potente conocido.'
  },
  {
    id: 'nfkappab',
    name: 'Inhibición NF-κB',
    simpleDesc: 'El director de orquesta de la inflamación.',
    analogy: 'Es el detector de incendios de la célula. Si está activado, hay "fuego" (dolor) constante.',
    whyItMatters: ['Reducción de dolor articular', 'Salud cardiovascular', 'Prevención de neuroinflamación'],
    keyNutrients: [{ name: 'Curcumina', examples: 'Cúrcuma + Pimienta' }, { name: 'Antocianinas', examples: 'Arándanos' }],
    blockers: ['Grasas trans', 'Azúcar refinada', 'Falta de sueño'],
    scientificEvidence: 'Inhibición de la cascada de citoquinas pro-inflamatorias mediante fitonutrientes.'
  },
  {
    id: 'methylation',
    name: 'Soporte Metilación',
    simpleDesc: 'Reparación de ADN y regulación genética.',
    analogy: 'Son las notas adhesivas que marcan qué genes leer y cuáles ignorar en tu biblioteca biológica.',
    whyItMatters: ['Estabilidad emocional', 'Desintoxicación de estrógenos', 'Energía y foco'],
    keyNutrients: [{ name: 'Folato', examples: 'Espinacas' }, { name: 'Colina', examples: 'Yema de huevo' }],
    blockers: ['Deficiencia de B12', 'Consumo excesivo de alcohol', 'Gen MTHFR mutado'],
    scientificEvidence: 'Ciclo de un solo carbono. Crucial para la síntesis de neurotransmisores.'
  },
  {
    id: 'sirtuins',
    name: 'Activación Sirtuinas',
    simpleDesc: 'Los genes de la longevidad y la restricción calórica.',
    analogy: 'Son los trabajadores nocturnos que reparan la infraestructura mientras la ciudad duerme.',
    whyItMatters: ['Longevidad celular', 'Autofagia (reciclaje de proteínas)', 'Salud metabólica'],
    keyNutrients: [{ name: 'Quercetina', examples: 'Cebolla morada' }, { name: 'Resveratrol', examples: 'Uvas oscuras' }],
    blockers: ['Comida ultraprocesada', 'Falta de movimiento', 'Exceso calórico'],
    scientificEvidence: 'Proteínas SIRT1-7 reguladas por NAD+ y polifenoles específicos.'
  }
];

export const SYNERGIES: Synergy[] = [
  {
    id: 'mustard_hack',
    title: 'Hack de la Mostaza',
    rule: 'Brócoli cocido + Semilla Mostaza = Sulforafano x4',
    evidenceLevel: 5,
    science: 'La cocción inactiva la mirosinasa. La mostaza cruda la repone, permitiendo la creación de sulforafano.',
    howToApply: ['Añadir 1 cdta de polvo de mostaza al aderezo final.'],
    commonMistakes: ['Usar mostaza procesada barata sin enzimas activas.'],
    alternatives: ['Rábanos crudos rallados', 'Rúcula fresca']
  },
  {
    id: 'fat_carotenoids',
    title: 'Grasa + Carotenoides',
    rule: 'Tomate/Zanahoria + Grasa = Absorción x5',
    evidenceLevel: 5,
    science: 'Los carotenoides son liposolubles. Sin grasa, la absorción es casi nula.',
    howToApply: ['Añadir AOVE o aguacate siempre que consumas tomate o zanahoria.'],
    commonMistakes: ['Comer ensaladas sin aceite por miedo a las calorías.'],
    alternatives: ['Nueces', 'Semillas de cáñamo']
  },
  {
    id: 'vit_c_iron',
    title: 'Vitamina C + Hierro No-Hemo',
    rule: 'Hojas verdes + Limón = Absorción x3',
    evidenceLevel: 4,
    science: 'La vitamina C quelata el hierro vegetal haciéndolo soluble y absorbible.',
    howToApply: ['Rociar limón fresco sobre espinacas o garbanzos.'],
    commonMistakes: ['Tomar té con la comida (los taninos bloquean el hierro).'],
    alternatives: ['Pimiento rojo crudo', 'Kiwi']
  }
];

export const TECHNIQUES: Technique[] = [
  {
    id: 'massage_kale',
    name: 'Masaje de Kale',
    duration: '2 min',
    evidenceLevel: 2,
    why: 'Rompe las fibras rígidas de celulosa facilitando la digestión y liberando nutrientes.',
    steps: ['Pica el kale', 'Añade 1 cdta de aceite y sal', 'Masajea con las manos hasta que brille y se ablande.']
  },
  {
    id: 'thermal_shock',
    name: 'Shock Térmico (Blanching)',
    duration: '5 min',
    evidenceLevel: 4,
    why: 'Preserva la clorofila y detiene la degradación enzimática de vitaminas.',
    steps: ['Cocer brócoli 3 min', 'Sumergir inmediatamente en agua con hielo.', 'Escurrir bien.']
  }
];

export const MASTER_RECIPES: Recipe[] = [
  {
    id: 'nrf2_master',
    name: 'Activador Nrf2: Detox',
    target: 'Limpieza Hepática y Celular',
    molecularGoalDesc: 'Activa la producción de antioxidantes maestros (glutatión) para neutralizar toxinas ambientales.',
    scienceQuick: { mechanism: 'Activación Nrf2', evidence: '⭐⭐⭐⭐⭐', timeToEffect: '1 semana' },
    ingredients: [
      { name: 'Rúcula', amount: '2 tazas', category: 'base', reason: 'Donante de azufre' },
      { name: 'Brócoli (shock térmico)', amount: '1 taza', category: 'crucifera', reason: 'Precursor Sulforafano' },
      { name: 'Huevo poche', amount: '1 ud', category: 'proteina', reason: 'Colina (Metilación)' },
      { name: 'Semillas de mostaza', amount: '1 cdta', category: 'aderezo', reason: 'Activador enzimático' },
      { name: 'Aceite de Oliva EV', amount: '2 cdas', category: 'grasa', reason: 'Vehículo lipídico' }
    ],
    preparation: [
      'Cocer brócoli 3 min y pasar por agua helada.',
      'Masajear rúcula con sal y 1 cdta de aceite.',
      'Mezclar aderezo de mostaza y limón.',
      'Montar con el huevo y semillas.'
    ],
    totalTime: '15 min',
    secret: 'El polvo de mostaza cruda rescata el sulforafano que se perdería al cocinar el brócoli.',
    proOptimization: { whenToEat: 'Almuerzo', frequency: '3-4 veces/semana', combinesWith: 'Soporte Metilación' },
    smartRotation: 'Ideal tras exposición a contaminantes o viajes.'
  },
  {
    id: 'nfkappab_master',
    name: 'Protocolo Golden: Anti-Inflam',
    target: 'Reducción de Inflamación',
    molecularGoalDesc: 'Inhibe la vía NF-κB para reducir la producción de citoquinas inflamatorias.',
    scienceQuick: { mechanism: 'Inhibición NF-κB', evidence: '⭐⭐⭐⭐', timeToEffect: '48-72 horas' },
    ingredients: [
      { name: 'Espinacas baby', amount: '2 tazas', category: 'base', reason: 'Magnesio y Nitratos' },
      { name: 'Cúrcuma fresca', amount: '1 cdta', category: 'aderezo', reason: 'Inhibidor NF-κB' },
      { name: 'Pimienta negra', amount: 'Pizca', category: 'aderezo', reason: 'Activador Piperina' },
      { name: 'Nueces', amount: '4 uds', category: 'grasa', reason: 'Omega-3 ALA' },
      { name: 'Arándanos', amount: '1/2 taza', category: 'bioactivo', reason: 'Antocianinas' }
    ],
    preparation: [
      'Lavar espinacas concienzudamente.',
      'Rallar cúrcuma y mezclar con pimienta y aceite.',
      'Picar nueces.',
      'Mezclar todo suavemente para no romper los arándanos.'
    ],
    totalTime: '10 min',
    secret: 'La piperina de la pimienta aumenta la biodisponibilidad de la curcumina en un 2000%.',
    proOptimization: { whenToEat: 'Cena', frequency: 'A diario si hay dolor', combinesWith: 'Detox Nrf2' },
    smartRotation: 'Esencial para recuperación post-ejercicio intenso.'
  },
  {
    id: 'sirt_master',
    name: 'Protocolo SIRT: Longevidad',
    target: 'Activación de Sirtuinas',
    molecularGoalDesc: 'Mimetiza los efectos del ayuno para activar los mecanismos de reparación de longevidad.',
    scienceQuick: { mechanism: 'Vía SIRT1-NAD+', evidence: '⭐⭐⭐⭐', timeToEffect: 'Uso crónico' },
    ingredients: [
      { name: 'Cebolla morada', amount: '1/4 taza', category: 'bioactivo', reason: 'Quercetina' },
      { name: 'Alcaparras', amount: '1 cda', category: 'bioactivo', reason: 'Quercetina concentrada' },
      { name: 'Col rizada (kale)', amount: '2 tazas', category: 'base', reason: 'Activador Sirt' },
      { name: 'Perejil fresco', amount: '1/2 taza', category: 'base', reason: 'Apigenina' },
      { name: 'AOVE', amount: '2 cdas', category: 'grasa', reason: 'Ácido Oleico' }
    ],
    preparation: [
      'Masajear kale 2 min.',
      'Picar perejil muy fino.',
      'Añadir cebolla remojada en vinagre (reduce picor).',
      'Emulsionar AOVE con alcaparras.'
    ],
    totalTime: '12 min',
    secret: 'La apigenina del perejil preserva los niveles de NAD+, combustible de las sirtuinas.',
    proOptimization: { whenToEat: 'Almuerzo', frequency: '2-3 veces/semana', combinesWith: 'Anti-Inflam' },
    smartRotation: 'Ideal en días de ayuno intermitente.'
  }
];

export const TROUBLESHOOTING: TroubleshootingItem[] = [
  {
    issue: "El kale me da gases",
    diagnosis: ["Sensibilidad a rafinosa", "Fibra cruda rígida", "Microbioma no adaptado"],
    solutions: [
      {
        title: "Técnica de Escaldado",
        steps: ["Sumerge kale 45 seg en agua hirviendo", "Shock térmico en hielo"],
        impact: "Rompe fibras y reduce carbohidratos fermentables."
      },
      {
        title: "Masaje Profundo",
        steps: ["Usa sal y aceite para masajear 3 min", "Deja reposar 15 min antes de comer"],
        impact: "Pre-digestión mecánica."
      }
    ]
  },
  {
    issue: "No noto cambios en energía",
    diagnosis: ["Baja absorción de grasa", "Falta de rotación", "Pimienta no molida al momento"],
    solutions: [
      {
        title: "Aumentar Vehículo Graso",
        steps: ["Añadir 1/2 aguacate extra", "Usar nueces activadas"],
        impact: "Asegura la absorción de vitaminas liposolubles clave."
      }
    ]
  }
];
