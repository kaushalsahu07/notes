import { IconPlus } from "@tabler/icons-react";
import "../App.css";

export default function Nav({onClick}) {
  return (
    <>
      <nav className="flex justify-between align-center p-8 mb-8 border-b-2 border-gray-200">
        <h1 className="font-bold text-2xl">My Notes</h1>
        <button
          className="bg-blue-500 flex items-center text-white px-5 py-2 rounded hover:bg-blue-600"
          onClick={onClick}
        >
          <IconPlus className="w-5 h-5 mr-1.5" stroke={2} /> New Note
        </button>
      </nav>
    </>
  );
}
