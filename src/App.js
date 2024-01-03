import Navbar from "./components/navbar/CustomerNavbar.jsx";
import "./assets/css/App.min.css";

import bg1 from "./assets/image/bg1.png"
function App() {
  return (
    <div className="App">
      <Navbar />
      <img src={bg1} alt="" />
    </div>
  );
}

export default App;
