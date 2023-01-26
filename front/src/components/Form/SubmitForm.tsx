interface SubmitFormProps {
  label?: string;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
}
export default function SubmitForm({
  label = "Send",
  type = "submit",
  loading = false,
}: SubmitFormProps) {
  return (
    <div className="form-field">
      <button type={type} disabled={loading}>
        {label}
      </button>
    </div>
  );
}
