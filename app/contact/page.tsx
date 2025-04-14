"use client";
import { Github, Linkedin, Mail, Copy, CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { motion } from "framer-motion";

const socials = [
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/anaktaraffaell",
    label: "LinkedIn",
    handle: "Anakta Raffaell",
    buttonText: "Visit LinkedIn",
    buttonIcon: <ExternalLink size={16} />
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:anaktaraffaelltambunan@gmail.com",
    label: "Email",
    handle: "anaktaraffaelltambunan@gmail.com",
    buttonText: "Send Email",
    buttonIcon: <Mail size={16} />
  },
  {
    icon: <Github size={20} />,
    href: "https://github.com/R4ffaell",
    label: "GitHub",
    handle: "R4ffaell",
    buttonText: "View GitHub",
    buttonIcon: <ExternalLink size={16} />
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>, text: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {socials.map((social, i) => {
            const isEmail = social.label === "Email";

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="transition-transform"
                onMouseEnter={() => isEmail && setEmailHovered(true)}
                onMouseLeave={() => isEmail && setEmailHovered(false)}
              >
                <Card className="relative bg-white/5 backdrop-blur-md hover:shadow-xl hover:border-zinc-400 border border-zinc-700 group transition duration-300 group-hover:ring-2 group-hover:ring-orange-500/40">
                  <div className="p-6 flex flex-col items-center justify-center relative">
                    <span className="relative flex items-center justify-center w-12 h-12 text-sm border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                      {social.icon}
                    </span>

                    <span className="mt-2 text-sm text-zinc-400 group-hover:text-zinc-200">
                      {social.label}
                    </span>

                    {isEmail ? (
                      <div className="text-lg font-medium text-zinc-200 group-hover:text-white font-display mt-4 mb-4 text-center">
                        {emailHovered ? (
                          <span className="overflow-x-auto whitespace-nowrap max-w-full block px-2">
                            {social.handle}
                          </span>
                        ) : (
                          <span className="inline-block text-zinc-200 group-hover:text-white">
                            anaktaraffaell...
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="mt-4 mb-4 text-lg font-medium text-zinc-200 group-hover:text-white font-display">
                        {social.handle}
                      </span>
                    )}

                    <Link
                      href={social.href}
                      target={!isEmail ? "_blank" : "_self"}
                      className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md text-sm font-medium transition-colors w-full"
                    >
                      {social.buttonIcon}
                      {social.buttonText}
                    </Link>

                    {isEmail && (
                      <div className="relative">
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={copied || emailHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                          transition={{ duration: 0.3 }}
                          className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-zinc-800 text-white px-2 py-1 rounded-md shadow-lg"
                        >
                          {copied ? "Copied!" : "Click to copy!"}
                        </motion.div>
                        <button
                          onClick={(e) => handleCopy(e, social.handle)}
                          className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-md text-sm transition-colors w-full"
                        >
                          {copied ? (
                            <>
                              <CheckCircle size={16} className="text-green-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              <span>Copy Email</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
