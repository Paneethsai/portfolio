const InputField = ({ label, field, placeholder, data, update, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      value={data[field]}
      onChange={(e) => update(field, e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-theme-cyan focus:ring-1 focus:ring-theme-cyan transition-all"
    />
  </div>
);

export default function StepPersonalInfo({ data, update }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField label="Full Name" field="fullName" placeholder="e.g. Paneeth" data={data} update={update} />
      <InputField label="Age" field="age" placeholder="e.g. 21" type="number" data={data} update={update} />
      <InputField label="College / School Name" field="collegeName" placeholder="e.g. MIT" data={data} update={update} />
      <InputField label="Course / Degree" field="course" placeholder="e.g. B.Tech Computer Science" data={data} update={update} />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">Year of Study</label>
        <select
          value={data.yearOfStudy}
          onChange={(e) => update('yearOfStudy', e.target.value)}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-theme-cyan focus:ring-1 focus:ring-theme-cyan transition-all"
        >
          <option value="1st">1st Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
          <option value="4th">4th Year</option>
          <option value="Graduated">Graduated</option>
        </select>
      </div>

      <InputField label="City" field="city" placeholder="e.g. New York" data={data} update={update} />
    </div>
  );
}
