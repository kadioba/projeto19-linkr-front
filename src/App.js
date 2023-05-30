import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage/index.jsx";
import SignUpPage from "./pages/SignUpPage/index.jsx";
import { MyProvider } from "./contexts/MyContext.jsx";
import TimelinePage from "./pages/TimelinePage/index.jsx";

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
        </Routes>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
