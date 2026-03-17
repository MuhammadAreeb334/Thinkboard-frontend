import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FireAPI } from "../hooks/useRequest";

const CreateNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const payload = {
    title: title,
    content: content,
  };

  // console.log("Payload:", { title, content });
  const handleCreate = async () => {
    try {
      const data = await FireAPI("create", "POST", payload);
      console.log("Note Created:", data);
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Notes
        </button>

        <div className="bg-[#161414] rounded-3xl p-8 md:p-10 shadow-2xl border border-white/5">
          <h2 className="text-2xl font-bold mb-8 text-white">
            Create New Note
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2 ml-1">
                Title
              </label>
              <input
                name="title"
                type="text"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#4ade80] transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2 ml-1">
                Content
              </label>
              <textarea
                name="content"
                rows="8"
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#4ade80] transition-all resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCreate()}
                className="bg-[#22c55e] text-black font-bold py-3.5 px-10 rounded-full hover:bg-[#16a34a] transition-all active:scale-95"
              >
                Create Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
