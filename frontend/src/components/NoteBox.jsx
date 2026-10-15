import {
  IconTrashX,
  IconCalendarEvent,
  IconBrandBilibili,
  IconChevronDown,
  IconX,
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
  const [isExpanded, setIsExpanded] = useState(false);
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

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isExpanded]);

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
      <div
        onClick={() => setIsExpanded(true)}
        className={`bg-white border-gray-200 border-2 shadow-md transform-gpu transition-all duration-300 ease-in-out ${
          isExpanded
            ? "fixed inset-0 z-40 flex h-dvh w-full flex-col overflow-hidden rounded-none"
            : "w-4xs h-80 rounded-lg hover:scale-105 hover:shadow-lg hover:border-blue-500"
        }`}
      >
        <div
          className={
            isExpanded
              ? "flex min-h-0 flex-1 flex-col p-5 sm:p-8 md:p-12"
              : "p-5"
          }
        >
          {isExpanded && (
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsExpanded(false);
                }}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close note"
              >
                <IconX stroke={2} className="w-6 h-6" />
              </button>
            </div>
          )}
          <input
            value={title}
            onFocus={() => setIsExpanded(true)}
            onClick={(event) => event.stopPropagation()}
            onChange={(e) => onChange(id, "title", e.target.value)}
            placeholder="Untitled"
            className={`w-full overflow-hidden font-bold text-[20px] outline-none focus:outline-none placeholder:text-gray-300 ${
              isExpanded ? "h-12 text-2xl sm:text-3xl" : "h-9"
            }`}
          />
          <textarea
            value={content}
            onFocus={() => setIsExpanded(true)}
            onClick={(event) => event.stopPropagation()}
            onChange={(e) => onChange(id, "content", e.target.value)}
            placeholder="Start typing your note..."
            className={`mt-2 w-full resize-none overflow-y-auto outline-none focus:outline-none placeholder:text-gray-300 ${
              isExpanded ? "min-h-0 flex-1 text-lg" : "h-42"
            }`}
          />
        </div>
        {/* Date, delete */}
        <div
          onClick={(event) => event.stopPropagation()}
          className={`flex justify-between items-center px-5 pt-3 ${
            isExpanded ? "sm:px-8 md:px-12 pb-5" : ""
          }`}
        >
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
                <div className="absolute bottom-full right-0 mb-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg z-10">
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
