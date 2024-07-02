import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListTask from "./components/ListTask";
import CreateNew from "./components/CreateNew";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListTask />} />
        <Route path="/new" element={<CreateNew />} />
        <Route path="/:id/edit" element={<CreateNew />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
