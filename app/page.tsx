"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

// Wedding images - using placeholders
const images = [
  "/foto1.png?height=800&width=600",
  "/foto2.png?height=800&width=600",
];

export default function SaveTheDate() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
    setTimeout(() => setIsTransitioning(false), 500); // Match this with transition duration
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
    setTimeout(() => setIsTransitioning(false), 500); // Match this with transition duration
  }, [isTransitioning]);

  return (
    <main className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Side - Content */}
        <div className="w-3/5 flex items-center justify-center bg-[#f9f7f5]">
          <div className="mx-auto px-2 text-center">
            <h1 className="text-[200px] mb-1 text-[#3c3c3c]">Save the Date</h1>
            <h2 className="text-[50px] mt-[-40px] mb-4 text-[#5a5a5a]">
              Katherine & Charles
            </h2>
            <p className="text-[30px] mb-12 text-[#7a7a7a]">
              June 18, 2025 | Curitiba, PR
            </p>
            <div className="flex space-x-4 justify-center">
              <Link
                href="#location"
                className="px-8 py-3 bg-[#d4c9b9] text-white rounded hover:bg-[#c5b9a8] transition-colors duration-300"
              >
                Localização
              </Link>
              <Link
                href="#cp"
                className="px-8 py-3 border border-[#d4c9b9] text-[#d4c9b9] rounded hover:bg-[#f5f2ee] transition-colors duration-300"
              >
                Confirmar presença
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Vertical Carousel */}
        <div className="w-2/5 relative overflow-hidden">
          {/* Carousel Images */}
          <div className="h-screen relative">
            {images.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Wedding image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Vertical Navigation Controls */}
          <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center z-20 p-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/70 text-[#3c3c3c] hover:bg-white mb-2"
              aria-label="Previous image"
            >
              <ChevronUp className="h-6 w-6" />
            </button>
            <div className="flex flex-col space-y-2 my-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsTransitioning(false), 500);
                    }
                  }}
                  className={`h-2 w-2 rounded-full ${
                    activeIndex === index ? "bg-[#d4c9b9]" : "bg-white/70"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/70 text-[#3c3c3c] hover:bg-white mt-2"
              aria-label="Next image"
            >
              <ChevronDown className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen flex flex-col">
        {/* Top - Horizontal Carousel */}
        <div className="h-[40vh] relative overflow-hidden">
          {/* Carousel Images */}
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`Wedding image ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Horizontal Navigation Controls */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center z-20 p-4">
            <div className="flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsTransitioning(false), 500);
                    }
                  }}
                  className={`h-2 w-2 rounded-full ${
                    activeIndex === index ? "bg-[#d4c9b9]" : "bg-white/70"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Left/Right Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/70 text-[#3c3c3c] hover:bg-white z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/70 text-[#3c3c3c] hover:bg-white z-20"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom - Content */}
        <div className="flex-1 flex justify-center bg-[#f9f7f5]">
          <div className="mx-auto text-center">
            <h1 className="text-[110px] mb-4 text-[#3c3c3c]">Save the Date</h1>
            <h2 className="text-[25px] mt-[-30px] mb-10 text-[#5a5a5a]">
              Katherine & Charles
            </h2>
            <p className="text-[28px] mb-8 text-[#7a7a7a]">
              June 18, 2025 | Curitiba, PR
            </p>
            <div className="justify-center mt-[50px]">
              <div className="mb-7">
                <Link
                  href="#location"
                  className="px-6 py-2 bg-[#d4c9b9] text-white rounded hover:bg-[#c5b9a8] transition-colors duration-300 text-sm"
                >
                  Localização
                </Link>
              </div>
              <div>
                <Link
                  href="#cp"
                  className="px-6 py-2 border border-[#d4c9b9] text-[#d4c9b9] rounded hover:bg-[#f5f2ee] transition-colors duration-300 text-sm"
                >
                  Confirmar presença
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
