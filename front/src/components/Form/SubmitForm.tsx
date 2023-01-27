import { CSSProperties } from "react";

interface SubmitFormProps {
  label?: string;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  style?: CSSProperties;
}
export default function SubmitForm({
  label = "Send",
  type = "submit",
  loading = false,
  style = {},
}: SubmitFormProps) {
  return (
    <div className="form-field">
      <button type={type} disabled={loading} style={style}>
        {label}
      </button>
    </div>
  );
}
