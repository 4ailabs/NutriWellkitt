
import { MolecularMechanism, Synergy, Technique, TroubleshootingItem, Recipe } from './types';

export const MECHANISMS: MolecularMechanism[] = [
  {
    id: 'nrf2',
    name: 'Activación Nrf2',
    simpleDesc: 'El interruptor maestro de la limpieza celular.',
    analogy: 'Es como enviar un equipo de limpieza 24/7 a tus células para eliminar residuos tóxicos.',
    whyItMatters: ['Detox hepática profunda', 'Protección contra contaminación', 'Aumento de glutatión'],
    keyNutrients: [{ name: 'Sulforafano', examples: 'Brotes de brócoli, brócoli + mostaza' }],
    blockers: ['Cocinar brócoli >5 min', 'No incluir grasa con fitoquímicos', 'Consumo irregular'],
    scientificEvidence: 'Vía Keap1-Nrf2-ARE. El sulforafano activa más de 200 genes protectores. Evidencia: ⭐⭐⭐⭐⭐'
  },
  {
    id: 'nfkappab',
    name: 'Inhibición NF-κB',
    simpleDesc: 'El director de orquesta de la inflamación.',
    analogy: 'Es el detector de incendios de la célula. Si está siempre activado, hay "fuego" (inflamación) constante.',
    whyItMatters: ['Reducción de dolor articular', 'Salud cardiovascular', 'Prevención de neuroinflamación'],
    keyNutrients: [
      { name: 'Curcumina', examples: 'Cúrcuma + Pimienta + Grasa' }, 
      { name: 'Antocianinas', examples: 'Arándanos, col morada' }
    ],
    blockers: ['Grasas trans', 'Azúcar refinada', 'Falta de sueño', 'Estrés crónico'],
    scientificEvidence: 'Inhibición de la cascada de citoquinas pro-inflamatorias (IL-6, TNF-α). Evidencia: ⭐⭐⭐⭐'
  },
  {
    id: 'methylation',
    name: 'Soporte Metilación',
    simpleDesc: 'Reparación de ADN y regulación genética.',
    analogy: 'Son las notas adhesivas que marcan qué genes leer y cuáles ignorar en tu biblioteca biológica.',
    whyItMatters: ['Estabilidad del genoma', 'Función cerebral óptima', 'Regulación del ánimo', 'Detox de hormonas'],
    keyNutrients: [
      { name: 'Folato (B9)', examples: 'Espinacas, kale' }, 
      { name: 'Colina', examples: 'Yema de huevo' },
      { name: 'Betaína', examples: 'Remolacha' }
    ],
    blockers: ['Deficiencia de B12/folato', 'Alcohol excesivo', 'Deficiencia de zinc/magnesio'],
    scientificEvidence: 'Ciclo de un carbono. Donadores de metilos esenciales para expresión genética. Evidencia: ⭐⭐⭐⭐⭐'
  },
  {
    id: 'sirtuins',
    name: 'Activación Sirtuinas',
    simpleDesc: 'Los genes de la longevidad y el ayuno.',
    analogy: 'Son los trabajadores nocturnos que reparan la infraestructura celular mientras duermes.',
    whyItMatters: ['Longevidad celular', 'Autofagia (reciclaje proteico)', 'Salud metabólica', 'Protección mitocondrial'],
    keyNutrients: [
      { name: 'Quercetina', examples: 'Cebolla morada, alcaparras' }, 
      { name: 'Resveratrol', examples: 'Uvas oscuras' },
      { name: 'Apigenina', examples: 'Perejil' }
    ],
    blockers: ['Comida ultraprocesada', 'Sedentarismo', 'Exceso calórico constante'],
    scientificEvidence: 'Proteínas SIRT1-7 reguladas por NAD+ y polifenoles. Mimetiza restricción calórica. Evidencia: ⭐⭐⭐⭐'
  },
  {
    id: 'telomeres',
    name: 'Protección Telomérica',
    simpleDesc: 'Los relojes biológicos del envejecimiento celular.',
    analogy: 'Como los protectores de plástico en las puntas de las agujetas. Sin ellos, se deshilachan (envejeces).',
    whyItMatters: ['Prevención de envejecimiento prematuro', 'Protección contra cáncer', 'Longevidad celular'],
    keyNutrients: [
      { name: 'Licopeno', examples: 'Tomate asado + aceite' },
      { name: 'Antioxidantes', examples: 'Vitamina C, E' }
    ],
    blockers: ['Estrés oxidativo', 'Inflamación crónica', 'Tabaquismo'],
    scientificEvidence: 'El licopeno y antioxidantes reducen el acortamiento telomérico. Evidencia: ⭐⭐⭐⭐'
  },
  {
    id: 'psychobiotic',
    name: 'Eje Intestino-Cerebro',
    simpleDesc: 'La conexión directa entre tu digestión y tu mente.',
    analogy: 'Tu intestino es como un segundo cerebro que produce el 90% de tu serotonina (felicidad).',
    whyItMatters: ['Regulación del ánimo', 'Reducción de ansiedad', 'Mejor digestión', 'Sistema inmune fuerte'],
    keyNutrients: [
      { name: 'Prebióticos', examples: 'Espárragos, alcachofa' },
      { name: 'Probióticos', examples: 'Chucrut, kimchi' }
    ],
    blockers: ['Antibióticos frecuentes', 'Dieta baja en fibra', 'Estrés crónico'],
    scientificEvidence: 'El nervio vago conecta intestino-cerebro. Microbioma produce neurotransmisores. Evidencia: ⭐⭐⭐⭐'
  }
];

