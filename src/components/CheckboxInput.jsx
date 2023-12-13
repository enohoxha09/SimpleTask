

const CheckboxInput = ({ field, value, onChange }) => {
    return (
      <div className="checkbox-input-container">
        <label className="checkbox-input-label">
          <input type="checkbox" checked={value} onChange={(e) => onChange(field.name, e.target.checked)} />
          {field.label}
        </label>
      </div>
    );
  }


  export default CheckboxInput;