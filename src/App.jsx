import Footer from "./components/UI/Footer";
import Header from "./components/UI/Header";
import Game from "./components/UI/Game";
import Home from "./components/UI/Home";

function App() {
  return (
    <div className="flex flex-col min-h-screen gap-4 p-4 bg-zinc-200">
      <Header />
      <Home />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
