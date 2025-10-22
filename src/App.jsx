import './App.css';
import Nav from './components/Nav.jsx';
import NoteBox from './components/NoteBox.jsx';

function App() {
  return (
    <>
    {/* Nav */}
     <Nav />
  {/* Notes - responsive grid: 1 column on xs, 2 on sm, 3 on md, 4 on lg+ */}
  <div className="px-4 py-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
     <NoteBox />
     </div>
    </>
  )
}

export default App
