import { roles } from "../utils/keywordBanks.js";
export default function RoleSelector({ selectedRole, onChange }) {
  return (
    <fieldset className="role-selector">
      <legend className="step-label">
        <span>01</span> PICK YOUR MODE
      </legend>
      <div className="grid grid-cols-3 gap-3 mode-grid">
        {roles.map((role) => (
          <label
            title={role.name}
            key={role.name}
            className={`mode ${selectedRole === role.name ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="role"
              value={role.name}
              checked={selectedRole === role.name}
              onChange={() => onChange(role.name)}
              aria-label={role.name}
            />
            <span className="mode-top" aria-hidden="true">
              <span>{role.icon}</span>
              <span className="selection-mark">
                {selectedRole === role.name ? "●" : "○"}
              </span>
            </span>
            <strong>{role.short}</strong>
            <span className="mode-caption">{role.subtitle}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
