interface FormFieldProps {
	name: string;
	label: string;
	placeholder: string;
}

export default function FormField({
	name,
	label,
	placeholder,
}: FormFieldProps) {
	return (
		<div className="form-field">
			<label htmlFor={name}>{label}</label>
			<input
				type="text"
				placeholder={placeholder}
				name={name}
				id={name}
			/>
		</div>
	);
}
