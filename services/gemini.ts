
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

// Always use named parameters and avoid fallback empty strings for API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProtocolRecipe = async (targetGoal: string, userConcerns: string): Promise<Recipe> => {
  const prompt = `Genera un protocolo de ensalada nutrigenómica para el objetivo: "${targetGoal}". 
  Considera estas preocupaciones del usuario: "${userConcerns}".
  Sigue estrictamente la arquitectura de 5 componentes: Base, Proteína, Grasa, Bioactivos, Aderezo.
  Incluye una sinergia científica crítica.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          target: { type: Type.STRING },
          molecularGoalDesc: { type: Type.STRING },
          scienceQuick: {
            type: Type.OBJECT,
            properties: {
              mechanism: { type: Type.STRING },
              evidence: { type: Type.STRING },
              timeToEffect: { type: Type.STRING }
            }
          },
          ingredients: {
            type: Type.OBJECT,
            properties: {
              base: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, amount: { type: Type.STRING }, reason: { type: Type.STRING } } } },
              bioactives: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, amount: { type: Type.STRING }, power: { type: Type.STRING } } } },
              protein: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, amount: { type: Type.STRING } } } },
              fat: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, amount: { type: Type.STRING } } } },
              dressing: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, amount: { type: Type.STRING }, reason: { type: Type.STRING } } } }
            }
          },
          preparation: { type: Type.ARRAY, items: { type: Type.STRING } },
          totalTime: { type: Type.STRING },
          secret: { type: Type.STRING },
          proOptimization: {
            type: Type.OBJECT,
            properties: {
              whenToEat: { type: Type.STRING },
              frequency: { type: Type.STRING },
              combinesWith: { type: Type.STRING }
            }
          },
          smartRotation: { type: Type.STRING }
        }
      }
    }
  });

  // response.text is a property, not a method
  return JSON.parse(response.text);
};

export const checkSynergyWithAI = async (ingredients: string[]): Promise<string> => {
    const prompt = `Analiza estos ingredientes para una ensalada nutrigenómica: ${ingredients.join(', ')}. 
    Identifica sinergias positivas (ej. brócoli+mostaza) o componentes faltantes según la regla de los 5 componentes. 
    Responde en formato Markdown conciso con emojis.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
    });
    // response.text is a property, not a method
    return response.text;
}
