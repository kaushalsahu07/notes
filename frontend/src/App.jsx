import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav.jsx";
import NoteBox from "./components/NoteBox.jsx";
import { GoogleGenAI } from "@google/genai";
import { getToday } from "./utils/date.js";

function App() {
  const [notes, setNotes] = useState(() => {
    const saveNotes = localStorage.getItem("notes");
    return saveNotes ? JSON.parse(saveNotes) : [];
  });

  // Storage All the Notes in LocalStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add notes function when the plus button is clicked
  const addNotes = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      onCreate: getToday(),
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
  async function generateAIContent(id, option, content) {
    try {
      const note = [...notes].find((note) => note.id === id);
      if (!note) {
        throw new Error("Note not found");
      }

      const response = await fetch(`${import.meta.env.VITE_CLIENT_ORIGIN}/app`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ option, content }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to generate AI content");
      }

      return result.data.text;
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
