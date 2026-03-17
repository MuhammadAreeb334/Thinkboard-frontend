import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { FireAPI } from "../hooks/useRequest";

const NoteDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSingleNote = async () => {
      try {
        const data = await FireAPI(`${id}`, "GET");
        setNote({ title: data.title, content: data.content });
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleNote();
  }, [id]);

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = await FireAPI(`${id}`, "PUT", note);
      // console.log("Note updated:", data);
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await FireAPI(`${id}`, "DELETE");
      // console.log("Deleted Note ID:", id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
    navigate("/");
  };

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
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

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-5 py-2 border border-red-900/30 text-red-500 rounded-full hover:bg-red-950/20 transition-all text-sm font-medium"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete Note
          </button>
        </div>

        <div className="bg-[#161414] rounded-3xl p-8 md:p-10 shadow-2xl border border-white/5">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2 ml-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#4ade80]"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2 ml-1">
                Content
              </label>
              <textarea
                rows="8"
                name="content"
                value={note.content}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#4ade80] resize-none"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#22c55e] text-black font-bold py-3.5 px-10 rounded-full hover:bg-[#16a34a] transition-all active:scale-95"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
