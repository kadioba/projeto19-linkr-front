import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignInPage from "./pages/SignInPage/index.jsx";
import SignUpPage from "./pages/SignUpPage/index.jsx";
import { MyProvider } from "./contexts/MyContext.jsx";
import TimelinePage from "./pages/TimelinePage/index.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import SearchBar from "./components/SearchBar/SearchBar";
import UserPage from "./pages/UserPage/index.jsx";

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
  const showNavBar = !(location.pathname === "/" || location.pathname === "/sign-up");

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
        <Route path="/user/:id" element={<UserPage/>} />
      </Routes>
    </>
  );
}

export default App;
