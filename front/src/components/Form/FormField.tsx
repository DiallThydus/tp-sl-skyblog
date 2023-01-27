interface FormFieldProps {
  name: string;
  type?: string;
  textarea?: boolean;
  label: string;
  placeholder: string;
  defaultValue?: string;
}

export default function FormField({
  name,
  type = "text",
  textarea = false,
  label,
  placeholder,
  defaultValue = "",
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      {!textarea ? (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={name}
          defaultValue={defaultValue}
        />
      ) : (
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      )}
    </div>
  );
}
