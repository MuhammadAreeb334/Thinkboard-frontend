import { Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";
import CreateNote from "./pages/CreateNote.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-note" element={<CreateNote />} />
      <Route path="/note/:id" element={<NoteDetail />} />
    </Routes>
  );
}

export default App;
