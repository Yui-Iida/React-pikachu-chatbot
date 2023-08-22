import "./App.css";
import Contents from "./components/Contents";
import Header from "./components/Header";
import Input from "./components/Input";

function App() {
  return (
    <div className="h-screen bg-gray-100 font-poppins">
      <Header />
      <Contents />
      <Input />
    </div>
  );
}

export default App;
