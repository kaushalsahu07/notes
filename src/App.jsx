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
  const lastNotes = (id, flied, value) => {
    setNotes((preNotes) =>
      preNotes.map((note) =>
        note.id === id ? { ...note, [flied]: value } : note
      )
    );
  };

  // Delete Notes Funtion
  const deleteNote = (id) => {
    setNotes([...notes].filter((note) => note.id !== id));
  };

  //Ai
  async function generateAIContent(id, option) {
    // Get API Key from .env file
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error(
        "API Key is missing! Make sure .env file is in the root directory and server is restarted."
      );
    }

    try {
      const note = notes.find((note) => note.id === id);
      if (!note) {
        return;
      }

      // Create the prompt based on the selected option
      let prompt = "";
      if (option === "summary") {
        prompt = `Summarize the following note content in a concise manner:\n\n${note.content}`;
      } else if (option === "expand") {
        prompt = `Expand upon the following note content, adding more details and depth:\n\n${note.content}`;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      // Update the note with AI response
      lastNotes(id, "content", response.text);
    } catch (error) {
      console.error("Error generating AI content:", error);
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
