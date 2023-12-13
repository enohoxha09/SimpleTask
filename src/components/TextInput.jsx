const TextInput = ({ field, value, onChange }) => {
    return (
      <div className="text-input-container">
        <label  className="text-input-label" >{field.label}</label>
        <input className="text-input-field"  type="text" value={value} onChange={(e) => onChange(field.name, e.target.value)}  />
      </div>
    );
  }

export default TextInput;