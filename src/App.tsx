// React Routers
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import "./assets/css/App.css";

// Components
import Main from "./pages/main";

// App Component
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
      <a
        href="https://github.com/benjamin-bonneton/vision-care"
        target="_blank"
        className="copyright"
      >
        © Vision Care - Benjamin Bonneton
      </a>
    </>
  );
}

export default App;
