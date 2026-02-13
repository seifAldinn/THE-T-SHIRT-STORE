
import { GoogleGenAI } from "@google/genai";
import { inventoryService } from "./inventoryService";

// Initialize the Google GenAI client using the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStylingAdvice = async (userPrompt: string, history: {role: string, text: string}[]) => {
  // Use the recommended model for basic text tasks.
  const model = 'gemini-3-flash-preview';
  const products = inventoryService.getProducts();
  
  const systemInstruction = `
    You are a professional fashion stylist for "The T-Shirt Store". 
    Our current real-time inventory includes:
    ${products.map(p => `- ${p.name} ($${p.price}, Colors: ${p.colors.map(c => c.name).join(', ')}, Stock: ${p.stock})`).join('\n')}
    
    Rules:
    1. Be concise, stylish, and helpful.
    2. Recommend specific items and mention their available COLORS.
    3. If an item has low stock (under 5), create a sense of fashionable urgency.
    4. Suggest outfit pairings (e.g., "The Ocean Blue tee in Sky matches perfectly with white linen trousers").
    5. Maintain a high-end, minimalist tone.
  `;

  try {
    // Call generateContent with model name and contents.
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Use the .text property to extract the response.
    return response.text || "I'm sorry, I couldn't process that styling request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The stylist is currently busy. Please try again later!";
  }
};
