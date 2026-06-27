import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function StepInterests({ data, update }) {
  const [newInterest, setNewInterest] = useState("");
  const [newLevel, setNewLevel] = useState("Hobby");

  const addInterest = () => {
    if (!newInterest.trim()) return;
    update([...(data || []), { name: newInterest, level: newLevel, type: 'interest' }]);
    setNewInterest("");
  };

  const removeInterest = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    update(newData);
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="e.g. Photography, Basketball, UI Design"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-theme-green focus:ring-1 focus:ring-theme-green"
          onKeyDown={(e) => e.key === 'Enter' && addInterest()}
        />
        <select
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value)}
          className="w-40 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-theme-green"
        >
          <option value="Hobby">Hobby</option>
          <option value="Enthusiast">Enthusiast</option>
          <option value="Varsity">Varsity</option>
          <option value="Expert">Expert</option>
        </select>
        <button
          onClick={addInterest}
          className="bg-theme-green hover:bg-theme-green/80 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {(!data || data.length === 0) && <p className="text-gray-500 italic text-center py-4">No interests added yet. Add your first one above!</p>}
        {data && data.map((interest, index) => (
          <div key={index} className="flex items-center justify-between bg-white/5 p-4 rounded-lg border border-white/10 group hover:border-theme-green/50 transition-colors">
            <div>
              <span className="font-bold text-lg">{interest.name}</span>
              <span className="ml-4 text-sm text-theme-green">{interest.level}</span>
            </div>
            <button onClick={() => removeInterest(index)} className="text-gray-500 hover:text-red-500 transition-colors">
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
