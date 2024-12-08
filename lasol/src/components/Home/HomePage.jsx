import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import MotivationalCarousel from "./MotivationalCarousel";
import StudentPracticeExercises from "./StudentPracticeExercises";
import TeacherPracticeExercises from "./TeacherPracticeExercises";

const HomePage = () => {
  // Default to student role
  const [user, setUser] = useState({
    email: "student@example.com",
    role: "student",
  });

  // State to manage active tab
  const [activeTab, setActiveTab] = useState("All");

  // State for access code modal
  const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessCodeError, setAccessCodeError] = useState("");

  // Correct access code (this would typically come from a backend or configuration)
  const CORRECT_ACCESS_CODE = "GURU2024";

  // State to manage teacher exercise visibility
  const [showTeacherExercises, setShowTeacherExercises] = useState(false);

  // Define tabs for student
  const studentTabs = ["All", "Latihan soal", "Try-out", "Grafik nilai"];

  const handleBuatSoalClick = () => {
    setIsAccessCodeModalOpen(true);
  };

  const handleAccessCodeSubmit = () => {
    if (accessCode.trim() === CORRECT_ACCESS_CODE) {
      setShowTeacherExercises(true);
      setIsAccessCodeModalOpen(false);
      setAccessCodeError("");
    } else {
      setAccessCodeError("Kode akses salah. Silakan coba lagi.");
    }
  };

  const renderPracticeExercises = () => {
    return showTeacherExercises ? (
      <TeacherPracticeExercises user={user} activeTab="Buat Soal" />
    ) : (
      <StudentPracticeExercises user={user} activeTab={activeTab} />
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <MotivationalCarousel />

      {/* Tabs and Buat Soal Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Tabs container with horizontal scroll on small screens */}
        <div className="w-full overflow-x-auto">
          <div className="flex space-x-2 min-w-full">
            {studentTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Buat Soal button */}
        <div className="w-full sm:w-auto">
          <button
            onClick={handleBuatSoalClick}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg 
             hover:bg-red-600 transition-colors duration-300 
             shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base
             sm:min-w-[150px]"
          >
            <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />{" "}
            <span>Buat Soal</span>
          </button>
        </div>
      </div>

      {renderPracticeExercises()}

      {/* Access Code Modal */}
      {isAccessCodeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
              Masukkan Kode Akses Guru (GURU2024)
            </h2>
            <input
              type="text"
              placeholder="Masukkan kode akses"
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value);
                setAccessCodeError("");
              }}
              className="w-full px-3 py-2 border rounded-md mb-2 text-sm sm:text-base"
            />
            {accessCodeError && (
              <p className="text-red-500 text-xs sm:text-sm mb-2 text-center">
                {accessCodeError}
              </p>
            )}
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => setIsAccessCodeModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-md text-sm sm:text-base"
              >
                Batal
              </button>
              <button
                onClick={handleAccessCodeSubmit}
                className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-md text-sm sm:text-base"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
