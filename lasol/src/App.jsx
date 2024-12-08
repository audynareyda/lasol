import React, { useState } from "react";
import { Home, BookOpen, FileText, UserCircle } from "lucide-react";

// Component imports
import HomePage from "./components/Home/HomePage";
import Classes from "./components/Classes/Classes";
import Reports from "./components/Reports/Reports";
import Profile from "./components/Profile/Profile";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  // Auth handlers
  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password) {
      setUser({ email, role });
      setView("home");
      setEmail("");
      setPassword("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setUser({ email, role });
      setView("home");
      setEmail("");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView("home");
  };

  // Content renderer
  const renderContent = () => {
    switch (view) {
      case "classes":
        return <Classes />;
      case "reports":
        return <Reports />;
      case "profile":
        return <Profile user={user} />;
      case "login":
        return (
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            role={role}
            setRole={setRole}
            handleLogin={handleLogin}
            setView={setView}
          />
        );
      case "signup":
        return (
          <SignupForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            role={role}
            setRole={setRole}
            handleSignup={handleSignup}
            setView={setView}
          />
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-purple-600 text-2xl font-bold">LASOL</div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setView("login")}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pb-20">{renderContent()}</div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-3">
            <button
              onClick={() => setView("home")}
              className={`flex flex-col items-center ${
                view === "home" ? "text-purple-600" : "text-gray-500"
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Beranda</span>
            </button>
            <button
              onClick={() => setView("classes")}
              className={`flex flex-col items-center ${
                view === "classes" ? "text-purple-600" : "text-gray-500"
              }`}
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-xs mt-1">Kelas</span>
            </button>
            <button
              onClick={() => setView("reports")}
              className={`flex flex-col items-center ${
                view === "reports" ? "text-purple-600" : "text-gray-500"
              }`}
            >
              <FileText className="w-6 h-6" />
              <span className="text-xs mt-1">Peringkat</span>
            </button>
            <button
              onClick={() => setView("profile")}
              className={`flex flex-col items-center ${
                view === "profile" ? "text-purple-600" : "text-gray-500"
              }`}
            >
              <UserCircle className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
