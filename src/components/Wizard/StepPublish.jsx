import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Rocket, CheckCircle2, Loader2, Copy, ExternalLink, Share2 } from 'lucide-react';

export default function StepPublish({ data, update, onPublish }) {
  const [publishingState, setPublishingState] = useState('idle'); // idle, publishing, published
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  const colors = ["Purple", "Cyan", "Pink", "Orange", "Green", "Blue", "Red", "Yellow", "Teal", "Indigo", "Rose"];

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8B5CF6', '#06B6D4', '#EC4899', '#F97316', '#10B981']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8B5CF6', '#06B6D4', '#EC4899', '#F97316', '#10B981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handlePublishClick = () => {
    setPublishingState('publishing');
    
    const steps = [
      "Building your site...",
      "Optimizing 3D assets...",
      "Uploading files to CDN...",
      "Going live on Netlify...",
      "Done!"
    ];
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2.5; // Takes about 4 seconds
      });
      
      if (currentStep < steps.length) {
        setStatusText(steps[currentStep]);
        if (progress % 20 === 0) currentStep++;
      }
    }, 100);

    setTimeout(() => {
      setPublishingState('published');
      triggerConfetti();
      setTimeout(() => {
        onPublish(); // Trigger parent to switch to Portfolio view
      }, 3000);
    }, 4500);
  };

  if (publishingState === 'publishing') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
        <Loader2 className="w-16 h-16 animate-spin text-theme-orange mx-auto" />
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{statusText}</h3>
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-theme-purple to-theme-orange transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (publishingState === 'published') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="w-20 h-20 bg-theme-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-theme-green" />
        </div>
        <h2 className="text-3xl font-bold text-white text-glow">Successfully Published!</h2>
        <p className="text-gray-400">Your portfolio is now live. Redirecting you to it...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/5 p-6 rounded-xl border border-theme-orange/30">
        <h3 className="text-xl font-bold mb-4 text-theme-orange flex items-center gap-2">
          <Rocket size={20} /> Publish Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Website URL Slug</label>
            <div className="flex items-center">
              <input
                type="text"
                value={data.publishSettings.urlSlug}
                onChange={(e) => update('urlSlug', e.target.value)}
                placeholder="yourname"
                className="flex-1 bg-black/30 border border-white/10 rounded-l-lg px-4 py-3 text-white focus:outline-none focus:border-theme-orange"
              />
              <span className="bg-white/10 border border-l-0 border-white/10 rounded-r-lg px-4 py-3 text-gray-400">
                .netlify.app
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Website Title (SEO)</label>
            <input
              type="text"
              value={data.publishSettings.websiteTitle}
              onChange={(e) => update('websiteTitle', e.target.value)}
              placeholder="Paneeth's 3D Portfolio"
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-theme-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Primary Theme Color</label>
            <div className="flex flex-wrap gap-3">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => update('themeColor', color)}
                  className={`w-10 h-10 rounded-full transition-all ${data.publishSettings.themeColor === color ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'}`}
                  style={{ backgroundColor: `var(--theme-${color.toLowerCase()})` }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex flex-col items-center gap-4">
        <button
          onClick={handlePublishClick}
          className="relative group px-12 py-4 rounded-xl font-bold text-xl text-white overflow-hidden transition-all hover:scale-105 box-glow w-full md:w-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-theme-purple via-theme-orange to-theme-pink opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-theme-purple via-theme-orange to-theme-pink opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
          <span className="relative flex items-center justify-center gap-2">
            PREVIEW MY PORTFOLIO <Rocket size={24} />
          </span>
        </button>

        <button 
          onClick={() => {
            const configText = `export const initialContent = ${JSON.stringify(data, null, 2)};`;
            navigator.clipboard.writeText(configText);
            alert("Configuration copied! Paste this entirely over the contents of src/content.js, then tell the AI to publish!");
          }}
          className="text-gray-400 hover:text-white underline text-sm transition-colors flex items-center gap-2"
        >
          <Copy size={14} /> Export configuration to save permanently
        </button>
      </div>
    </div>
  );
}
