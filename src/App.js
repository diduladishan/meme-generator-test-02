import logo from "./logo.svg";
import "./App.css";
import MainPage from "./components/Main-Page/MainPage";
import NavBar from "./components/NavBar/NavBar";
import Router from "./router/index";
import MemeGenerator from "./components/Meme-Generator/MemeGenerator";
import MemeEditor from "./components/Meme-Generator/MemeEditor";

function App() {
  return (
    <div className="">
      {/* <MainPage /> */}
      {/* <NavBar /> */}
      {/* <Router /> */}
      {/* <MemeGenerator /> */}
      <MemeEditor />
    </div>
  );
}

export default App;
