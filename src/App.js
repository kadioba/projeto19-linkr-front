import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Posts from "./components/Posts/Posts";
import TimelinePage from "./pages/TimelinePage/TimelinePage";
import UserPage from "./pages/UserPage/UserPage";
import HashtagPage from "./pages/HashtagPage/HashtagPage";
import MainProvider from "./contexts/MainProvider";

function App() {
  return (
    <MainProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route element={<Posts />}>
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </MainProvider>
  );
}

export default App;
