'use client';
import { Form } from 'react-bootstrap';

export default function CampoEntradaFloating({ label, type='text', value, onChange, ...props }) {
  return (
    <Form.Floating className="mb-3">
      <Form.Control
        id={label}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        {...props}
      />
      <Form.Label htmlFor={label}>{label}</Form.Label>
    </Form.Floating>
  );
}