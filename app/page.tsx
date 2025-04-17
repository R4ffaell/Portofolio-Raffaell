"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollIndicator, setScrollIndicator] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [themeChanging, setThemeChanging] = useState(false);
  const [current, setCurrent] = useState(0);
  const total = featuredProject.length;
  
  // Canvas reference for background animation
  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 2500); // fast switch every 2.5s

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

  // Canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const particles = [];
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialize canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles for light mode and dark mode
    const initParticles = () => {
      particles.length = 0;
      const particleCount = darkMode ? 100 : 50;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: darkMode ? Math.random() * 2 + 1 : Math.random() * 3 + 2,
          color: darkMode ? 
            `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})` : 
            `rgba(100, 116, 139, ${Math.random() * 0.3 + 0.05})`,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy = -particle.vy;
      });
      
      // Connect particles that are close to each other (only in dark mode)
      if (darkMode) {
        particles.forEach((p1, i) => {
          particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
      } else {
        // Light mode gradient circles
        ctx.fillStyle = 'rgba(241, 245, 249, 0.01)';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 300, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a subtle radial gradient
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, 500
        );
        gradient.addColorStop(0, 'rgba(226, 232, 240, 0.03)');
        gradient.addColorStop(1, 'rgba(226, 232, 240, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    initParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

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
          ? "bg-gray-950 text-white"
          : "bg-slate-50 text-gray-900"
      } ${themeChanging ? "scale-[0.98] blur-sm" : "scale-100 blur-0"}`}
    >
      {/* Theme transition overlay */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-700 ${
          themeChanging ? "opacity-100" : "opacity-0"
        } ${darkMode ? "bg-slate-50" : "bg-gray-950"}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`transition-transform duration-700 ${
              themeChanging ? "scale-150 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            {darkMode ? (
              <Sun size={64} className="text-amber-400 animate-spin-slow" />
            ) : (
              <Moon size={64} className="text-slate-300 animate-spin-slow" />
            )}
          </div>
        </div>
      </div>

      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 -z-10"
        style={{ pointerEvents: 'none' }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        } ${darkMode ? "bg-gray-950/70" : "bg-slate-50/70"} backdrop-blur-sm`}
      >
        <div className="mx-auto px-6 py-5 max-w-5xl flex items-center justify-between">
          <Link
            href="/"
            className={`text-lg font-medium tracking-tight hover:opacity-80 transition ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
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
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } transition duration-300 relative group`}
                  aria-label={`Go to ${item.name}`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-px ${
                      darkMode ? "bg-white" : "bg-gray-800"
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
                className={`inline-flex items-center justify-center p-1.5 rounded-full ${
                  darkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                } transition-colors`}
                aria-label="GitHub profile"
              >
                <Github size={18} />
              </Link>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center justify-center p-1.5 rounded-full ${
                  darkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                } transition-colors overflow-hidden relative`}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                disabled={themeChanging}
              >
                <span
                  className={`absolute inset-0 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
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

      {/* Divider */}
      <div
        className={`hidden w-screen h-px md:block ${
          darkMode
            ? "bg-gradient-to-r from-transparent via-gray-600 to-transparent"
            : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        } transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center z-10 mt-24">
        <h1
          className={`py-3 px-1 text-4xl sm:text-6xl md:text-8xl font-display bg-clip-text text-transparent ${
            darkMode
              ? "bg-gradient-to-r from-blue-100 via-white to-blue-100"
              : "bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900"
          } whitespace-nowrap cursor-default drop-shadow-md transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Anakta Raffaell
        </h1>

        <p
          className={`mt-4 text-xl ${
            darkMode ? "text-blue-100" : "text-blue-900"
          } font-light transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          AI & Computer Vision Engineer
        </p>

        {/* Technology Tags */}
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
                    ? "bg-gray-800 text-gray-300 border border-gray-700"
                    : "bg-white text-gray-800 border border-gray-200"
                } rounded-full font-mono whitespace-nowrap flex items-center gap-2 shadow-sm`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    tech.category === "Frontend"
                      ? "bg-amber-400"
                      : tech.category === "Backend"
                      ? "bg-emerald-400"
                      : tech.category === "Data"
                      ? "bg-blue-400"
                      : tech.category === "AI/ML"
                      ? "bg-purple-400"
                      : tech.category === "Deployment"
                      ? "bg-red-400"
                      : "bg-gray-400"
                  }`}
                ></span>
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className={`hidden w-screen h-px md:block ${
            darkMode
              ? "bg-gradient-to-r from-transparent via-gray-600 to-transparent"
              : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          } transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Bio Section */}
        <div
          className={`my-12 text-center max-w-xl px-6 transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className={`text-sm sm:text-base ${
              darkMode ? "text-gray-300" : "text-gray-700"
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
                  ? "text-blue-300 hover:text-blue-200"
                  : "text-blue-600 hover:text-blue-800"
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
          <h3
            className={`text-xl font-medium mb-4 text-center ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Featured Projects
          </h3>

          <div className="relative w-full" style={{ minHeight: "300px" }}>
            {featuredProject.map((project, idx) => (
              <div
                key={idx}
                className={`absolute top-0 left-0 w-full transition-opacity duration-700 ease-in-out ${
                  idx === current
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div
                  className={`rounded-lg overflow-hidden ${
                    darkMode 
                      ? "bg-gray-800/90 border border-gray-700" 
                      : "bg-white/90 border border-gray-200"
                  } p-4 sm:p-6 flex flex-col sm:flex-row gap-6 backdrop-blur-sm shadow-lg`}
                >
                  <div className="aspect-video w-full sm:w-1/2 overflow-hidden rounded-md bg-gray-900/30 flex items-center justify-center">
                    <img
                      src={project.image || "/images/Distracted.jpg"}
                      alt={`${project.title} Screenshot`}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h4
                      className={`text-lg font-medium ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      } mb-2`}
                    >
                      {project.title}
                    </h4>
                    <p
                      className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
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
                                ? 'text-blue-300 hover:text-blue-200'
                                : 'text-blue-600 hover:text-blue-800'
                            } transition-colors`}
                          >
                            <Github size={14} /> View Code
                          </Link>
                          <span
                            className={`text-xs ${
                              darkMode ? 'text-gray-500' : 'text-gray-400'
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
                              ? 'text-blue-300 hover:text-blue-200'
                              : 'text-blue-600 hover:text-blue-800'
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

        {/* Project & Resume Links */}
        <div
          className={`flex gap-4 mb-16 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/projects"
            className={`group relative flex items-center justify-center rounded-full overflow-hidden ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } px-6 py-2.5 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${
              darkMode ? "focus:ring-blue-400" : "focus:ring-blue-300"
            } focus:ring-offset-2`}
          >
            <span className="relative z-10">Explore My Projects</span>
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span
                className={`absolute inset-0 -translate-x-full rounded-full ${
                  darkMode ? "bg-blue-400/20" : "bg-blue-700/20"
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
                ? "bg-transparent text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500"
                : "bg-transparent text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400"
            } px-6 py-2.5 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${
              darkMode ? "focus:ring-gray-500/50" : "focus:ring-gray-400/50"
            } focus:ring-offset-2`}
          >
            <FileText size={16} />
            <span>View Resume</span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      {scrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
          <ChevronDown
            size={20}
            className={darkMode ? "text-gray-400" : "text-gray-600"}
          />
        </div>
      )}

      {/* Footer */}
      <footer
        className={`w-full py-6 mt-auto ${
          darkMode ? "text-gray-500" : "text-gray-500"
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
        
        @media (prefers-reduced-motion) {
          .animate-marquee {
            animation: none;
          }
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