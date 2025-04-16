"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { allProjects } from "contentlayer/generated";
import Particles from "./components/particles";
import {
  Github,
  ExternalLink,
  ChevronDown,
  FileText,
  Moon,
  Sun,
} from "lucide-react";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

// Categorized technologies for better organization
const technologies = {
  frontend: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
  backend: ["Python", "FastAPI", "Node.js"],
  data: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
  ai_ml: ["OpenCV", "Mediapipe", "PyTorch", "TensorFlow", "Scikit-learn"],
  deployment: ["Streamlit", "FastAPI", "Google Colab", "GitHub"],
  tools: [
    "Jupyter Notebook",
    "Google Colab",
    "PyCharm",
    "Excel",
    "Google Sheets",
  ],
};

// Featured project to showcase directly on homepage
const featuredProject = allProjects;
  // allProjects.find((project) => project.featured && project.published) ||
  // allProjects
  //   .filter((project) => project.published)
  //   .sort((a, b) => {
  //     const dateA = a.date ? new Date(a.date).getTime() : 0;
  //     const dateB = b.date ? new Date(b.date).getTime() : 0;
  //     return dateB - dateA;
  //   })[0];


export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollIndicator, setScrollIndicator] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [themeChanging, setThemeChanging] = useState(false);
  const [current, setCurrent] = useState(0)
  const total = featuredProject.length;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 2500) // fast switch every 2.5s

    const timer = setTimeout(() => setIsLoaded(true), 100);
    const handleScroll = () => {
      if (window.scrollY > 10) setScrollIndicator(false);
      else setScrollIndicator(true);
    };

    // Check system preference for theme
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [total]);

  const toggleTheme = () => {
    setThemeChanging(true);
    setTimeout(() => {
      setDarkMode(!darkMode);
      setTimeout(() => {
        setThemeChanging(false);
      }, 600); // Wait for animations to complete
    }, 300);
  };

  // Create array of all techs for marquee
  const allTechnologies = [
    ...technologies.frontend.map((tech) => ({
      name: tech,
      category: "Frontend",
    })),
    ...technologies.backend.map((tech) => ({
      name: tech,
      category: "Backend",
    })),
    ...technologies.data.map((tech) => ({
      name: tech,
      category: "Data",
    })),
    ...technologies.ai_ml.map((tech) => ({
      name: tech,
      category: "AI/ML",
    })),
    ...technologies.deployment.map((tech) => ({
      name: tech,
      category: "Deployment",
    })),
    ...technologies.tools.map((tech) => ({
      name: tech,
      category: "Tools",
    })),
  ];

  return (
    <div
      className={`relative flex flex-col items-center w-screen min-h-screen overflow-hidden transition-all duration-700 ${
        darkMode
          ? "bg-gradient-to-tl from-black via-zinc-800/20 to-black text-white"
          : "bg-gradient-to-tl from-sky-50 via-blue-50/20 to-indigo-50 text-blue-950"
      } ${themeChanging ? "scale-[0.98] blur-sm" : "scale-100 blur-0"}`}
    >
      
      <div
        className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-700 ${
          themeChanging ? "opacity-100" : "opacity-0"
        } ${darkMode ? "bg-sky-100" : "bg-black"}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`transition-transform duration-700 ${
              themeChanging ? "scale-150 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            {darkMode ? (
              <Sun size={64} className="text-amber-500 animate-spin-slow" />
            ) : (
              <Moon size={64} className="text-indigo-300 animate-spin-slow" />
            )}
          </div>
        </div>
      </div>

      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="mx-auto px-6 py-5 max-w-5xl flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-medium tracking-tight hover:opacity-80 transition"
            aria-label="Home"
          >
            AR
          </Link>
          <ul className="flex items-center gap-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm ${
                    darkMode
                      ? "text-zinc-400 hover:text-zinc-100"
                      : "text-blue-700 hover:text-blue-900"
                  } transition duration-300 relative group`}
                  aria-label={`Go to ${item.name}`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-px ${
                      darkMode ? "bg-zinc-100" : "bg-blue-800"
                    } transition-all duration-300 group-hover:w-full`}
                  ></span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="https://github.com/R4ffaell"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center p-1.5 ${
                  darkMode
                    ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                    : "text-blue-700 hover:text-blue-900 hover:bg-blue-100/50"
                } transition-colors rounded-full`}
                aria-label="GitHub profile"
              >
                <Github size={18} />
              </Link>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center justify-center p-1.5 ${
                  darkMode
                    ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                    : "text-blue-700 hover:text-blue-900 hover:bg-blue-100/50"
                } transition-colors rounded-full overflow-hidden relative`}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                disabled={themeChanging}
              >
                <span
                  className={`absolute inset-0 ${
                    darkMode ? "bg-zinc-600" : "bg-blue-200"
                  } opacity-0 transition-opacity duration-300 ${
                    themeChanging ? "opacity-20" : ""
                  }`}
                ></span>
                {darkMode ? (
                  <Sun
                    size={18}
                    className={`transition-all duration-300 ${
                      themeChanging ? "rotate-90" : "rotate-0"
                    }`}
                  />
                ) : (
                  <Moon
                    size={18}
                    className={`transition-all duration-300 ${
                      themeChanging ? "-rotate-90" : "rotate-0"
                    }`}
                  />
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`hidden w-screen h-px md:block ${
          darkMode
            ? "bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent"
            : "bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"
        } transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {darkMode && (
        <Particles
          className=" inset-0 -z-10 animate-fade-in"
          quantity={150}
        />
      )}

      {!darkMode && (
        <div className=" inset-0 -z-10 overflow-hidden">
          <div className="light-rays"></div>
          <div className="floating-shapes"></div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center z-10 mt-24">
        <h1
          className={`py-3 px-1 text-4xl sm:text-6xl md:text-8xl font-display bg-clip-text text-transparent ${
            darkMode
              ? "bg-gradient-to-r from-zinc-100 via-white to-zinc-100"
              : "bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-800"
          } whitespace-nowrap cursor-default text-edge-outline drop-shadow-md transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Anakta Raffaell
        </h1>

        <p
          className={`mt-4 text-xl ${
            darkMode ? "text-zinc-300" : "text-blue-800"
          } font-light transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          AI & Computer Vision Engineer
        </p>

        <div
          className={`mt-6 mb-2 overflow-hidden h-6 transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-3 items-center animate-marquee">
            {[...allTechnologies, ...allTechnologies].map((tech, index) => (
              <span
                key={index}
                className={`text-xs px-3 py-1 ${
                  darkMode
                    ? "bg-zinc-800/60 text-zinc-300"
                    : "bg-blue-100/60 text-blue-800"
                } rounded-full font-mono whitespace-nowrap flex items-center gap-2`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    tech.category === "Frontend"
                      ? "bg-amber-400"
                      : tech.category === "Backend"
                      ? "bg-emerald-400"
                      : "bg-purple-400"
                  }`}
                ></span>
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`hidden w-screen h-px md:block ${
            darkMode
              ? "bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent"
              : "bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"
          } transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`my-12 text-center max-w-xl px-6 transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className={`text-sm sm:text-base ${
              darkMode ? "text-zinc-400" : "text-blue-700"
            } leading-relaxed`}
          >
            I'm a final-year Computer Engineering student who loves building
            smart apps with AI & Computer Vision.
            <br />
            Check out my{" "}
            <Link
              href="https://github.com/R4ffaell"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 ${
                darkMode
                  ? "text-zinc-300 hover:text-white"
                  : "text-blue-800 hover:text-blue-900"
              } underline decoration-dotted underline-offset-2 transition-colors`}
            >
              GitHub <ExternalLink size={14} />
            </Link>{" "}
            to see what I'm working on, from helmet to driver monitoring
            systems.
          </h2>
        </div>

        {/* Featured Project Section */}
        <div className="max-w-4xl w-full px-6 mb-8 transition-all duration-1000 delay-400 opacity-100 translate-y-0">
          <h3 className={`text-xl font-medium mb-4 text-center ${darkMode ? 'text-zinc-200' : 'text-blue-900'}`}>
            Featured Projects
          </h3>

          <div className="relative w-full" style={{ minHeight: "300px" }}>
            {featuredProject.map((project, idx) => (
              <div
                key={idx}
                className={`absolute top-0 left-0 w-full transition-opacity duration-700 ease-in-out ${
                  idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <div
                  className={`rounded-lg overflow-hidden ${
                    darkMode ? 'bg-zinc-800/60' : 'bg-blue-100/60'
                  } p-4 sm:p-6 flex flex-col sm:flex-row gap-6 backdrop-blur-sm`}
                >
                  <div className="aspect-video w-full sm:w-1/2 overflow-hidden rounded-md bg-zinc-700/30 flex items-center justify-center">
                    <img
                      src={project.image || '/images/Distracted.jpg'}
                      alt={`${project.title} Screenshot`}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h4
                      className={`text-lg font-medium ${
                        darkMode ? 'text-white' : 'text-blue-900'
                      } mb-2`}
                    >
                      {project.title}
                    </h4>
                    <p
                      className={`text-sm ${
                        darkMode ? 'text-zinc-300' : 'text-blue-800'
                      } mb-4`}
                    >
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      {project.repository && (
                        <>
                          <Link
                            href={project.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1 text-xs ${
                              darkMode
                                ? 'text-zinc-400 hover:text-zinc-100'
                                : 'text-blue-700 hover:text-blue-900'
                            } transition-colors`}
                          >
                            <Github size={14} /> View Code
                          </Link>
                          <span
                            className={`text-xs ${
                              darkMode ? 'text-zinc-500' : 'text-blue-500'
                            }`}
                          >
                            •
                          </span>
                        </>
                      )}
                      {project.url && (
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 text-xs ${
                            darkMode
                              ? 'text-zinc-400 hover:text-zinc-100'
                              : 'text-blue-700 hover:text-blue-900'
                          } transition-colors`}
                        >
                          <ExternalLink size={14} /> Live Demo
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project and Resume Buttons - Now properly positioned directly under featured projects */}
        <div
          className={`flex gap-4 mb-16 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/projects"
            className={`group flex items-center justify-center rounded-full ${
              darkMode
                ? "bg-zinc-800/70 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                : "bg-blue-100/70 text-blue-700 hover:bg-blue-200 hover:text-blue-900"
            } px-6 py-2.5 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${
              darkMode ? "focus:ring-zinc-500/50" : "focus:ring-blue-400/50"
            } focus:ring-offset-2 overflow-hidden`}
          >
            <span className="z-10">Explore My Projects</span>
            <span className="overflow-hidden rounded-full">
              <span
                className={`aspect-square w-full origin-center -translate-x-full rounded-full ${
                  darkMode ? "bg-zinc-600/40" : "bg-blue-300/40"
                } transition-all duration-500 group-hover:translate-x-0 group-hover:scale-150`}
              />
            </span>
          </Link>

          <Link
            href="https://drive.google.com/file/d/1VecATyfKRrptXm3U2oB6sxGQZo3H7v3H/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full ${
              darkMode
                ? "bg-transparent text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500"
                : "bg-transparent text-blue-700 hover:text-blue-900 border border-blue-200 hover:border-blue-300"
            } px-6 py-2.5 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${
              darkMode ? "focus:ring-zinc-500/50" : "focus:ring-blue-400/50"
            } focus:ring-offset-2`}
          >
            <FileText size={16} />
            <span>View Resume</span>
          </Link>
        </div>
      </div>

      {scrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
          <ChevronDown
            size={20}
            className={darkMode ? "text-zinc-400" : "text-blue-600"}
          />
        </div>
      )}

      <footer
        className={`w-full py-6 mt-auto ${
          darkMode ? "text-zinc-500" : "text-blue-600"
        } text-center text-xs`}
      >
        <p>
          © {new Date().getFullYear()} Anakta Raffaell. All rights reserved.
        </p>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .text-edge-outline {
          -webkit-text-stroke: 1px
            ${darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(30, 58, 138, 0.1)"};
        }
        @media (prefers-reduced-motion) {
          .animate-marquee {
            animation: none;
          }
        }

        /* Light mode animations */
        .light-rays {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle at center,
            rgba(191, 219, 254, 0.3) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          opacity: ${darkMode ? 0 : 1};
          transform: scale(${darkMode ? 0 : 1});
          transition: opacity 1s ease, transform 1.5s ease;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          25% {
            transform: translateY(-15px) rotate(5deg);
          }
          50% {
            transform: translateY(0) rotate(0);
          }
          75% {
            transform: translateY(15px) rotate(-5deg);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          25% {
            transform: translateY(15px) rotate(-5deg);
          }
          50% {
            transform: translateY(0) rotate(0);
          }
          75% {
            transform: translateY(-15px) rotate(5deg);
          }
        }

        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: ${darkMode ? 0 : 0.7};
          transition: opacity 1s ease;
        }

        .floating-shapes::before,
        .floating-shapes::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(147, 197, 253, 0.3),
            rgba(191, 219, 254, 0.1)
          );
          filter: blur(20px);
        }

        .floating-shapes::before {
          top: 15%;
          left: 10%;
          width: 300px;
          height: 300px;
          animation: float 20s ease-in-out infinite;
        }

        .floating-shapes::after {
          bottom: 15%;
          right: 10%;
          width: 250px;
          height: 250px;
          animation: float-reverse 25s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
