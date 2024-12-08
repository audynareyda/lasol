import React from "react";
import { BookOpen, Brain, Palette, LineChart, User } from "lucide-react";

// Mock data for students and classes with Indonesian names
const classData = [
  {
    id: 1,
    className: "Kelas Bahasa Indonesia",
    icon: BookOpen,
    students: [
      { id: 101, name: "Budi Santoso" },
      { id: 102, name: "Ani Widiastuti" },
      { id: 103, name: "Rini Prasetyo" },
      { id: 104, name: "Agus Setiawan" },
      { id: 105, name: "Dewi Lestari" },
    ],
  },
  {
    id: 2,
    className: "Kelas Matematika",
    icon: Brain,
    students: [
      { id: 201, name: "Eko Prasetyo" },
      { id: 202, name: "Siti Nurhaliza" },
      { id: 203, name: "Dedi Kurniawan" },
      { id: 204, name: "Maya Sari" },
      { id: 205, name: "Joko Widodo" },
    ],
  },
  {
    id: 3,
    className: "Kelas Desain",
    icon: Palette,
    students: [
      { id: 301, name: "Rizki Amalia" },
      { id: 302, name: "Fani Azhari" },
      { id: 303, name: "Ayu Paramitha" },
      { id: 304, name: "Reza Rahardian" },
      { id: 305, name: "Indah Permatasari" },
    ],
  },
  {
    id: 4,
    className: "Kelas Keuangan",
    icon: LineChart,
    students: [
      { id: 401, name: "Abdul Rahman" },
      { id: 402, name: "Tika Andriani" },
      { id: 403, name: "Surya Wirawan" },
      { id: 404, name: "Nanda Kusuma" },
      { id: 405, name: "Putri Ayu" },
    ],
  },
];

const Classes = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classData.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{classItem.className}</h3>
              <div className="bg-purple-100 p-4 rounded-lg">
                <classItem.icon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div>
              <h4 className="text-md font-medium mb-2">Daftar Siswa:</h4>
              <ul className="space-y-2">
                {classItem.students.map((student) => (
                  <li
                    key={student.id}
                    className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>{student.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
