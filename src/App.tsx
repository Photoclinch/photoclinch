import { Routes, Route } from "react-router-dom";
import NewHome from "./pages/NewHome";
import PhotographyServices from "./pages/PhotographyServices";
import Explore from "./pages/Explore";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import PostProject from "./pages/PostProject";
import JoinPhotographer from "./pages/JoinPhotographer";
import Confirmation from "./pages/Confirmation"; // Add this import

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NewHome />} />
      <Route path="/photography-services" element={<PhotographyServices />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/post-project" element={<PostProject />} />
      <Route path="/join-photographer" element={<JoinPhotographer />} />
      <Route path="/confirmation" element={<Confirmation />} /> {/* Add this route */}
    </Routes>
  );
};

export default App;