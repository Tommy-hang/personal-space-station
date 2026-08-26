import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Knowledge from "./pages/Knowledge";
import KnowledgeArticle from "./pages/KnowledgeArticle";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Life from "./pages/Life";
import About from "./pages/About";
import GuestWall from "./pages/GuestWall";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/knowledge/:id" element={<KnowledgeArticle />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/life" element={<Life />} />
        <Route path="/about" element={<About />} />
        <Route path="/guest-wall" element={<GuestWall />} />
      </Route>
    </Routes>
  );
}
