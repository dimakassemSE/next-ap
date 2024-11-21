import React from "react";

export default function ErrorComponent({ message }) {
	return (
		<div>
			<div className="grid h-full place-content-center  bg-white px-4">
				<h1 className="pt-40 uppercase tracking-widest text-gray-500">
					{message}
				</h1>
			</div>
		</div>
	);
}
