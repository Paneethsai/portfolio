export default function StepAcademic({ data, update }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Academic Achievements</label>
        <textarea
          value={data.achievements || ''}
          onChange={(e) => update('achievements', e.target.value)}
          placeholder="e.g. Dean's List 2024&#10;Google Tech Scholar"
          rows="3"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-theme-purple focus:ring-1 focus:ring-theme-purple transition-all resize-none"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">List one per line.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Relevant Coursework</label>
        <textarea
          value={data.coursework || ''}
          onChange={(e) => update('coursework', e.target.value)}
          placeholder="e.g. Data Structures, Machine Learning, Web Development"
          rows="3"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-theme-purple focus:ring-1 focus:ring-theme-purple transition-all resize-none"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">Separate with commas.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Extracurricular Activities</label>
        <textarea
          value={data.activities || ''}
          onChange={(e) => update('activities', e.target.value)}
          placeholder="e.g. President of Coding Club&#10;Volunteer at local shelter"
          rows="3"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-theme-purple focus:ring-1 focus:ring-theme-purple transition-all resize-none"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">List one per line.</p>
      </div>
    </div>
  );
}
