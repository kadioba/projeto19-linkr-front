import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage/index.jsx";
import SignUpPage from "./pages/SignUpPage/index.jsx";
import { MyProvider } from "./contexts/MyContext.jsx";
import TimelinePage from "./pages/TimelinePage/index.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import { useLocation } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </MyProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const showNavBar = location.pathname === "/timeline";

  return (
    <>
      {showNavBar  && (
        <>
          <NavBar />
          <SearchBar header={false} />
        </>
      )}
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </>
  );
}

export default App;
