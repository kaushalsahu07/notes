import {
  IconTrashX,
  IconCalendarEvent,
  IconBrandBilibili,
  IconChevronDown,
} from "@tabler/icons-react";
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
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiContent, setAiContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiOption, setAiOption] = useState("");
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

  const handleAiOption = async (option) => {
    setIsOpen(false);
    setShowAiModal(true);
    setIsLoading(true);
    setAiOption(option);
    setAiContent("");

    try {
      // Call the AI function and wait for response
      const result = await onAi(id, option, content);
      setAiContent(result || "No content generated");
    } catch (error) {
      setAiContent("Error generating content. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowAiModal(false);
    setAiContent("");
    setAiOption("");
  };

  const applyAiContent = () => {
    onChange(id, "content", aiContent);
    closeModal();
  };

  return (
    <>
      <div className="w-4xs h-80 bg-white border-gray-200  border-2 rounded-lg shadow-md hover:shadow-lg hover:border-blue-500 transition-shadow duration-300">
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
            className="ml-2 mt-2 w-[95%] resize-none h-42 overflow-y-auto outline-none focus:outline-none placeholder:text-gray-300"
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

      {/* AI Modal Overlay */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-[90%] max-w-2xl max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                AI {aiOption === "summarize" ? "Summary" : "Improved Writing"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-600">Generating content...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Original Note:
                    </h3>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded border border-gray-200">
                      {content || "No content"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                      AI Generated:
                    </h3>
                    <p className="text-gray-800 bg-blue-50 p-4 rounded border border-blue-200 whitespace-pre-wrap">
                      {aiContent}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={applyAiContent}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Apply to Note
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
