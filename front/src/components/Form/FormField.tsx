interface FormFieldProps {
  name: string;
  type?: string;
  label: string;
  placeholder: string;
}

export default function FormField({
  name,
  type = "text",
  label,
  placeholder,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input type={type} placeholder={placeholder} name={name} id={name} />
    </div>
  );
}
