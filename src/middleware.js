import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
	LOGIN_REDIRECT,
	USER_ROUTES,
	ADMIN_ROUTES,
	AUTH_ROUTES,
	ROOT,
} from "./app/lib/routes";

export default withAuth(
	async function middleware(req) {
		const { pathname } = req.nextUrl;
		const token = await getToken({ req });
		const isUserPages = USER_ROUTES.some((route) => pathname.startsWith(route));

		const isAdminPage = ADMIN_ROUTES.some((route) =>
			pathname.startsWith(route)
		);
		const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));

		// if (token && isAuthPage) {
		// 	return NextResponse.redirect(new URL(ROOT, req.url));
		// }

		if (!token && (isUserPages || isAdminPage)) {
			return NextResponse.redirect(new URL(LOGIN_REDIRECT, req.url));
		}

		if (isAdminPage && token.role !== "admin") {
			return NextResponse.redirect(new URL(ROOT, req.url));
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized({ req, token }) {
				if (token) return true;
			},
		},
	}
);

export const config = {
	matcher: [
		"/dashborad/:path*",
		"/product-details/:path*",
		// "/auth/login",
	],
};
