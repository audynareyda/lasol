import React, { useState } from "react";
import DoExercise from "./DoExercise";
import { Clock, FileText } from "lucide-react";

const StudentPracticeExercises = ({ user, activeTab }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Mock data for available exercises
  const exercises = [
    {
      id: 1,
      title: "Matematika Dasar",
      topic: "Aljabar",
      duration: 45,
      questions: 5,
      status: "Tersedia",
    },
    {
      id: 2,
      title: "Fisika Lanjutan",
      topic: "Mekanika",
      duration: 60,
      questions: 7,
      status: "Akan Datang",
    },
    {
      id: 3,
      title: "Ujian Semester",
      topic: "Campuran",
      duration: 90,
      questions: 10,
      status: "Selesai",
    },
  ];

  // Filter exercises based on active tab
  const filteredExercises = exercises.filter((exercise) => {
    switch (activeTab) {
      case "Latihan soal":
        return exercise.status === "Tersedia";
      case "Try-out":
        return exercise.status === "Akan Datang";
      case "Grafik nilai":
        return exercise.status === "Selesai";
      default:
        return true;
    }
  });

  // Render exercise status badge
  const renderStatusBadge = (status) => {
    const statusColors = {
      Tersedia: "bg-green-100 text-green-800",
      "Akan Datang": "bg-yellow-100 text-yellow-800",
      Selesai: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}
      >
        {status}
      </span>
    );
  };

  // Check if user can do the exercise
  const canDoExercise = (exercise) => {
    // Only students can do exercises
    return user.role === "student" && exercise.status === "Tersedia";
  };

  return (
    <div>
      {selectedExercise && user.role === "student" ? (
        <DoExercise
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      ) : (
        <div>
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{exercise.title}</h3>
                <div className="text-sm text-gray-600 space-x-2 flex items-center">
                  <span>{exercise.topic}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{exercise.duration} menit</span>
                  </div>
                  <span>•</span>
                  <span>{exercise.questions} soal</span>
                  {renderStatusBadge(exercise.status)}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {canDoExercise(exercise) && (
                  <button
                    onClick={() => setSelectedExercise(exercise)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Kerjakan
                  </button>
                )}
                {exercise.status === "Selesai" && (
                  <button className="text-purple-600 hover:bg-purple-50 p-2 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredExercises.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada latihan atau ujian
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentPracticeExercises;
