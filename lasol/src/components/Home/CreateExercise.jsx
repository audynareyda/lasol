import React, { useState } from "react";
import { ChevronLeft, Plus, Save, Trash2 } from "lucide-react";

const CreateExercise = ({ onClose }) => {
  const [exerciseData, setExerciseData] = useState({
    title: "",
    topic: "",
    duration: "",
    questions: [
      {
        id: 1,
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ],
  });

  const addQuestion = () => {
    setExerciseData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: prev.questions.length + 1,
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    }));
  };

  const removeQuestion = (questionId) => {
    setExerciseData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const handleQuestionChange = (
    questionId,
    field,
    value,
    optionIndex = null
  ) => {
    setExerciseData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId) {
          if (optionIndex !== null) {
            const newOptions = [...q.options];
            newOptions[optionIndex] = value;
            return { ...q, options: newOptions };
          }
          return { ...q, [field]: value };
        }
        return q;
      }),
    }));
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving exercise:", exerciseData);
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
            <h2 className="text-xl font-bold">Buat Soal Baru</h2>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan</span>
            </button>
          </div>
        </div>

        {/* Exercise Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul Latihan
              </label>
              <input
                type="text"
                value={exerciseData.title}
                onChange={(e) =>
                  setExerciseData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                placeholder="Contoh: Matematika Dasar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Topik
              </label>
              <input
                type="text"
                value={exerciseData.topic}
                onChange={(e) =>
                  setExerciseData((prev) => ({
                    ...prev,
                    topic: e.target.value,
                  }))
                }
                className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                placeholder="Contoh: Aljabar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durasi (menit)
              </label>
              <input
                type="number"
                value={exerciseData.duration}
                onChange={(e) =>
                  setExerciseData((prev) => ({
                    ...prev,
                    duration: e.target.value,
                  }))
                }
                className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                placeholder="45"
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        {exerciseData.questions.map((question, index) => (
          <div
            key={question.id}
            className="bg-white rounded-lg shadow-md p-6 mb-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Soal {index + 1}</h3>
              {exerciseData.questions.length > 1 && (
                <button
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pertanyaan
                </label>
                <textarea
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(
                      question.id,
                      "question",
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opsi {String.fromCharCode(65 + optionIndex)}
                    </label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleQuestionChange(
                          question.id,
                          "options",
                          e.target.value,
                          optionIndex
                        )
                      }
                      className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jawaban Benar
                </label>
                <select
                  value={question.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(
                      question.id,
                      "correctAnswer",
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">Pilih jawaban benar</option>
                  {question.options.map((_, index) => (
                    <option key={index} value={index}>
                      Opsi {String.fromCharCode(65 + index)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <button
          onClick={addQuestion}
          className="w-full bg-purple-100 text-purple-600 py-3 rounded-lg hover:bg-purple-200 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Soal</span>
        </button>
      </div>
    </div>
  );
};

export default CreateExercise;
