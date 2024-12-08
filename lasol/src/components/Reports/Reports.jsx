import React, { useState, useEffect } from "react";

// Mock student reports with rankings using Indonesian names
const studentReports = [
  {
    studentId: 101,
    name: "Budi Santoso",
    scores: [85, 90, 78, 92],
    className: "Kelas Bahasa Indonesia",
  },
  {
    studentId: 102,
    name: "Ani Rahayu",
    scores: [88, 85, 92, 79],
    className: "Kelas Bahasa Indonesia",
  },
  {
    studentId: 201,
    name: "Adi Permana",
    scores: [95, 92, 88, 96],
    className: "Kelas Matematika",
  },
  {
    studentId: 202,
    name: "Siti Nurhaliza",
    scores: [87, 91, 85, 89],
    className: "Kelas Matematika",
  },
  {
    studentId: 301,
    name: "Ahmad Dhani",
    scores: [82, 88, 91, 85],
    className: "Kelas Desain",
  },
  {
    studentId: 302,
    name: "Rini Kartika",
    scores: [90, 85, 87, 92],
    className: "Kelas Desain",
  },
  {
    studentId: 401,
    name: "Made Suardana",
    scores: [93, 89, 95, 87],
    className: "Kelas Keuangan",
  },
  {
    studentId: 402,
    name: "Dewi Purnama",
    scores: [86, 92, 84, 90],
    className: "Kelas Keuangan",
  },
];

// Function to calculate average score and rank students
const calculateRankings = (reports) => {
  return reports
    .map((report) => ({
      ...report,
      averageScore:
        report.scores.reduce((a, b) => a + b, 0) / report.scores.length,
    }))
    .sort((a, b) => b.averageScore - a.averageScore)
    .map((report, index) => ({
      ...report,
      rank: index + 1,
    }));
};

const RankingPodium = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const rankedReports = calculateRankings(studentReports);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Filter classes
  const classes = [
    ...new Set(studentReports.map((report) => report.className)),
  ];

  // Apply class filter
  const filteredReports = activeFilter
    ? rankedReports.filter((report) => report.className === activeFilter)
    : rankedReports;

  // Get top three for the filtered class or overall
  const topThree = filteredReports.slice(0, 3);

  // Podium colors with solid, muted tones
  const podiumStyles = [
    {
      bg: "bg-purple-600",
      textColor: "text-white",
    },
    {
      bg: "bg-indigo-600",
      textColor: "text-white",
    },
    {
      bg: "bg-blue-600",
      textColor: "text-white",
    },
  ];

  // Calculate dynamic heights based on ranking
  const calculatePodiumHeight = (index) => {
    // Adjust height for mobile and desktop
    const baseHeight = isMobile ? 200 : 400;
    return baseHeight - index * (isMobile ? 50 : 100);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Filter Kelas */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-all text-sm sm:text-base ${
              !activeFilter
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-purple-100"
            }`}
          >
            All
          </button>
          {classes.map((className) => (
            <button
              key={className}
              onClick={() => setActiveFilter(className)}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center transition-all text-sm sm:text-base ${
                activeFilter === className
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-purple-100"
              }`}
            >
              {className}
            </button>
          ))}
        </div>

        {/* Podium */}
        <div
          className={`flex justify-center items-end space-x-2 md:space-x-4 mb-8 ${
            isMobile ? "h-[250px]" : "h-[500px]"
          }`}
        >
          {topThree.map((student, index) => (
            <div
              key={student.studentId}
              className={`
                w-20 sm:w-32 md:w-48 
                ${podiumStyles[index].bg} 
                rounded-t-2xl 
                flex flex-col 
                items-center 
                justify-end 
                pb-2 sm:pb-4 md:pb-6 
                transition-all 
                duration-300 
                hover:scale-105 
                shadow-lg
              `}
              style={{
                height: `${calculatePodiumHeight(index)}px`,
              }}
            >
              <div className="text-center">
                <h3
                  className={`
                    text-xs sm:text-base md:text-lg 
                    font-bold 
                    mt-1 sm:mt-2 
                    ${podiumStyles[index].textColor}
                  `}
                >
                  {student.name}
                </h3>
                <p
                  className={`
                  ${podiumStyles[index].textColor} 
                  text-[10px] sm:text-sm
                `}
                >
                  Rata-rata: {student.averageScore.toFixed(2)}
                </p>
                <div className="bg-white/20 px-2 sm:px-3 py-1 rounded-full mt-1 sm:mt-2">
                  <span
                    className={`
                      ${podiumStyles[index].textColor} 
                      font-bold 
                      text-[10px] sm:text-sm
                    `}
                  >
                    Peringkat {student.rank}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daftar Peringkat Lengkap */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-purple-600 p-4">
            <h3 className="text-xl sm:text-2xl font-bold text-center text-white">
              {activeFilter ? `Peringkat ${activeFilter}` : "Peringkat Lengkap"}
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredReports.map((student) => (
              <div
                key={student.studentId}
                className="px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="font-bold text-base sm:text-lg text-purple-600">
                    #{student.rank}
                  </span>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-gray-800">
                      {student.name}
                    </div>
                    <div className="text-xs sm:text-sm text-purple-500">
                      {student.className}
                    </div>
                  </div>
                </div>
                <div className="text-indigo-700 font-medium text-sm sm:text-base">
                  Rata-rata: {student.averageScore.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPodium;
