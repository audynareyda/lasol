import React, { useState, useEffect } from "react";
import { Clock, ChevronLeft, ChevronRight, Save } from "lucide-react";

const DoExercise = ({ exercise, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Countdown effect
  useEffect(() => {
    // If time is already up, don't start the timer
    if (isTimeUp) return;

    // If time reaches 0, stop the timer
    if (timeRemaining <= 0) {
      setIsTimeUp(true);
      return;
    }

    // Set up the interval
    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    // Clean up the interval
    return () => clearInterval(timer);
  }, [timeRemaining, isTimeUp]);

  // Mock questions data
  const questions = [
    {
      id: 1,
      question: "Berapakah hasil dari 5 + 3 × 4?",
      options: ["17", "32", "20", "17"],
      correctAnswer: "17",
    },
    {
      id: 2,
      question: "Manakah yang merupakan bilangan prima?",
      options: ["4", "9", "11", "15"],
      correctAnswer: "11",
    },
    // Add more questions as needed
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Handle submit or time up
  const handleSubmit = () => {
    // TODO: Implement submit logic (e.g., calculate score, save results)
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
      <div className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <Clock
                className={`w-5 h-5 ${
                  timeRemaining <= 60 ? "text-red-600" : "text-purple-600"
                }`}
              />
              <span
                className={`text-lg font-semibold ${
                  timeRemaining <= 60 ? "text-red-600" : "text-purple-600"
                }`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Kumpulkan
            </button>
          </div>
        </div>

        {isTimeUp && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Waktu habis! </strong>
            <span className="block sm:inline">
              Anda tidak dapat melanjutkan ujian.
            </span>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="mb-6">
            <span className="text-sm text-gray-500">
              Soal {currentQuestion + 1} dari {questions.length}
            </span>
            <h3 className="text-xl font-semibold mt-2">
              {questions[currentQuestion].question}
            </h3>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() =>
                  handleAnswer(questions[currentQuestion].id, option)
                }
                disabled={isTimeUp}
                className={`w-full p-4 text-left rounded-lg border ${
                  answers[questions[currentQuestion].id] === option
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                } ${isTimeUp ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="font-medium">
                  {String.fromCharCode(65 + idx)}.
                </span>{" "}
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-4">
          <button
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0 || isTimeUp}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentQuestion === 0 || isTimeUp
                ? "text-gray-400 cursor-not-allowed"
                : "text-purple-600 hover:bg-purple-50"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Sebelumnya</span>
          </button>
          <button
            onClick={() =>
              setCurrentQuestion((prev) =>
                Math.min(questions.length - 1, prev + 1)
              )
            }
            disabled={currentQuestion === questions.length - 1 || isTimeUp}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentQuestion === questions.length - 1 || isTimeUp
                ? "text-gray-400 cursor-not-allowed"
                : "text-purple-600 hover:bg-purple-50"
            }`}
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoExercise;
