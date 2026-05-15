export default function ResumeInput({ value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Paste Your Resume
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your full resume here... We'll scan it for ATS compatibility."
        className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none"
      />
      <p className="text-xs text-gray-500 mt-2">
        💡 Tip: Use bullet points, include dates, and add your contact info for better scores!
      </p>
    </div>
  );
}