export const SYNERGIES: Synergy[] = [
  {
    id: 'mustard_hack',
    title: 'Hack de la Mostaza',
    rule: 'Brócoli cocido + Semilla Mostaza = Sulforafano x4-5',
    evidenceLevel: 5,
    science: 'La cocción inactiva la mirosinasa del brócoli (enzima termoensible). La mostaza cruda aporta mirosinasa activa que convierte glucorafanina → sulforafano. Estudio: Okunade 2018 (n=12 humanos, incremento 4.5x en metabolitos urinarios).',
    howToApply: ['Cocinar brócoli 3-4 min al vapor', 'Enfriar', 'Añadir 1 cdta polvo de mostaza al aderezo'],
    commonMistakes: ['Usar solo mostaza Dijon (procesada, menos enzimas)', 'Añadir mostaza al brócoli hirviendo (inactiva enzimas)'],
    alternatives: ['Rábanos crudos picados', 'Rúcula fresca (menos potente)', 'Wasabi']
  },
  {
    id: 'curcumin_piperine',
    title: 'Trinidad de la Cúrcuma',
    rule: 'Cúrcuma + Pimienta + Grasa = Absorción x2-4',
    evidenceLevel: 3,
    science: 'La piperina de la pimienta negra aumenta absorción de curcumina 2-4 veces (NO 2000% como se popularizó). Sin grasa, la curcumina es casi inabsorbible. Estudios recientes muestran resultados mixtos, pero la combinación es mejor que cúrcuma sola.',
    howToApply: ['1 cdta cúrcuma + ¼ cdta pimienta recién molida + 2 cdas AOVE', 'Mezclar con alimentos tibios (mejor disolución)'],
    commonMistakes: ['Usar pimienta pre-molida vieja (pierde piperina)', 'Omitir la grasa', 'No usar suficiente pimienta'],
    alternatives: ['Jengibre para potenciar (no sustituye pimienta)', 'Usar formulaciones de curcumina mejoradas']
  },
  {
    id: 'fat_carotenoids',
    title: 'Grasa + Carotenoides',
    rule: 'Tomate/Zanahoria + Grasa = Absorción x4-15',
    evidenceLevel: 5,
    science: 'Los carotenoides (licopeno, β-caroteno) son liposolubles. Sin grasa, la absorción es casi nula (<5%). Con AOVE o aguacate: licopeno x4.4, β-caroteno x2.6-15.3, α-caroteno x7.2. Estudios: Brown 2004, Unlu 2005 (Ohio State).',
    howToApply: ['Añadir mínimo 1 cda AOVE o ½ aguacate', 'Las grasas insaturadas son 2-3x más efectivas que saturadas'],
    commonMistakes: ['Ensaladas "light" sin aceite', 'Usar aderezos bajos en grasa'],
    alternatives: ['Nueces', 'Semillas de cáñamo', 'Aceite de aguacate']
  },
  {
    id: 'vit_c_iron',
    title: 'Vitamina C + Hierro No-Hemo',
    rule: 'Hojas verdes + Limón = Absorción x2-6',
    evidenceLevel: 4,
    science: 'La vitamina C quelata el hierro no-hemo (vegetal) haciéndolo soluble. Incremento real: 2-4x a dosis dietéticas típicas (50-100mg); 6x requiere 500mg+ vitamina C o consumo con inhibidores como fitatos.',
    howToApply: ['Rociar jugo de limón fresco sobre espinacas/garbanzos', 'Añadir pimiento rojo crudo'],
    commonMistakes: ['Tomar té o café con la comida (taninos bloquean hierro)', 'Usar limón embotellado (menos vitamina C)'],
    alternatives: ['Pimiento rojo', 'Kiwi', 'Fresas']
  },
  {
    id: 'lycopene_heat_fat',
    title: 'Tomate Asado + Aceite',
    rule: 'Calor + Grasa + Tomate = Licopeno x2.5-3.8',
    evidenceLevel: 5,
    science: 'Cocinar tomates rompe paredes celulares y convierte licopeno trans→cis (más absorbible). Con aceite: concentración pico x2.5, AUC x3.8. Estudio: Gärtner 1997, Fielding 2005.',
    howToApply: ['Asar tomates 15 min a 180°C con AOVE', 'Usar pasta de tomate concentrada con aceite'],
    commonMistakes: ['Comer solo tomates crudos sin grasa', 'Cocinar sin aceite'],
    alternatives: ['Pasta de tomate (más concentrado)', 'Tomates cherry horneados']
  },
  {
    id: 'sprouts_power',
    title: 'Brotes vs Maduros',
    rule: 'Brotes de brócoli = 10-100x Sulforafano',
    evidenceLevel: 5,
    science: 'Los brotes de brócoli de 3 días contienen 10-100x más glucorafanina (precursor) que brócoli maduro. Son la fuente más concentrada de sulforafano natural.',
    howToApply: ['Añadir ½ taza brotes crudos al final', 'NO cocinar los brotes (destruye todo)'],
    commonMistakes: ['Cocinar los brotes', 'Comprar brotes viejos (>5 días)'],
    alternatives: ['Brócoli maduro + mustard hack', 'Suplementos de sulforafano']
  }
];

