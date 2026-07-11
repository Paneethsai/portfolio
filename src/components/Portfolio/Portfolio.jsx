import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { FiMail as Mail, FiEdit3 as Edit3, FiShare2 as Share2, FiCopy as Copy, FiLink as Link } from 'react-icons/fi';
import { FaGithub as Github, FaLinkedin as Linkedin, FaInstagram as Instagram } from 'react-icons/fa';
import { Tilt } from 'react-tilt';

// 3D Background Component
function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}

// Main Portfolio Component
export default function Portfolio({ content, onEdit }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const themeColorObj = {
    Purple: '#8B5CF6',
    Cyan: '#06B6D4',
    Pink: '#EC4899',
    Orange: '#F97316',
    Green: '#10B981',
    Blue: '#3B82F6',
    Red: '#EF4444',
    Yellow: '#EAB308',
    Teal: '#14B8A6',
    Indigo: '#6366F1',
    Rose: '#F43F5E'
  };
  const mainColor = themeColorObj[content.publishSettings.themeColor] || '#8B5CF6';

  const defaultOptions = {
    reverse: false,
    max: 15,
    perspective: 1000,
    scale: 1.05,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  const copyLink = () => {
    const url = `https://${content.publishSettings.urlSlug}.netlify.app`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const formatUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <div className="relative min-h-screen selection:bg-white/20">
      <div className="fixed inset-0 mesh-bg z-0 pointer-events-none"></div>
      <div className="fixed inset-0 bg-black/80 z-0 pointer-events-none backdrop-blur-[2px]"></div>
      <div className="fixed inset-0 grid-overlay z-0 pointer-events-none"></div>
      <Background3D />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-theme-purple to-theme-cyan" style={{ backgroundImage: `linear-gradient(to right, ${mainColor}, #fff)` }}>
          {content.personalInfo.fullName.split(' ')[0]}
        </div>
        <div className="flex gap-6">
          <button onClick={onEdit} className="flex items-center gap-2 text-sm hover:text-white text-gray-300 transition-colors cursor-pointer">
            <Edit3 size={16} /> Edit Profile
          </button>
          <button onClick={copyLink} className="flex items-center gap-2 text-sm hover:text-white text-gray-300 transition-colors cursor-pointer">
            <Share2 size={16} /> Share Link
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-32">
        
        {/* HERO SECTION */}
        <section className="min-h-[85vh] flex flex-col md:flex-row justify-center items-center text-center md:text-left gap-16">
          {content.aboutMe.profilePhoto && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-56 h-56 md:w-72 md:h-72 flex-shrink-0"
            >
              <div className="absolute inset-0 rounded-full blur-[80px] opacity-20 mix-blend-screen" style={{ backgroundColor: mainColor }}></div>
              <img 
                src={content.aboutMe.profilePhoto} 
                alt="Profile" 
                className="absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl border border-white/5 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          )}

          <div className="flex-1 flex flex-col items-center md:items-start z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-[5.5rem] font-bold mb-6 tracking-tighter leading-tight text-white"
            >
              Hi, I'm <br className="hidden md:block" />
              <span style={{ color: mainColor }}>{content.personalInfo.fullName}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10 font-light tracking-wide leading-relaxed"
            >
              {content.personalInfo.yearOfStudy} Student at <span className="font-medium text-gray-200">{content.personalInfo.collegeName}</span> <br/>
              studying <span className="font-medium text-gray-200">{content.personalInfo.course}</span>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex gap-4 flex-wrap justify-center md:justify-start"
            >
              <a href="#projects" className="px-8 py-3.5 rounded-full font-medium text-sm md:text-base text-white shadow-lg hover:shadow-xl transition-all" style={{ backgroundColor: mainColor }}>
                View Projects
              </a>
              <a href="#about" className="px-8 py-3.5 rounded-full font-medium text-sm md:text-base bg-white/[0.03] border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md text-gray-300">
                More About Me
              </a>
            </motion.div>
          </div>
        </section>

        {/* ABOUT & ACADEMIC SECTION */}
        <section id="about" className="scroll-mt-32 space-y-12">
          <Tilt options={defaultOptions}>
            <div className="glass-card p-8 md:p-12 relative overflow-hidden neon-border">
              <div className="absolute top-0 right-0 w-64 h-64 bg-theme-purple/20 blur-[100px] rounded-full pointer-events-none"></div>
              <h2 className="text-5xl font-bold mb-6 flex items-center gap-4 tracking-tight">
                <span className="w-12 h-1.5 bg-gradient-to-r from-theme-purple to-theme-pink inline-block rounded-full"></span>
                About Me
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6 font-light tracking-wide">{content.aboutMe.bio}</p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div className="bg-white/5 p-6 rounded-xl border border-white/5 transition-all">
                  <h3 className="text-lg font-medium text-white mb-2">🎯 Career Goal</h3>
                  <p className="text-gray-300">{content.aboutMe.careerGoal}</p>
                </div>
                {content.aboutMe.achievements && (
                  <div className="bg-white/5 p-6 rounded-xl border border-white/5 transition-all">
                    <h3 className="text-lg font-medium text-white mb-2">🏆 Key Highlights</h3>
                    <p className="text-gray-300 whitespace-pre-line">{content.aboutMe.achievements}</p>
                  </div>
                )}
              </div>
            </div>
          </Tilt>

          {/* Academic Journey */}
          {content.academicJourney && (
            <Tilt options={defaultOptions}>
              <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-theme-cyan/20 blur-[100px] rounded-full pointer-events-none"></div>
                <h2 className="text-5xl font-bold mb-8 flex items-center gap-4 tracking-tight">
                  <span className="w-12 h-1.5 bg-gradient-to-r from-theme-cyan to-theme-blue inline-block rounded-full"></span>
                  Academic Journey
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {content.academicJourney.achievements && (
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                      <h3 className="text-xl font-bold text-theme-blue mb-4">Achievements</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {content.academicJourney.achievements.split('\n').map((item, i) => item.trim() && <li key={i}>{item.trim()}</li>)}
                      </ul>
                    </div>
                  )}
                  {content.academicJourney.coursework && (
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                      <h3 className="text-xl font-bold text-theme-green mb-4">Coursework</h3>
                      <div className="flex flex-wrap gap-2">
                        {content.academicJourney.coursework.split(',').map((item, i) => item.trim() && (
                          <span key={i} className="text-xs bg-theme-green/20 text-theme-green px-3 py-1.5 rounded-full border border-theme-green/30">{item.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {content.academicJourney.activities && (
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                      <h3 className="text-xl font-bold text-theme-orange mb-4">Extracurriculars</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {content.academicJourney.activities.split('\n').map((item, i) => item.trim() && <li key={i}>{item.trim()}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Tilt>
          )}
        </section>

        {/* SKILLS & INTERESTS SECTION */}
        <section id="skills" className="scroll-mt-32 space-y-16">
          <div>
            <h2 className="text-5xl font-bold mb-12 text-center text-white tracking-tight">Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {content.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Tilt options={{ ...defaultOptions, scale: 1.05 }}>
                    <div className="glass-card p-6 flex flex-col items-center justify-center h-32 text-center border border-white/5 hover:border-white/20 transition-all">
                      <span className="font-medium text-lg text-white">{skill.name}</span>
                      <span className="text-xs text-gray-400 mt-2">{skill.level}</span>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>

          {content.interests && content.interests.length > 0 && (
            <div>
              <h2 className="text-3xl font-semibold mb-12 text-center text-white">Other Interests</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {content.interests.map((interest, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors h-28 relative overflow-hidden group">
                      <span className="font-medium text-base text-gray-200 relative z-10">{interest.name}</span>
                      <span className="text-xs text-gray-400 mt-1 relative z-10">{interest.level}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-32">
          <h2 className="text-5xl font-bold mb-12 text-center tracking-tight text-white">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <Tilt options={defaultOptions} className="h-full">
                  <div className="glass-card p-6 h-full flex flex-col relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-theme-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h3 className="text-2xl font-bold mb-3 text-white z-10">{proj.name}</h3>
                    <p className="text-gray-400 mb-6 flex-1 z-10">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6 z-10">
                      {proj.techStack.split(',').map((tech, i) => tech.trim() && (
                        <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-md text-gray-300">{tech.trim()}</span>
                      ))}
                    </div>
                    {proj.link && (
                      <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-theme-orange hover:text-white transition-colors z-10 w-max">
                        <Link size={16} /> View Live Project
                      </a>
                    )}
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT & FOOTER SECTION */}
        <section className="scroll-mt-32 border-t border-white/[0.05] pt-24">
          <div className="glass-card p-12 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
            <p className="text-gray-400 mb-10 text-lg">Currently based in {content.personalInfo.city}. Always open to discuss new opportunities or collaborations.</p>
            
            <div className="flex justify-center gap-6 mb-12">
              {content.socialLinks.github && (
                <a href={formatUrl(content.socialLinks.github)} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all box-glow text-gray-300 hover:text-white">
                  <Github size={24} />
                </a>
              )}
              {content.socialLinks.linkedin && (
                <a href={formatUrl(content.socialLinks.linkedin)} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#0A66C2] hover:scale-110 transition-all box-glow text-gray-300 hover:text-white">
                  <Linkedin size={24} />
                </a>
              )}
              {content.socialLinks.instagram && (
                <a href={formatUrl(content.socialLinks.instagram)} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:scale-110 transition-all box-glow text-gray-300 hover:text-white">
                  <Instagram size={24} />
                </a>
              )}
              {content.socialLinks.email && (
                <a href={`mailto:${content.socialLinks.email}`} className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center hover:bg-theme-green hover:scale-110 transition-all box-glow text-gray-300 hover:text-white">
                  <Mail size={24} />
                </a>
              )}
            </div>
          </div>
        </section>

      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-md py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {content.personalInfo.fullName}. Built with React, Three.js & Tailwind.</p>
      </footer>
    </div>
  );
}
