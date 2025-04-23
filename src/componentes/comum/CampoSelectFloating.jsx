'use client';
import { Form } from 'react-bootstrap';

export default function CampoSelectFloating({ label, value, onChange, children }) {
  return (
    <Form.Floating className="mb-3">
      <select
        id={label}
        className="form-control"
        value={value}
        onChange={onChange}
        style={{ height: '3.5rem', padding: '1rem' }}
      >
        {children}
      </select>
      <Form.Label htmlFor={label}>{label}</Form.Label>
    </Form.Floating>
  );
}