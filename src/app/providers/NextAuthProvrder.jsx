"use client";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvrder({ children }) {
	return <SessionProvider>{children}</SessionProvider>;
}
