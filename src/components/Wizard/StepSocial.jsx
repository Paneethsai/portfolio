import { FiMail as Mail } from 'react-icons/fi';
import { FaGithub as Github, FaLinkedin as Linkedin, FaInstagram as Instagram } from 'react-icons/fa';

const SocialInput = ({ icon: Icon, label, field, placeholder, data, update }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
      <Icon size={16} /> {label}
    </label>
    <input
      type="text"
      value={data[field]}
      onChange={(e) => update(field, e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-theme-purple focus:ring-1 focus:ring-theme-purple transition-all"
    />
  </div>
);

export default function StepSocial({ data, update }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SocialInput icon={Linkedin} label="LinkedIn URL" field="linkedin" placeholder="https://linkedin.com/in/username" data={data} update={update} />
      <SocialInput icon={Github} label="GitHub URL" field="github" placeholder="https://github.com/username" data={data} update={update} />
      <SocialInput icon={Instagram} label="Instagram Handle" field="instagram" placeholder="@username" data={data} update={update} />
      <SocialInput icon={Mail} label="Email Address" field="email" placeholder="hello@example.com" data={data} update={update} />
    </div>
  );
}
