import { IconTrashX, IconCalendarEvent, IconRobot } from "@tabler/icons-react";
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
          <div>
            <button
              onClick={() => onDelete(id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              <IconTrashX stroke={2} className="w-5" />
            </button>
            {/* AI */}
            <button
              onClick={() => onAi(id)}
              className="ml-3 text-green-500 hover:text-green-700 text-sm"
            >
              <IconRobot stroke={2} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