export const TECHNIQUES: Technique[] = [
  {
    id: 'massage_kale',
    name: 'Masaje de Kale',
    duration: '2 min',
    evidenceLevel: 2,
    why: 'Rompe las fibras de celulosa facilitando textura. Beneficio nutricional no comprobado científicamente, pero mejora palatabilidad dramáticamente.',
    steps: [
      'Retirar tallos centrales del kale',
      'Picar en trozos medianos',
      'Añadir 1 cdta aceite + pizca sal',
      'Masajear con las manos 2 minutos',
      'Debe verse brillante y sentirse sedoso'
    ]
  },
  {
    id: 'thermal_shock',
    name: 'Shock Térmico (Blanching)',
    duration: '5 min',
    evidenceLevel: 4,
    why: 'Preserva clorofila (color verde brillante) y detiene la degradación enzimática de vitaminas. Reduce pérdida de nutrientes vs cocción prolongada.',
    steps: [
      'Hervir agua con sal',
      'Sumergir brócoli/espinaca 3-4 min (debe quedar al dente)',
      'Inmediatamente sumergir en agua con hielo',
      'Escurrir muy bien',
      'Usar frío o tibio (no recalentar)'
    ]
  },
  {
    id: 'emulsify_dressing',
    name: 'Emulsionar Aderezos',
    duration: '1 min',
    evidenceLevel: 4,
    why: 'Un aderezo bien emulsionado distribuye sabores uniformemente y maximiza contacto de nutrientes liposolubles con grasa.',
    steps: [
      'Usar frasco de vidrio con tapa',
      'ORDEN: 1) Emulsificante (mostaza/miso), 2) Ácido (vinagre/limón), 3) Especias, 4) Aceite al final',
      'Agitar vigorosamente 30 segundos',
      'Debe verse cremoso, no separado'
    ]
  },
  {
    id: 'activate_turmeric',
    name: 'Activar Cúrcuma Correctamente',
    duration: '2 min',
    evidenceLevel: 3,
    why: 'La curcumina necesita 3 elementos SIEMPRE: pimienta (piperina), grasa (vehículo lipídico), y calor suave.',
    steps: [
      '1 cdta cúrcuma en polvo o fresca rallada',
      '¼ cdta pimienta negra RECIÉN MOLIDA',
      '2 cdas AOVE',
      'Mezclar con alimentos tibios (no hirviendo)',
      'Dejar reposar 5-10 min antes de servir'
    ]
  },
  {
    id: 'cook_broccoli',
    name: 'Cocinar Brócoli Sin Perder Nutrientes',
    duration: '4 min',
    evidenceLevel: 4,
    why: 'El brócoli cocido >5 min pierde >90% de sulforafano. El tiempo exacto es crítico.',
    steps: [
      'Agua hirviendo con sal',
      'Floretes de brócoli (tamaño uniforme)',
      'Cocinar EXACTAMENTE 3-4 minutos',
      'Debe quedar verde brillante y al dente',
      'Shock térmico inmediato en hielo',
      'CRÍTICO: Añadir polvo de mostaza al aderezo'
    ]
  }
];

