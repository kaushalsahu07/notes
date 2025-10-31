import { IconTrashX, IconCalendarEvent, IconBrandBilibili, IconChevronDown } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import "../App.css";

export default function NoteBox({
  id,
  title,
  content,
  onChange,
  onCreate,
  onDelete,
  onAi,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAiOption = (option) => {
    onAi(id, option);
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-4xs h-69 bg-white border-gray-200  border-2 rounded-lg shadow-md hover:shadow-lg hover:border-blue-500 transition-shadow duration-300">
        <div className="p-5">
          <input
            value={title}
            onChange={(e) => onChange(id, "title", e.target.value)}
            placeholder="Untitled"
            className="w-[95%] h-9 overflow-hidden font-bold text-[20px] outline-none focus:outline-none placeholder:text-gray-300"
          />
          <textarea
            value={content}
            onChange={(e) => onChange(id, "content", e.target.value)}
            placeholder="Start typing your note..."
            className="ml-2 mt-2 w-[95%] resize-none h-32 overflow-y-auto outline-none focus:outline-none placeholder:text-gray-300"
          />
        </div>
        {/* Date, delete */}
        <div className="flex justify-between items-center px-5 pt-3">
          <p className="text-sm flex items-center gap-1 font-bold text-gray-500">
            <IconCalendarEvent stroke={2} className="w-5 text-blue-500" />
            {onCreate}
          </p>
          <div className="flex items-center">
            <button
              onClick={() => onDelete(id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              <IconTrashX stroke={2} className="w-5" />
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-3 text-green-500 hover:text-green-700 text-sm flex items-center"
              >
                <IconBrandBilibili stroke={2} />
                <IconChevronDown stroke={2} className="w-4 h-4" />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => handleAiOption("summarize")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Summarize
                    </button>
                    <button
                      onClick={() => handleAiOption("improve")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Improve Writing
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
