import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckboxInput from '../components/CheckboxInput';
import DropdownInput from '../components/DropdownInput';
import TextInput from '../components/TextInput';
import '../Styles/DynamicForm.css';
import '../Styles/CheckboxInput.css';
import '../Styles/DropdownInput.css';
import '../Styles/TextInput.css';

function DynamicForm({ sessionToken, userId }) {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchFormStructure = async () => {
      try {
        const response = await axios.post(
          'https://demo.bspvision.com/modules/Mobile/api.php',
          {
            _operation: 'describe',
            _session: sessionToken,
            module: 'Properties',
          }
        );
        setFormFields(
          response.data.result.describe.fields.filter(field => field.editable)
        );
      } catch (error) {
        console.error('Error fetching form structure', error);
      }
    };

    fetchFormStructure();
  }, [sessionToken]);

  useEffect(() => {
    console.log('Session Token in DynamicForm:', sessionToken);
  }, [sessionToken]);

  const handleChange = (fieldName, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const preparedData = {
      ...formData,
      owner: '12x9485',
      modified_by: userId,
      assigned_user_id: `19x${userId}`,
    };
    console.log(preparedData);
    const valuesString = JSON.stringify(preparedData);
    console.log(valuesString);
    const postFormData = new FormData();
    postFormData.append('_operation', 'saveRecord');
    postFormData.append('_session', sessionToken);
    postFormData.append('module', 'Properties');
    postFormData.append('values', valuesString);

    try {
      const response = await axios.post(
        'https://demo.bspvision.com/modules/Mobile/api.php',
        postFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.success) {
        console.log('Record saved successfully', response.data);
        setErrorMessage('');
      } else {
        console.error('Error response from API:', response.data.error);
        setErrorMessage(
          response.data.error.message ||
            'An error occurred while saving the record.'
        );
      }
    } catch (error) {
      console.error('Exception while saving record:', error);
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
  };

  const renderField = field => {
    const fieldValue = formData[field.name] || '';

    switch (field.type.name) {
      case 'picklist':
        return (
          <DropdownInput
            field={{
              ...field,
              picklistValues: field.type.picklistValues,
            }}
            value={fieldValue}
            onChange={handleChange}
          />
        );
      case 'boolean':
        return (
          <CheckboxInput
            field={field}
            value={!!fieldValue}
            onChange={handleChange}
          />
        );
      case 'string':
      case 'number':
      default:
        return (
          <TextInput field={field} value={fieldValue} onChange={handleChange} />
        );
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [sessionToken, formFields]);
  console.log(formFields);
  return (
    <form onSubmit={handleSubmit} className='form-container'>
      {formFields
        .filter(field => field.editable)
        .map(field => (
          <div key={field.name} className='field-container'>
            {renderField(field)}
          </div>
        ))}

      {errorMessage && <div className='error-message'>{errorMessage}</div>}

      <button className='submit-button' type='submit'>
        Submit
      </button>
    </form>
  );
}

export default DynamicForm;