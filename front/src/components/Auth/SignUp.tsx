import { FormEvent } from "react";
import { Link } from "react-router-dom";

import FormField from "../Form/FormField";
import SubmitForm from "../Form/SubmitForm";

import "./auth.css";

export default function SignUp() {
	const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.target as HTMLFormElement);
		console.log(form);
	};
	return (
		<form className="form-auth" onSubmit={handleSubmitForm}>
			<h2>Inscription</h2>
			<FormField name="email" label="Email" placeholder="Votre email" />
			<FormField
				name="username"
				label="Non d'utilisateur"
				placeholder="Votre nom d'utilisateur"
			/>
			<FormField
				name="password"
				label="Mot de passe"
				placeholder="Votre mot de passes"
			/>
			<FormField
				name="confirmPassword"
				label="Confirmer mot de passe"
				placeholder="Confirmation du mot de passe"
			/>
			<SubmitForm />
			<p>
				Vous n'avez pas de compte ?{" "}
				<Link to="/signup">Inscrivez-vous</Link> !
			</p>
		</form>
	);
}
