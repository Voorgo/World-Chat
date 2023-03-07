import Scene from "../components/Scene";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="h-[100vh] w-full bg-gradient-to-b from-[#272D41] via-[#000519] to-[#0e1516]">
      <div className="flex h-full w-full">
        <Sidebar />
        <Scene />
      </div>
    </div>
  );
};

export default Home;
