
import { MolecularMechanism, Synergy } from './types';

export const MECHANISMS: MolecularMechanism[] = [
  {
    id: 'methylation',
    name: 'Metilación de ADN',
    simpleDesc: 'Un interruptor que decide qué genes se encienden o apagan.',
    analogy: 'Tu ADN es una biblioteca; la metilación son las notas adhesivas que marcan qué libros leer.',
    whyItMatters: [
      'Estabilidad del genoma',
      'Prevención de cáncer',
      'Función cerebral óptima',
      'Regulación del ánimo'
    ],
    keyNutrients: [
      { name: 'Folato (B9)', examples: 'Espinaca, kale' },
      { name: 'Colina', examples: 'Huevos (yema)' },
      { name: 'Betaína', examples: 'Remolacha' }
    ],
    blockers: ['Deficiencia de B12/folato', 'Alcohol excesivo', 'Estrés crónico'],
    scientificEvidence: 'Ciclo de un carbono. Homocisteína baja = metilación alta.'
  },
  {
    id: 'nrf2',
    name: 'Detoxificación (Nrf2)',
    simpleDesc: 'Encender tu sistema natural de limpieza celular.',
    analogy: 'Es como activar un ejército interno de antioxidantes para limpiar toxinas.',
    whyItMatters: [
      'Limpieza hepática',
      'Protección contra contaminación',
      'Resistencia al estrés oxidativo'
    ],
    keyNutrients: [
      { name: 'Sulforafano', examples: 'Brócoli, rábanos' },
      { name: 'EGCG', examples: 'Té verde' },
      { name: 'Resveratrol', examples: 'Uvas, bayas' }
    ],
    blockers: ['Altas dosis de fructosa', 'Sedentarismo', 'Inflamación sistémica'],
    scientificEvidence: 'Vía Keap1-Nrf2-ARE. El sulforafano es el activador más potente conocido.'
  },
  {
    id: 'nfkappab',
    name: 'Control Inflamatorio (NF-κB)',
    simpleDesc: 'El "director de orquesta" de la inflamación crónica.',
    analogy: 'Es el detector de incendios de la célula. Si está muy sensible, hay fuego constante (dolor).',
    whyItMatters: [
      'Reducción de dolor articular',
      'Salud cardiovascular',
      'Neuroprotección'
    ],
    keyNutrients: [
      { name: 'Curcumina', examples: 'Cúrcuma' },
      { name: 'Antocianinas', examples: 'Col morada, arándanos' },
      { name: 'Omega-3', examples: 'Pescado, chía' }
    ],
    blockers: ['Grasas trans', 'Azúcar refinada', 'Falta de sueño'],
    scientificEvidence: 'Inhibición de la cascada de citoquinas pro-inflamatorias.'
  }
];

export const SYNERGIES: Synergy[] = [
  {
    id: 'mustard_hack',
    title: 'Hack de la Mostaza',
    rule: 'Brócoli cocido + Mostaza cruda = Sulforafano 4-5x',
    evidenceLevel: 5,
    science: 'Cocinar inactiva la mirosinasa. La mostaza aporta mirosinasa activa para crear sulforafano.',
    howToApply: [
      'Cocina brócoli 3-4 min al vapor',
      'Aderezo: 1 cdta polvo mostaza por 200g brócoli'
    ],
    commonMistakes: ['Usar mostaza Dijon procesada (poca enzima)', 'Añadir mostaza al brócoli hirviendo'],
    alternatives: ['Rábanos crudos', 'Rúcula fresca']
  },
  {
    id: 'turmeric_trinity',
    title: 'Trinidad de la Cúrcuma',
    rule: 'Cúrcuma + Pimienta + Grasa = Absorción Mejorada',
    evidenceLevel: 3,
    science: 'La piperina inhibe la glucuronidación hepática de la curcumina.',
    howToApply: [
      'Mezclar cúrcuma con pimienta negra recién molida',
      'Consumir con aceite de oliva o aguacate'
    ],
    commonMistakes: ['Usar pimienta vieja de salero', 'No usar grasa'],
    alternatives: ['Suplementos liposomales', 'Extracto de jengibre']
  }
];
