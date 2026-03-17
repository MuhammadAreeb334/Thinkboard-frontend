import React from "react";
import { useNavigate } from "react-router";
import { FireAPI } from "../hooks/useRequest";

const NoteCard = ({ _id, title, content, createdAt, updatedAt, onDelete }) => {
  const navigate = useNavigate();

  const created = new Date(createdAt);
  const updated = new Date(updatedAt);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await FireAPI(`${_id}`, "DELETE");
        // console.log("Note deleted:", _id);
        if (onDelete) onDelete(_id);
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  return (
    <div className="bg-[#1e1a1a] border-t-4 border-[#4ade80] rounded-xl p-5 flex flex-col justify-between min-h-[160px] shadow-lg">
      <div>
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500 text-xs">
          {created.toLocaleDateString()}
        </span>
        <span className="text-gray-500 text-xs">
          {updated.toLocaleDateString()}
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/note/${_id}`)}
            className="text-gray-400 cursor-pointer hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={() => handleDelete()}
            className="text-red-800 cursor-pointer hover:text-red-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
