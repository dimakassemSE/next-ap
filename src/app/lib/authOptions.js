import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { users } from "./users";
import { signIn } from "next-auth/react";

const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: "email", type: "email", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const user = users.find((u) => u.email === credentials.email);

				if (!user) {
					return null;
				} else if (
					user &&
					(await bcrypt.compareSync(credentials.password, user.password))
				) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 1 * 24 * 60 * 60, //1 day
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (session) {
				session.user.email = token.email;
				session.user.role = token.role.toString();
			}

			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
	},
};

export { authOptions };
