
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Generates a custom nutrigenomic recipe based on a goal and concerns
export const generateProtocolRecipe = async (targetGoal: string, userConcerns: string): Promise<Recipe> => {
  const prompt = `Eres un experto en nutrigenómica con 20 años de experiencia integrando medicina funcional y ciencia culinaria.

OBJETIVO MOLECULAR: ${targetGoal}
PREOCUPACIÓN DEL USUARIO: ${userConcerns}

INSTRUCCIONES CRÍTICAS:

1. ARQUITECTURA DE 5 COMPONENTES (INNEGOCIABLE):
   - Base: 2-3 tazas hojas verdes (kale, rúcula, espinaca)
   - Proteína: 1 porción ~100g (huevos, legumbres, quinoa, pescado)
   - Grasa: 1-2 cdas (aguacate, AOVE, nueces) - CRÍTICO para carotenoides
   - Bioactivos: ½-1 taza elementos de alta densidad fitoquímica específicos para el objetivo
   - Aderezo: AQUÍ VAN LAS SINERGIAS CLAVE

2. SINERGIAS CIENTÍFICAS VALIDADAS (Usar al menos 1):
   ${targetGoal.includes('Nrf2') ? '- HACK MOSTAZA: Brócoli cocido + 1 cdta polvo semilla mostaza = 4-5x sulforafano (Okunade 2018)' : ''}
   ${targetGoal.includes('NF-κB') ? '- TRINIDAD CÚRCUMA: Cúrcuma + pimienta negra recién molida + AOVE = 2-4x absorción (Shoba 1998)' : ''}
   - GRASA + CAROTENOIDES: Tomate/zanahoria SIEMPRE con aceite = 4-15x absorción (Unlu 2005)
   ${targetGoal.includes('Metilación') ? '- TRINIDAD METILACIÓN: Espinaca (folato) + Huevo (colina) + Remolacha (betaína)' : ''}
   
3. CANTIDADES EXACTAS:
   - Ejemplo: "2 tazas kale", "1 cucharada colmada", "150g garbanzos"

4. PREPARACIÓN:
   - Máximo 5 pasos. Incluir tiempos exactos.
   - Destacar el momento de la sinergia crítica.

5. EL SECRETO:
   - Explicar LA sinergia más importante y citar el estudio.

6. EVITA ingredientes raros o inaccesibles.

Genera la respuesta estrictamente en JSON. El campo ingredients debe ser un array de objetos, cada uno con name, amount, reason, category (uno de: base, crucifera, proteina, grasa, bioactivo, aderezo) y opcionalmente power.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          target: { type: Type.STRING },
          molecularGoalDesc: { type: Type.STRING },
          scienceQuick: {
            type: Type.OBJECT,
            properties: {
              mechanism: { type: Type.STRING },
              evidence: { type: Type.STRING },
              timeToEffect: { type: Type.STRING }
            },
            propertyOrdering: ["mechanism", "evidence", "timeToEffect"]
          },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                amount: { type: Type.STRING },
                reason: { type: Type.STRING },
                power: { type: Type.STRING },
                category: { type: Type.STRING, description: "One of: base, crucifera, proteina, grasa, bioactivo, aderezo" }
              },
              propertyOrdering: ["name", "amount", "reason", "category", "power"]
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
            },
            propertyOrdering: ["whenToEat", "frequency", "combinesWith"]
          },
          smartRotation: { type: Type.STRING }
        }
      }
    }
  });

  const parsed = JSON.parse(response.text);
  if (!parsed.id) parsed.id = Math.random().toString(36).substr(2, 9);
  return parsed;
};

// Provides interactive chat for salad customization
export const chatWithAI = async (history: { role: 'user' | 'model', parts: { text: string }[] }[]): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: history,
    config: {
        systemInstruction: `Eres un nutricionista experto en nutrigenómica ayudando a crear una ensalada personalizada.
        - Si el usuario no ha dado objetivo, pregunta: "¿Qué quieres lograr? (energía, detox, anti-inflamación, etc.)"
        - Si no ha listado ingredientes, pregunta: "¿Qué tienes en tu refrigerador?"
        - Una vez tengas ambos, genera la receta con la estructura de 5 componentes (Base, Proteína, Grasa, Bioactivos, Aderezo).
        - Si faltan ingredientes críticos para sinergias, ALERTA al usuario.
        - Sé amigable, educativo y conciso.`
    }
  });
  return response.text;
}

// Analyzes provided ingredients for nutrigenomic synergies
export const checkSynergyWithAI = async (ingredients: string[]): Promise<string> => {
    const prompt = `Analiza estos ingredientes para una ensalada nutrigenómica: ${ingredients.join(', ')}. 
    Identifica sinergias positivas (ej. brócoli+mostaza) o componentes faltantes según la regla de los 5 componentes. 
    Responde en formato Markdown conciso con emojis.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
    });
    return response.text;
}
