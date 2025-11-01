import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav.jsx";
import NoteBox from "./components/NoteBox.jsx";
import { GoogleGenAI } from "@google/genai";

function App() {
  const [notes, setNotes] = useState(() => {
    const saveNotes = localStorage.getItem("notes");
    return saveNotes ? JSON.parse(saveNotes) : [];
  });

  // Storage All the Notes in LocalStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Date Function
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Add notes function when the plus button is clicked
  const addNotes = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      onCreate: today,
    };
    setNotes([...notes, newNote]);
  };

  // For Updating Notes Function
  const lastNotes = (id, field, value) => {
    setNotes((preNotes) =>
      preNotes.map((note) =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  // Delete Notes Function
  const deleteNote = (id) => {
    setNotes([...notes].filter((note) => note.id !== id));
  };

  //Ai Function
  async function generateAIContent(id, option) {
    // Get API Key from .env file
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error(
        "API Key is missing! Make sure .env file is in the root directory and server is restarted."
      );
    }

    try {
      const note = [...notes].find((note) => note.id === id);
      if (!note) {
        return;
      }

      // Create the prompt based on the selected option
      let prompt = "";
      if (option === "summarize") {
        prompt = `Summarize the following note into a few clear bullet points highlighting the main ideas:\n\n"${note.content}"`;
      } else if (option === "improve") {
        prompt = `improve the following note content, adding more details and depth:\n\n"${note.content}"`;
      } else {
        prompt = `Provide a helpful response based on the following note:\n\n"${note.content}"`;
      }

      // Ai Call
      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });

      // Get the AI-generated text and return it
      const aiText = response.text || "No content generated";
      return aiText;
    } catch (error) {
      console.error("Error generating AI content:", error);
      throw error;
    }
  }
  return (
    <>
      {/* Nav */}
      <Nav onClick={addNotes} />
      {/* Notes - responsive grid: 1 column on xs, 2 on sm, 3 on md, 4 on lg+ */}
      <div className="px-4 py-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...notes].reverse().map((note) => (
          <NoteBox
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onChange={lastNotes}
            onCreate={note.onCreate}
            onDelete={deleteNote}
            onAi={generateAIContent}
          />
        ))}
      </div>
    </>
  );
}

export default App;
