import { FormEvent } from "react";
import { Link } from "react-router-dom";

import FormField from "../Form/FormField";
import SubmitForm from "../Form/SubmitForm";

import "./auth.css";

export default function SignIn() {
	const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.target as HTMLFormElement);
		console.log(form);
	};
	return (
		<form className="form-auth" onSubmit={handleSubmitForm}>
			<h2>Connexion</h2>
			<FormField name="email" label="Email" placeholder="Votre email" />
			<FormField
				name="password"
				label="Mot de passe"
				placeholder="Votre mot de passe"
			/>
			<SubmitForm />
			<p>
				Vous avez déjà un compte ?{" "}
				<Link to="/signup">Connectez-vous</Link> !
			</p>
		</form>
	);
}
