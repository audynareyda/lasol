import React, { useState, useEffect } from "react";
import { Rocket, Target, Award, Star, Trophy, BookOpen } from "lucide-react";

const MotivationalCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Belajar untuk Meraih Mimpi",
      description:
        "Setiap langkah belajarmu adalah satu langkah lebih dekat menuju kesuksesan",
      icon: <Rocket className="w-12 h-12 text-white" />,
      bgColor: "bg-purple-600",
      accent: "bg-purple-500",
    },
    {
      title: "Pantau Perkembanganmu",
      description:
        "Evaluasi hasil belajar secara rutin untuk hasil yang maksimal",
      icon: <Target className="w-12 h-12 text-white" />,
      bgColor: "bg-indigo-600",
      accent: "bg-indigo-500",
    },
    {
      title: "Raih Prestasimu",
      description: "Jadilah versi terbaik dari dirimu dengan belajar konsisten",
      icon: <Award className="w-12 h-12 text-white" />,
      bgColor: "bg-violet-600",
      accent: "bg-violet-500",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg p-6 mb-6 h-64">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : "translate-x-full"
          } ${slide.bgColor}`}
          style={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
          }}
        >
          <div className="relative h-full p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg ${slide.accent}`}>
                {slide.icon}
              </div>
              {slide.secondaryIcon}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">{slide.title}</h2>
              <p className="text-white text-opacity-90">{slide.description}</p>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    dotIndex === currentSlide
                      ? "bg-white w-4"
                      : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-10" />
    </div>
  );
};

export default MotivationalCarousel;
