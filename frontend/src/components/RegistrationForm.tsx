import React, { useState, FormEvent } from 'react';
import { registerUser, RegistrationData, FieldErrors } from '../services/registrationService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../resources/css/common.css';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFieldErrors({});

    try {
      const result = await registerUser(formData);
      if (result.success) {
        // Registration succeeded – you may redirect or show a success message here.
        // For now we simply clear the form.
        setFormData({ username: '', password: '', passwordConfirm: '' });
        setSubmitted(false);
      } else if (result.errors) {
        setFieldErrors(result.errors);
      }
    } catch (error) {
      // Network or unexpected error handling
      console.error('Registration failed', error);
    }
  };

  const getFormGroupClass = (field: keyof RegistrationData) =>
    `form-group ${fieldErrors[field] ? 'has-error' : ''}`;

  return (
    <div className="container">
      <form className="form-signin" onSubmit={handleSubmit} noValidate>
        <h2 className="form-signin-heading">Create your account</h2>

        <div className={getFormGroupClass('username')}>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          {fieldErrors.username && (
            <div className="text-danger">{fieldErrors.username}</div>
          )}
        </div>

        <div className={getFormGroupClass('password')}>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {fieldErrors.password && (
            <div className="text-danger">{fieldErrors.password}</div>
          )}
        </div>

        <div className={getFormGroupClass('passwordConfirm')}>
          <input
            type="password"
            name="passwordConfirm"
            className="form-control"
            placeholder="Confirm your password"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
          {fieldErrors.passwordConfirm && (
            <div className="text-danger">{fieldErrors.passwordConfirm}</div>
          )}
        </div>

        <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={submitted}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;