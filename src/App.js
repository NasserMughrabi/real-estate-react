import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { ListingProvider } from "../src/context/listingContext";
import Login from "./pages/Login";
import { UserContextProvider } from "./context/userContext";
import UserStatus from "./components/onboard/UserStatus";
import ListingPage from "./pages/ListingPage";

function App() {
  return (
    <ListingProvider>
      <UserContextProvider>
        <UserStatus />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/:id" element={<Profile />} />
            <Route
              path="/users/:userId/listings/:listingId"
              element={<ListingPage />}
            />

            {/* <Route
            path="/welcome/:username"
            element={
              <AuthenticatedRoute>
              <WelcomeComponent />
              </AuthenticatedRoute>
              }
              /> */}
          </Routes>
        </Router>
      </UserContextProvider>
    </ListingProvider>
  );
}

export default App;
