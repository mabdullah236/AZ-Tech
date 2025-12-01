import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from '../constants';

let chatSession: Chat | null = null;

const formatProductContext = () => {
  return PRODUCTS.map(p =>
    `- ${p.name} ($${p.price}): ${p.description} [Features: ${p.features.join(', ')}]`
  ).join('\n');
};

const SYSTEM_INSTRUCTION = `
You are the expert AI sales associate for AZ Tech, a premium electronics store.
Your goal is to help customers find the right tech products, explain features, and assist with their shopping experience.

Our Current Inventory:
${formatProductContext()}

Guidelines:
1. Be concise, professional, and enthusiastic about technology.
2. If a user asks about a specific product type (e.g., laptops), recommend specific models from our inventory.
3. Highlight key features to justify the price.
4. Keep responses short (under 3 sentences unless detailed comparison is asked).
5. Do not make up products not in the inventory.
6. If asked about shipping or returns, say we offer free 2-day shipping and 30-day returns.
`;

export const getChatResponse = async (userMessage: string): Promise<string> => {
  try {
    if (!import.meta.env.VITE_API_KEY) {
      return "I'm currently offline (API Key missing). Please check back later!";
    }

    if (!chatSession) {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingBudget: 0 } // Disable thinking for fast chat response
        }
      });
    }

    const response: GenerateContentResponse = await chatSession.sendMessage({
      message: userMessage
    });

    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again.";
  }
};