'use client';
import { Form } from 'react-bootstrap';

export default function CampoTextArea({ label, value, onChange }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control as="textarea" rows={3} value={value} onChange={onChange} />
    </Form.Group>
  );
}