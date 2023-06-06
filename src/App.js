import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenProvider } from "./contexts/TokenContext";
import { UserProvider } from "./contexts/UserContext";
import { RefreshProvider } from "./contexts/RefreshContext";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Posts from "./components/Posts/Posts";
import TimelinePage from "./pages/TimelinePage/TimelinePage";
import UserPage from "./pages/UserPage/UserPage";
import HashtagPage from "./pages/HashtagPage/HashtagPage";

function App() {
  return (
    <TokenProvider>
      <UserProvider>
        <RefreshProvider>
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
        </RefreshProvider>
      </UserProvider>
    </TokenProvider>
  );
}

export default App;