export const MASTER_RECIPES: Recipe[] = [
  {
    id: 'nrf2_master',
    name: 'Activador Nrf2: Detox',
    target: 'Limpieza Hepática y Celular',
    molecularGoalDesc: 'Activa la producción de antioxidantes maestros (glutatión, SOD, catalasa) para neutralizar toxinas ambientales y proteger el ADN.',
    scienceQuick: { 
      mechanism: 'Activación Nrf2 → ARE', 
      evidence: '⭐⭐⭐⭐⭐ (Johns Hopkins)', 
      timeToEffect: '1-2 semanas' 
    },
    ingredients: [
      { name: 'Rúcula', amount: '2 tazas', category: 'base', reason: 'Donante de azufre para glutatión' },
      { name: 'Kale masajeado', amount: '2 tazas', category: 'base', reason: 'Glucosinolatos + fibra' },
      { name: 'Brócoli (cocido 3-4 min)', amount: '1 taza', category: 'crucifera', reason: 'Glucorafanina (precursor)' },
      { name: 'Brotes de brócoli', amount: '½ taza', category: 'crucifera', reason: 'Sulforafano 10-100x concentrado' },
      { name: 'Rábanos rebanados', amount: '4 unidades', category: 'crucifera', reason: 'Mirosinasa activa' },
      { name: 'Aceite de Oliva EV', amount: '4 cdas', category: 'grasa', reason: 'Vehículo lipídico' },
      { name: 'Polvo semilla mostaza', amount: '1 cdta', category: 'aderezo', reason: '⚡ CLAVE: Rescata sulforafano', power: 'Mirosinasa enzimática' },
      { name: 'Mostaza Dijon', amount: '1 cda', category: 'aderezo', reason: 'Emulsificante + sabor' },
      { name: 'Vinagre de manzana', amount: '2 cdas', category: 'aderezo', reason: 'Ácido para emulsión' },
      { name: 'Miel cruda', amount: '1 cdta', category: 'aderezo', reason: 'Balance dulce' }
    ],
    preparation: [
      'Cocinar brócoli al vapor EXACTAMENTE 3-4 min hasta verde brillante',
      'Shock térmico inmediato en agua helada, escurrir',
      'Masajear kale con 1 cdta aceite + sal por 2 minutos',
      'Preparar aderezo en frasco: mostaza Dijon + POLVO mostaza + vinagre + miel + AOVE restante. Agitar 30 seg',
      'En bowl: rúcula + kale + brócoli frío + rábanos',
      'Verter aderezo y mezclar bien',
      'ÚLTIMO: Corona con brotes de brócoli crudos (no mezclar)'
    ],
    totalTime: '15 min',
    secret: 'El polvo de semilla de mostaza rescata el sulforafano que el brócoli perdió al cocinarse. Sin este hack, pierdes el 80% del beneficio. Estudio: Okunade 2018 mostró incremento de 4.5x en biodisponibilidad.',
    proOptimization: { 
      whenToEat: 'Almuerzo', 
      frequency: '3-4 veces/semana', 
      combinesWith: 'Soporte Metilación' 
    },
    smartRotation: 'Ideal tras exposición a contaminantes, viajes en avión, o consumo de alcohol.'
  },
  {
    id: 'nfkappab_master',
    name: 'Protocolo Golden: Anti-Inflam',
    target: 'Reducción de Inflamación Crónica',
    molecularGoalDesc: 'Inhibe la vía NF-κB para reducir la producción de citoquinas inflamatorias (IL-6, TNF-α, IL-1β) que causan dolor y envejecimiento.',
    scienceQuick: { 
      mechanism: 'Inhibición NF-κB', 
      evidence: '⭐⭐⭐⭐ (estudios clínicos)', 
      timeToEffect: '48-72 horas' 
    },
    ingredients: [
      { name: 'Lechugas mixtas', amount: '2 tazas', category: 'base', reason: 'Base suave y digerible' },
      { name: 'Col lombarda picada fina', amount: '1 taza', category: 'base', reason: 'Antocianinas anti-inflam' },
      { name: 'Quinoa cocida (tibia)', amount: '1 taza', category: 'proteina', reason: 'Proteína completa + absorbe cúrcuma' },
      { name: 'Arándanos', amount: '½ taza', category: 'bioactivo', reason: 'Antocianinas potentes' },
      { name: 'Zanahoria rallada', amount: '1 mediana', category: 'bioactivo', reason: 'β-caroteno' },
      { name: 'Nueces picadas', amount: '¼ taza', category: 'grasa', reason: 'Omega-3 ALA + textura' },
      { name: 'Semillas lino molidas', amount: '2 cdas', category: 'grasa', reason: 'Omega-3 + lignanos' },
      { name: 'AOVE', amount: '4 cdas', category: 'grasa', reason: 'Ácido oleico + vehículo' },
      { name: 'Cúrcuma en polvo', amount: '1 cdta colmada', category: 'aderezo', reason: '⚡ Inhibidor NF-κB', power: 'Curcumina' },
      { name: 'Pimienta negra recién molida', amount: '¼ cdta', category: 'aderezo', reason: '⚡ INNEGOCIABLE: Piperina', power: 'Aumenta absorción 2-4x' },
      { name: 'Jengibre fresco rallado', amount: '½ cdta', category: 'aderezo', reason: 'Gingerol anti-inflam' },
      { name: 'Vinagre de manzana', amount: '2 cdas', category: 'aderezo', reason: 'Ácido acético' }
    ],
    preparation: [
      'Cocinar quinoa (1 taza quinoa + 2 tazas agua, 15 min). Dejar enfriar a tibio',
      'Picar col lombarda MUY fina (estilo coleslaw)',
      'Moler semillas de lino AL MOMENTO (molinillo o mortero)',
      'Preparar aderezo GOLDEN en frasco: cúrcuma + pimienta + jengibre + vinagre + AOVE. Agitar 30 seg hasta color dorado intenso',
      'MARINAR quinoa tibia con 2 cdas del aderezo golden. Reposar 10 min',
      'Base: lechugas + col lombarda',
      'Añadir: quinoa marinada + zanahoria + bayas + nueces',
      'Verter aderezo restante',
      'ÚLTIMO: Espolvorear semillas de lino molidas'
    ],
    totalTime: '20 min',
    secret: 'La trinidad cúrcuma + pimienta + aceite es INNEGOCIABLE. Sin pimienta, la curcumina se metaboliza sin absorberse. El aceite la disuelve. La quinoa tibia ayuda a la disolución. Juntos aumentan biodisponibilidad 2-4 veces.',
    proOptimization: { 
      whenToEat: 'Cena o almuerzo', 
      frequency: 'Diario si hay dolor crónico, 3-4x/sem mantenimiento', 
      combinesWith: 'Protocolo Nrf2' 
    },
    smartRotation: 'Esencial para recuperación post-ejercicio intenso o brotes de dolor articular.'
  },
  {
    id: 'methylation_master',
    name: 'Soporte Metilación: Reparadora ADN',
    target: 'Reparación Genómica y Función Cerebral',
    molecularGoalDesc: 'Optimiza el ciclo de un carbono donando grupos metilo para reparación de ADN, síntesis de neurotransmisores y detoxificación de hormonas.',
    scienceQuick: { 
      mechanism: 'Ciclo Metilación (Folato-B12-Colina)', 
      evidence: '⭐⭐⭐⭐⭐ (bioquímica establecida)', 
      timeToEffect: '2-4 semanas' 
    },
    ingredients: [
      { name: 'Espinaca baby', amount: '2 tazas', category: 'base', reason: 'Folato (B9) - donante metilo', power: '58% VD folato' },
      { name: 'Lechuga romana', amount: '1 taza', category: 'base', reason: 'Folato adicional + volumen' },
      { name: 'Huevos duros', amount: '2 unidades', category: 'proteina', reason: 'Colina (yema) - esencial metilación', power: '50% VD colina' },
      { name: 'Remolacha asada', amount: '1 mediana en cubos', category: 'bioactivo', reason: 'Betaína - potencia ciclo', power: 'TMG (trimetilglicina)' },
      { name: 'Semillas de girasol', amount: '2 cdas', category: 'grasa', reason: 'B6 + E + grasas buenas' },
      { name: 'Aguacate', amount: '½ unidad', category: 'grasa', reason: 'Folato + grasas + glutatión' },
      { name: 'AOVE', amount: '2 cdas', category: 'grasa', reason: 'Vehículo lipídico' },
      { name: 'Mostaza Dijon', amount: '1 cda', category: 'aderezo', reason: 'Emulsificante' },
      { name: 'Vinagre balsámico', amount: '2 cdas', category: 'aderezo', reason: 'Ácido + sabor dulce' }
    ],
    preparation: [
      'Asar remolacha: hornear 45-60 min a 200°C. Pelar y cubos.',
      'Cocer huevos: hervir 10 min → agua helada → pelar',
      'Preparar aderezo: mostaza + balsámico + AOVE + sal + pimienta en frasco, agitar',
      'Base: espinaca + romana',
      'Añadir: cubos de remolacha + huevos cortados por mitad',
      'Aguacate en rebanadas + semillas de girasol',
      'Verter aderezo'
    ],
    totalTime: '25 min (o 10 min si remolacha pre-asada)',
    secret: 'La trinidad de la metilación: Folato (espinaca) + Colina (huevo) + Betaína (remolacha). Juntos optimizan el ciclo que repara tu ADN y produce neurotransmisores como serotonina y dopamina.',
    proOptimization: { 
      whenToEat: 'Almuerzo', 
      frequency: '3-4 veces/semana', 
      combinesWith: 'Protocolo Psicobiótico' 
    },
    smartRotation: 'Crítico si tienes niebla mental, depresión, o estás embarazada/planeando estarlo.'
  },
  {
    id: 'sirt_master',
    name: 'Protocolo SIRT: Longevidad',
    target: 'Activación de Sirtuinas y Autofagia',
    molecularGoalDesc: 'Mimetiza los efectos del ayuno intermitente activando las sirtuinas (SIRT1-7) que reparan mitocondrias y reciclan proteínas dañadas.',
    scienceQuick: { 
      mechanism: 'Vía SIRT1-NAD+ → PGC1α', 
      evidence: '⭐⭐⭐⭐ (estudios en mamíferos)', 
      timeToEffect: 'Acumulativo (meses)' 
    },
    ingredients: [
      { name: 'Kale masajeado', amount: '2 tazas', category: 'base', reason: 'Activador SIRT + nutrición densa' },
      { name: 'Perejil fresco picado', amount: '½ taza', category: 'base', reason: 'Apigenina - preserva NAD+', power: 'Cofactor sirtuinas' },
      { name: 'Cebolla morada', amount: '¼ taza picada', category: 'bioactivo', reason: 'Quercetina - activador SIRT1', power: '100-300mg quercetina' },
      { name: 'Alcaparras', amount: '1 cda', category: 'bioactivo', reason: 'Quercetina ultra-concentrada', power: '10x más que cebolla' },
      { name: 'Fresas rebanadas', amount: '½ taza', category: 'bioactivo', reason: 'Fisetina - senolítico natural' },
      { name: 'Nueces', amount: '¼ taza', category: 'grasa', reason: 'Resveratrol + Omega-3' },
      { name: 'AOVE', amount: '3 cdas', category: 'grasa', reason: 'Ácido oleico - activador leve SIRT1' },
      { name: 'Vinagre de vino tinto', amount: '2 cdas', category: 'aderezo', reason: 'Ácido acético + polifenoles' },
      { name: 'Mostaza Dijon', amount: '1 cdta', category: 'aderezo', reason: 'Emulsión' }
    ],
    preparation: [
      'Masajear kale con 1 cdta aceite + sal por 2 minutos',
      'Picar perejil muy fino (libera más apigenina)',
      'Remojar cebolla morada en vinagre 10 min',
      'Preparar aderezo: vinagre (con la cebolla) + mostaza + AOVE + alcaparras machacadas',
      'Base: kale + perejil',
      'Añadir: cebolla escurrida + fresas + nueces',
      'Verter aderezo con alcaparras y mezclar suavemente'
    ],
    totalTime: '12 min',
    secret: 'La apigenina del perejil preserva los niveles de NAD+, el "combustible" que las sirtuinas necesitan para funcionar. La quercetina activa SIRT1 directamente.',
    proOptimization: { 
      whenToEat: 'Almuerzo (ventana de ayuno)', 
      frequency: '2-3 veces/semana', 
      combinesWith: 'Anti-Inflam' 
    },
    smartRotation: 'Ideal en días de ayuno intermitente o restricción calórica.'
  },
  {
    id: 'telomere_master',
    name: 'Protocolo Telomérico: Anti-Aging',
    target: 'Protección de Telómeros',
    molecularGoalDesc: 'Reduce el acortamiento telomérico mediante antioxidantes que neutralizan el estrés oxidativo.',
    scienceQuick: { 
      mechanism: 'Licopeno + Vit C/E → Anti-oxidación', 
      evidence: '⭐⭐⭐⭐ (estudios)', 
      timeToEffect: 'Años' 
    },
    ingredients: [
      { name: 'Espinaca', amount: '2 tazas', category: 'base', reason: 'Folato + luteína' },
      { name: 'Tomates cherry asados', amount: '1 taza', category: 'bioactivo', reason: 'Licopeno concentrado' },
      { name: 'Garbanzos', amount: '1 taza', category: 'proteina', reason: 'Folato + fibra' },
      { name: 'Aceitunas negras', amount: '8 uds', category: 'grasa', reason: 'Vit E + polifenoles' },
      { name: 'Semillas calabaza', amount: '2 cdas', category: 'grasa', reason: 'Zinc + Vit E' },
      { name: 'AOVE', amount: '3 cdas', category: 'grasa', reason: 'Hidroxitirosol + vehículo' },
      { name: 'Limón', amount: '½ unidad', category: 'aderezo', reason: 'Vitamina C' },
      { name: 'Ajo picado', amount: '1 diente', category: 'aderezo', reason: 'Antioxidante' }
    ],
    preparation: [
      'Asar tomates cherry: 15 min a 180°C con AOVE',
      'Preparar aderezo: jugo limón + ajo + AOVE + sal',
      'Mezclar espinaca, tomates tibios, garbanzos, aceitunas y semillas.',
      'Aliñar y servir.'
    ],
    totalTime: '18 min',
    secret: 'El licopeno asado + grasa protege los telómeros directamente. El zinc activa la telomerasa.',
    proOptimization: { 
      whenToEat: 'Cualquier momento', 
      frequency: '2-3 veces/semana', 
      combinesWith: 'SIRT' 
    },
    smartRotation: 'Mantenimiento general anti-envejecimiento.'
  },
  {
    id: 'psychobiotic_master',
    name: 'Protocolo Psicobiótico',
    target: 'Eje Microbiota-Gut-Brain',
    molecularGoalDesc: 'Alimenta bacterias que producen GABA y serotonina (neurotransmisores del bienestar).',
    scienceQuick: { 
      mechanism: 'Prebióticos → SCFA → Nervio Vago', 
      evidence: '⭐⭐⭐⭐ (ensayos clínicos)', 
      timeToEffect: '2-4 semanas' 
    },
    ingredients: [
      { name: 'Espinaca', amount: '2 tazas', category: 'base', reason: 'Folato + magnesio' },
      { name: 'Espárragos vapor', amount: '6 tallos', category: 'bioactivo', reason: 'Inulina (prebiótico)' },
      { name: 'Chucrut crudo', amount: '½ taza', category: 'bioactivo', reason: 'Lactobacilos (probiótico)' },
      { name: 'Garbanzos', amount: '¾ taza', category: 'proteina', reason: 'Triptófano' },
      { name: 'Nueces', amount: '4 uds', category: 'grasa', reason: 'Omega-3' },
      { name: 'Miso blanco', amount: '1 cdta', category: 'aderezo', reason: 'Probiótico' },
      { name: 'Jengibre rallado', amount: '½ cdta', category: 'aderezo', reason: 'Motilidad' }
    ],
    preparation: [
      'Cocinar espárragos al vapor 3 min.',
      'Preparar aderezo: miso + jengibre + vinagre + AOVE + agua.',
      'Mezclar base con ingredientes. Añadir chucrut al final (proteger bacterias).',
      'Servir frío.'
    ],
    totalTime: '12 min',
    secret: 'Prebióticos (espárragos) + Probióticos (chucrut/miso) = Medicina psiquiátrica comestible via nervio vago.',
    proOptimization: { 
      whenToEat: 'Cena', 
      frequency: 'Diario si hay ansiedad', 
      combinesWith: 'Metilación' 
    },
    smartRotation: 'Crítico para el ánimo y tras tomar antibióticos.'
  }
];

