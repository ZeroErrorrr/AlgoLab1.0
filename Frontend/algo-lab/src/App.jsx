import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import AlgorithmHub from "./pages/AlgorithmHub.jsx";
import AITutor from "./pages/AITutor.jsx";
import ChallengeMode from "./pages/ChallengeMode.jsx";
import DecisionTreeSim from "./pages/simulations/DecisionTreeSim.jsx";
import KNNSim from "./pages/simulations/KNNSim.jsx";
import LinearRegressionSim from "./pages/simulations/LinearRegressionSim.jsx";
import NeuralNetworkSim from "./pages/simulations/NeuralNetworkSim.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hub" element={<AlgorithmHub />} />
        <Route path="/tutor" element={<AITutor />} />
        <Route path="/challenge" element={<ChallengeMode />} />
        <Route path="/sim/decision-tree" element={<DecisionTreeSim />} />
        <Route path="/sim/knn" element={<KNNSim />} />
        <Route path="/sim/linear-regression" element={<LinearRegressionSim />} />
        <Route path="/sim/neural-network" element={<NeuralNetworkSim />} />
      </Routes>
    </div>
  );
}
