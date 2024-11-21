import Link from "next/link";
import LoginButton from "../button/LoginButton";
import NavMenu from "./NavMenu";

export default function () {
	return (
		<header className="bg-white shadow-sm">
			<nav className="flex items-center justify-between flex-wrap bg-gray-800 py-3 px-6 w-full z-10 ">
				<div className="flex items-center flex-shrink-0 text-white mr-6">
					<a
						className="text-white no-underline hover:text-white hover:no-underline"
						href="#"
					>
						<span className="text-2xl pl-2">
							<i className="em em-grinning"></i> Company Name
						</span>
					</a>
				</div>

				<NavMenu />
			</nav>
		</header>
	);
}
