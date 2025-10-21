import { IconPlus } from '@tabler/icons-react';
import "../../App.css";

export default function Button({ children, onClick }) {
  return (
    <button
      className="bg-blue-500 flex items-center text-white px-5 py-2 rounded hover:bg-blue-600"
      onClick={onClick}
    >
     <IconPlus className="w-5 h-5 mr-1.5" stroke={2} /> {children}
    </button>
  );
}