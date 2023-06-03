import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { MyProvider } from "./contexts/MyContext";
import TimelinePage from "./pages/TimelinePage/TimelinePage";
import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import UserPage from "./pages/UserPage/UserPage";
import HashtagPage from "./pages/HashtagPage/HashtagPage";
//import easterEgg from "./easterEgg/easterEgg";

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
  //easterEgg();

  return (
    <>
      {showNavBar && (
        <>
          <NavBar />
          <SearchBar header={false} />
        </>
      )}
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
      </Routes>
    </>
  );
}

export default App;
