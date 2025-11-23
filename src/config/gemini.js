//gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

async function runChat(prompt) {
    try {
        if (!apiKey) {
            throw new Error("API Key is missing!");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();

    } catch (error) {
        console.error("Error:", error);
        return `Error: ${error.message}`;
    }
}

export default runChat;