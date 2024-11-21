"use client";
import { useState } from "react";
import LoginButton from "../button/LoginButton";
import Link from "next/link";
import LogoutButton from "../button/LogoutButton";
import { useSession } from "next-auth/react";

export default function NavMenu() {
	const { data: session, status } = useSession();
	const [openMenu, setOpenMenu] = useState(false);
	const handleClick = () => {
		setOpenMenu(!openMenu);
	};
	return (
		<>
			<div className="block lg:hidden">
				<button
					onClick={handleClick}
					id="nav-toggle"
					className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-200 hover:text-white hover:border-white"
				>
					<svg
						className="fill-current h-3 w-3"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
			<div
				className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
					!openMenu && "hidden"
				} lg:block pt-6 lg:pt-0`}
			>
				<ul className="list-reset lg:flex justify-end flex-1 items-center">
					<li className="mr-3">
						<Link
							className="inline-block  no-underline text-gray-200    hover:text-white hover:text-underline py-2 px-4"
							href="/"
						>
							Home
						</Link>
					</li>
					{session?.user.role === "admin" && (
						<li className="mr-3">
							<Link
								className="inline-block  no-underline text-gray-200    hover:text-white hover:text-underline py-2 px-4"
								href="/dashborad"
							>
								Dashboard
							</Link>
						</li>
					)}
					{status === "authenticated" && (
						<li className="mr-3">
							<LogoutButton />
						</li>
					)}
					{status === "unauthenticated" && (
						<li className="mr-3">
							<LoginButton />
						</li>
					)}
				</ul>
			</div>
		</>
	);
}