export const TROUBLESHOOTING: TroubleshootingItem[] = [
  {
    issue: "El kale me da gases",
    diagnosis: [
      "Sensibilidad a rafinosa",
      "Fibra cruda rígida",
      "Microbioma no adaptado"
    ],
    solutions: [
      {
        title: "Escaldar + Masajear",
        steps: [
          "Sumerge kale 30-60 seg en agua hirviendo",
          "Shock térmico en agua helada",
          "Escurre y LUEGO masajea con aceite y sal"
        ],
        impact: "Rompe fibras (más digerible) y reduce rafinosa de inmediato."
      },
      {
        title: "Aumentar Gradualmente",
        steps: [
          "Semana 1: ¼ taza kale + otras hojas suaves",
          "Semana 2: ½ taza kale",
          "Semana 3+: Aumentar poco a poco"
        ],
        impact: "Permite que tu microbioma se adapte en 2-3 semanas."
      }
    ]
  },
  {
    issue: "No veo resultados en 1 semana",
    diagnosis: [
      "Pimienta no recién molida",
      "Falta de grasa (sin absorción)",
      "Expectativas temporales incorrectas"
    ],
    solutions: [
      {
        title: "Verificar Sinergias",
        steps: [
          "¿Pimienta molida al momento con cúrcuma?",
          "¿Mínimo 1 cda AOVE?",
          "¿Polvo mostaza con brócoli?"
        ],
        impact: "Sin estas sinergias pierdes 50-80% del beneficio."
      }
    ]
  },
  {
    issue: "La ensalada me sabe amarga",
    diagnosis: [
      "Sensibilidad genética a glucosinolatos",
      "Falta de balance de sabores"
    ],
    solutions: [
      {
        title: "Balancear Sabores",
        steps: [
          "Añadir 1 cdta miel al aderezo",
          "Incluir frutas dulces (fresas, arándanos)",
          "Aumentar grasas (bloquean receptores de amargo)"
        ],
        impact: "Neutraliza el amargor sin perder beneficios."
      }
    ]
  }
];
