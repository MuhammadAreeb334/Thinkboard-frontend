import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router";
import { FireAPI } from "../hooks/useRequest";

const Home = () => {
  const [loading, setLoading] = useState();
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllNotes = async () => {
      setLoading(true);
      try {
        const data = await FireAPI();
        // console.log(data);
        setNotes(data);
      } catch (error) {
        console.log("Error Fetching all Notes", error);
      } finally {
        setLoading(false);
      }
    };
    getAllNotes();
  }, []);

  const handleNoteDelete = (deletedId) => {
    setNotes((prev) => prev.filter((note) => note._id !== deletedId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading.....
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black p-8 font-sans">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-[#4ade80] text-2xl font-bold tracking-tight">
          ThinkBoard
        </h1>
        <button
          onClick={() => navigate("/create-note")}
          className="bg-[#4ade80] text-black font-semibold py-2 px-4 rounded-full flex items-center gap-1 hover:bg-[#22c55e] transition-all"
        >
          <span className="text-xl">+</span> New Note
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note?._id} {...note} onDelete={handleNoteDelete} />
        ))}
      </main>
    </div>
  );
};

export default Home;
