
export enum AppMode {
  CREATE_SALAD = 1,
  GENOMIC_DESIGN = 2,
  CHECK_SYNERGY = 3,
  LEARN_TECHNIQUES = 4,
  LEARN_NUTRIGENOMICS = 5,
  SHOPPING_LIST = 6,
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
  evidenceLevel: number; // 1-5 stars
  science: string;
  howToApply: string[];
  commonMistakes: string[];
  alternatives: string[];
}

export interface Ingredient {
  name: string;
  amount: string;
  reason: string;
  power?: string;
}

export interface Recipe {
  name: string;
  target: string;
  molecularGoalDesc: string;
  scienceQuick: {
    mechanism: string;
    evidence: string;
    timeToEffect: string;
  };
  ingredients: {
    base: Ingredient[];
    bioactives: Ingredient[];
    protein: Ingredient[];
    fat: Ingredient[];
    dressing: Ingredient[];
  };
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
