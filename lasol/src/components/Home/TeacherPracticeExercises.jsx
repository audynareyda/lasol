import React, { useState } from "react";
import CreateExercise from "./CreateExercise";
import { Plus, FileText } from "lucide-react";

const TeacherPracticeExercises = ({ user, activeTab }) => {
  const [showCreateExercise, setShowCreateExercise] = useState(false);

  // Mock data for created exercises
  const exercises = [
    {
      id: 1,
      title: "Matematika Dasar",
      topic: "Aljabar",
      duration: 45,
      questions: 5,
      createdAt: "2024-06-15",
    },
    {
      id: 2,
      title: "Fisika Lanjutan",
      topic: "Mekanika",
      duration: 60,
      questions: 7,
      createdAt: "2024-06-10",
    },
  ];

  // Filter exercises based on active tab
  const filteredExercises = exercises.filter(() => {
    // You can add more complex filtering logic here
    return true;
  });

  return (
    <div>
      {showCreateExercise ? (
        <CreateExercise onClose={() => setShowCreateExercise(false)} />
      ) : (
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Latihan & Ujian</h2>
            <button
              onClick={() => setShowCreateExercise(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus className="w-5 h-5" />
              <span>Buat Soal</span>
            </button>
          </div>

          {/* Exercise List */}
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{exercise.title}</h3>
                <div className="text-sm text-gray-600 space-x-2">
                  <span>{exercise.topic}</span>
                  <span>•</span>
                  <span>{exercise.duration} menit</span>
                  <span>•</span>
                  <span>{exercise.questions} soal</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-purple-600 hover:bg-purple-50 p-2 rounded-lg">
                  <FileText className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {filteredExercises.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Belum ada latihan atau ujian
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherPracticeExercises;
