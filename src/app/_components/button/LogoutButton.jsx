import { signOut } from "next-auth/react";

export default function LogoutButton() {
	const onSubmit = () => {
		signOut();
	};

	return (
		<button
			onClick={onSubmit}
			className="flex gap-2 no-underline text-gray-200  hover:text-white hover:text-underline py-2 px-4 cursor-pointer"
		>
			Log out
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="size-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
				/>
			</svg>
		</button>
	);
}
