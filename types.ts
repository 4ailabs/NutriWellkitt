
export enum AppMode {
  ELEGIR_PROTOCOLO = 1,
  BANCO_RECETAS = 2,
  VERIFICADOR_SINERGIAS = 3,
  BIBLIOTECA = 4,
  TECNICAS = 5,
  LISTA_COMPRAS = 6,
  TROUBLESHOOTING = 7,
  DASHBOARD = 0
}

export interface MolecularMechanism {
  id: string;
  name: string;
  simpleDesc: string;
  analogy: string;
  whyItMatters: string[];
  keyNutrients: { name: string; examples: string }[];
  blockers: string[];
  scientificEvidence: string;
}

export interface Synergy {
  id: string;
  title: string;
  rule: string;
  evidenceLevel: number;
  science: string;
  howToApply: string[];
  commonMistakes: string[];
  alternatives: string[];
}

export interface Technique {
  id: string;
  name: string;
  duration: string;
  evidenceLevel: number;
  why: string;
  steps: string[];
  videoTip?: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  reason: string;
  power?: string;
  category: 'base' | 'crucifera' | 'proteina' | 'grasa' | 'bioactivo' | 'aderezo';
}

export interface Recipe {
  id: string;
  name: string;
  target: string;
  molecularGoalDesc: string;
  scienceQuick: {
    mechanism: string;
    evidence: string;
    timeToEffect: string;
  };
  ingredients: Ingredient[];
  preparation: string[];
  totalTime: string;
  secret: string;
  proOptimization: {
    whenToEat: string;
    frequency: string;
    combinesWith: string;
  };
  smartRotation: string;
}

export interface TroubleshootingItem {
  issue: string;
  diagnosis: string[];
  solutions: { title: string; steps: string[]; impact: string }[];
}
