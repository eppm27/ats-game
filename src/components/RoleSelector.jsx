export default function RoleSelector({ selectedRole, onChange }) {
  const roles = [
    'Software Engineer Intern',
    'Data Analyst Intern',
    'Product / Tech Consultant'
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        What role are you applying for?
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => onChange(role)}
            className={`p-3 rounded-lg font-medium transition transform hover:scale-105 ${
              selectedRole === role
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}
