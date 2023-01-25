interface SubmitFormProps {
	label?: string;
	type?: "submit" | "reset" | "button";
}
export default function SubmitForm({
	label = "Envoyer",
	type = "button",
}: SubmitFormProps) {
	return (
		<div className="form-field">
			<button type={type}>{label}</button>
		</div>
	);
}
