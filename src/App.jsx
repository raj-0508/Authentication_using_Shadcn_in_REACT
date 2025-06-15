import { LoginCard } from "./components/LoginCard.jsx";
import { SignupCard } from "./components/SignupCard.jsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { UserProvider, useUser } from "./lib/context/user";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const isLoginPage = window.location.pathname === "/";
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <BrowserRouter>
          <UserProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<LoginCard />} />
              <Route path="/signup" element={<SignupCard />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
