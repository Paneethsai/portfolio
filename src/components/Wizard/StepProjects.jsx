import { useState } from 'react';
import { Plus, X, Link as LinkIcon } from 'lucide-react';

export default function StepProjects({ data, update }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', link: '', techStack: '' });

  const addProject = () => {
    if (!newProject.name.trim()) return;
    update([...data, newProject]);
    setNewProject({ name: '', description: '', link: '', techStack: '' });
    setIsAdding(false);
  };

  const removeProject = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    update(newData);
  };

  return (
    <div>
      {!isAdding ? (
        <div className="text-center">
          <button
            onClick={() => setIsAdding(true)}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl border border-dashed border-white/30 flex items-center justify-center gap-2 mx-auto w-full max-w-md transition-colors"
          >
            <Plus size={20} /> Add New Project
          </button>
        </div>
      ) : (
        <div className="bg-white/5 p-6 rounded-xl border border-theme-orange/50 mb-6">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-theme-orange focus:outline-none"
            />
            <textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              rows="3"
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-theme-orange focus:outline-none resize-none"
            ></textarea>
            <input
              type="text"
              placeholder="Link (e.g. GitHub or Live URL)"
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-theme-orange focus:outline-none"
            />
            <input
              type="text"
              placeholder="Tech Stack (comma separated, e.g. React, Node, MongoDB)"
              value={newProject.techStack}
              onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-theme-orange focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
            <button onClick={addProject} className="bg-theme-orange hover:bg-theme-orange/80 px-6 py-2 rounded-lg font-bold">Save Project</button>
          </div>
        </div>
      )}

      <div className="space-y-4 mt-6">
        {data.map((proj, index) => (
          <div key={index} className="bg-white/5 p-5 rounded-xl border border-white/10 relative group">
            <button
              onClick={() => removeProject(index)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-theme-orange mb-2">{proj.name}</h3>
            <p className="text-gray-300 text-sm mb-3">{proj.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {proj.techStack.split(',').map((tech, i) => tech.trim() && (
                <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-md">{tech.trim()}</span>
              ))}
            </div>
            {proj.link && (
              <a href={proj.link} target="_blank" rel="noreferrer" className="text-theme-cyan text-sm flex items-center gap-1 hover:underline">
                <LinkIcon size={14} /> View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
