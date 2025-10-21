import './App.css';
import Nav from './components/Nav.jsx';
import NoteBox from './components/NoteBox.jsx';

function App() {
  return (
    <>
    {/* Nav */}
     <Nav />
     {/* Notes */}
     <div className="px-8 py-4 grid grid-cols-4 gap-4"> 
     <NoteBox />
     <NoteBox />
     <NoteBox />
     <NoteBox />
     <NoteBox />
     <NoteBox />
     <NoteBox />
     </div>
    </>
  )
}

export default App
