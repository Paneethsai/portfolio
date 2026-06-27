export default function StepAbout({ data, update }) {
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        update('profilePhoto', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Profile Photo</label>
        <div className="flex items-center gap-4">
          {data.profilePhoto && (
            <img src={data.profilePhoto} alt="Preview" className="w-16 h-16 rounded-full object-cover border border-theme-pink" />
          )}
          <label className="cursor-pointer bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors">
            <span>Select Photo from Device</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">Or paste a URL below:</p>
        <input
          type="text"
          value={data.profilePhoto || ''}
          onChange={(e) => update('profilePhoto', e.target.value)}
          placeholder="https://example.com/my-photo.jpg"
          className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-theme-pink focus:ring-1 focus:ring-theme-pink transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Short Bio</label>
        <textarea
          value={data.bio}
          onChange={(e) => update('bio', e.target.value)}
          placeholder="I am a passionate developer building..."
          rows="4"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-theme-pink focus:ring-1 focus:ring-theme-pink transition-all resize-none"
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Career Goal</label>
        <input
          type="text"
          value={data.careerGoal}
          onChange={(e) => update('careerGoal', e.target.value)}
          placeholder="e.g. To become a Full Stack Engineer at a top tech company"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-theme-pink focus:ring-1 focus:ring-theme-pink transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Key Achievements (Optional)</label>
        <textarea
          value={data.achievements}
          onChange={(e) => update('achievements', e.target.value)}
          placeholder="e.g. Won 1st place in Hackathon 2023..."
          rows="3"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-theme-pink focus:ring-1 focus:ring-theme-pink transition-all resize-none"
        ></textarea>
      </div>
    </div>
  );
}
