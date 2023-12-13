const DropdownInput = ({ field, value, onChange }) => {
    return (
      <div className="dropdown-input-container">
        <label className="dropdown-input-label">{field.label}</label>
        <select value={value} onChange={(e) => onChange(field.name, e.target.value)}>
          {field.picklistValues.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
export default DropdownInput;