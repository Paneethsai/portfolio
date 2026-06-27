import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code, FolderGit2, FileText, Link, Rocket, GraduationCap, Heart } from 'lucide-react';
import StepPersonalInfo from './StepPersonalInfo';
import StepAcademic from './StepAcademic';
import StepSkills from './StepSkills';
import StepInterests from './StepInterests';
import StepProjects from './StepProjects';
import StepAbout from './StepAbout';
import StepSocial from './StepSocial';
import StepPublish from './StepPublish';

const steps = [
  { id: 1, title: 'Personal Info', icon: User, color: 'from-theme-purple to-theme-cyan' },
  { id: 2, title: 'Academic', icon: GraduationCap, color: 'from-theme-cyan to-theme-blue' },
  { id: 3, title: 'Skills', icon: Code, color: 'from-theme-blue to-theme-green' },
  { id: 4, title: 'Interests', icon: Heart, color: 'from-theme-green to-theme-orange' },
  { id: 5, title: 'Projects', icon: FolderGit2, color: 'from-theme-orange to-theme-pink' },
  { id: 6, title: 'About Me', icon: FileText, color: 'from-theme-pink to-theme-rose' },
  { id: 7, title: 'Social Links', icon: Link, color: 'from-theme-rose to-theme-purple' },
  { id: 8, title: 'Publish', icon: Rocket, color: 'from-theme-purple to-theme-orange' }
];

export default function Wizard({ initialData, onPublish }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState(initialData);

  const updateData = (section, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateArrayData = (section, value) => {
    setData(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const nextStep = () => setCurrentStep(p => Math.min(p + 1, steps.length));
  const prevStep = () => setCurrentStep(p => Math.max(p - 1, 1));

  const currentTheme = steps[currentStep - 1].color;

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 aurora-bg opacity-30"></div>
      
      {/* Floating particles (simplified for wizard) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

      <div className="relative w-full max-w-4xl z-10">
        {/* Progress Bar */}
        <div className="mb-8 flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0"></div>
          <div 
            className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full z-0 transition-all duration-500 bg-gradient-to-r ${currentTheme}`}
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isPast = step.id < currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive || isPast ? `bg-gradient-to-r ${step.color} shadow-lg box-glow` : 'bg-white/10 backdrop-blur-md'}`}>
                  <Icon size={18} className={isActive || isPast ? 'text-white' : 'text-gray-400'} />
                </div>
                <span className={`absolute -bottom-6 text-[10px] md:text-xs whitespace-nowrap font-medium transition-colors ${isActive ? 'text-white text-glow' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Card Content with Flip Animation */}
        <div className="glass-card mt-12 p-8 min-h-[500px] flex flex-col relative">
          <div className="absolute -inset-0.5 rounded-2xl neon-border opacity-50 pointer-events-none"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col"
            >
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {steps[currentStep - 1].title}
              </h2>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {currentStep === 1 && <StepPersonalInfo data={data.personalInfo} update={(f, v) => updateData('personalInfo', f, v)} />}
                {currentStep === 2 && <StepAcademic data={data.academicJourney || {}} update={(f, v) => updateData('academicJourney', f, v)} />}
                {currentStep === 3 && <StepSkills data={data.skills} update={(v) => updateArrayData('skills', v)} />}
                {currentStep === 4 && <StepInterests data={data.interests || []} update={(v) => updateArrayData('interests', v)} />}
                {currentStep === 5 && <StepProjects data={data.projects} update={(v) => updateArrayData('projects', v)} />}
                {currentStep === 6 && <StepAbout data={data.aboutMe} update={(f, v) => updateData('aboutMe', f, v)} />}
                {currentStep === 7 && <StepSocial data={data.socialLinks} update={(f, v) => updateData('socialLinks', f, v)} />}
                {currentStep === 8 && <StepPublish data={data} update={(f, v) => updateData('publishSettings', f, v)} onPublish={() => onPublish(data)} />}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-full font-medium transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-white/10 hover:bg-white/20'}`}
            >
              Back
            </button>
            {currentStep < 8 && (
              <button
                onClick={nextStep}
                className={`px-8 py-2 rounded-full font-bold text-white bg-gradient-to-r ${currentTheme} hover:shadow-lg hover:scale-105 transition-all box-glow`}
              >
                Next Step
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
