import { useState } from "react";
import "./App.css";
import Nav from "./components/Nav.jsx";
import NoteBox from "./components/NoteBox.jsx";

function App() {
  const [notes, setNotes] = useState([]);

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const addNotes = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      onCreate: today,
    };
    setNotes([...notes, newNote]);
  };

  const lastNotes = (id, flied, value) => {
    setNotes((preNotes) =>
      preNotes.map((note) =>
        note.id === id ? { ...note, [flied]: value } : note
      )
    );
  };

 const deleteNote = (id) => {
    setNotes([...notes].filter(note => note.id !== id));
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
          />
        ))}
      </div>
    </>
  );
}

export default App;
