import Button from "./ui/Button";
import "../App.css";

export default function Nav() {
  return (
    <>
      <nav className="flex justify-between align-center p-8 mb-8 border-b-2 border-gray-200">
        <h1 className="font-bold text-2xl">My Notes</h1>
        <Button onClick={() => alert("Button clicked!")}>New Note</Button>
      </nav>
    </>
  );
}
