import { comparePassword, createJWT, hashPassword } from "../utils/auth";
import { Request, RequestHandler } from "express";
import { validationResult } from "express-validator";
import db from "../db";

interface TypedRequestParam extends Request {
	body: {
		username: string;
		password: string;
		email: string;
	};
}

export const signUpUser: RequestHandler = async (
	req: TypedRequestParam,
	res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const body = req.body;

	try {
		const hash = await hashPassword(body.password as string);

		const user = await db.user.create({
			data: {
				username: body.username,
				password: hash,
				email: body.email,
			},
		});

		const token = createJWT(user);
        res.cookie("userToken", token);
		res.status(201).json({ message: "Account created with success",  });
	} catch (e) {
		res.status(400).json({ error: e });
	}
};

export const signInUser: RequestHandler = async (
	req: TypedRequestParam,
	res
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const body = req.body;

	try {
		const user = await db.user.findUniqueOrThrow({
			where: {
				username: req.body.username,
			},
		});

		const correctPassword = await comparePassword(
			req.body.password,
			user.password
		);

		if (!correctPassword) {
			throw new Error("Invalid password");
		}

		const token = createJWT(user);
		res.status(201).json({ message: "Connected" });
	} catch (e: any) {
		res.status(400).json({ error: e.message });
	}
};
