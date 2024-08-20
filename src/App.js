import logo from "./logo.svg";
import "./App.css";
import MainPage from "./components/Main-Page/MainPage";
import NavBar from "./components/NavBar/NavBar";
import Router from "./router/index";
import MemeGenerator from "./components/Meme-Generator/MemeGenerator";
import MemeEditor from "./components/Meme-Generator/MemeEditor";
import ImageSelector from "./components/Meme-Generator/ImageSelector";

function App() {
  return (
    <div className="">
      {/* <MainPage /> */}
      {/* <NavBar /> */}
      {/* <Router /> */}
      {/* <MemeGenerator /> */}
      <NavBar />
      <MemeEditor />
      {/* <ImageSelector /> */}
    </div>
  );
}

export default App;
