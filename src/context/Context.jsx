//Context.jsx
import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState(""); // Current prompt text
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async (prompt) => {
        const finalPrompt = prompt ?? input;
        if (!finalPrompt.trim()) return;

        try {
            setShowResult(true);
            setLoading(true);
            setRecentPrompt(finalPrompt);
            setPrevPrompts((prev) => [finalPrompt, ...prev]);

            const response = await runChat(finalPrompt);
            setResultData(response);
            setInput("");
        } catch (error) {
            console.error("Error sending prompt:", error);
            setResultData("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const contextValue = {
        input,
        setInput,
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setShowResult,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
