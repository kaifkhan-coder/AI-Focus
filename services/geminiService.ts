import { GoogleGenAI, Type } from '@google/genai';
import { KeyConcept, QuestionAnswer } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateSummary(text: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  const prompt = `Summarize the following text for a college student, focusing on the main arguments, evidence, and conclusions. Present it in a clear, concise, and easy-to-digest format. Use paragraphs and bullet points if helpful.\n\nText:\n"""\n${text}\n"""`;
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
}

export async function extractKeyConcepts(text: string): Promise<KeyConcept[]> {
  const model = 'gemini-2.5-pro';
  const prompt = `Extract the key concepts from the following text. For each concept, provide a concise definition or explanation. The text is:\n\n"""\n${text}\n"""`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            concept: {
              type: Type.STRING,
              description: 'The name of the key concept or term.',
            },
            explanation: {
              type: Type.STRING,
              description: 'A concise explanation of the concept.',
            },
          },
          required: ['concept', 'explanation'],
        },
      },
    },
  });

  const jsonString = response.text.trim();
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON for key concepts:", jsonString);
    throw new Error("The AI returned an invalid format for key concepts.");
  }
}

export async function generateQA(text: string): Promise<QuestionAnswer[]> {
  const model = 'gemini-2.5-pro';
  const prompt = `Generate a list of 5-10 questions and answers based on the following text that could be used for a study guide. The questions should cover the most important information, definitions, and relationships in the text. The text is:\n\n"""\n${text}\n"""`;
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: {
              type: Type.STRING,
              description: 'A question derived from the text.',
            },
            answer: {
              type: Type.STRING,
              description: 'The answer to the corresponding question, based on the text.',
            },
          },
          required: ['question', 'answer'],
        },
      },
    },
  });

  const jsonString = response.text.trim();
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON for Q&A:", jsonString);
    throw new Error("The AI returned an invalid format for Q&A.");
  }
}
