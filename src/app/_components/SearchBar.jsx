"use client";

import { useForm } from "react-hook-form";

export default function SearchBar({ onSubmit }) {
	const { handleSubmit, register } = useForm();
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex items-center max-w-sm"
		>
			<div className="w-full">
				<input
					{...register("search")}
					type="text"
					id="search"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-gray-500-500 focus:border-gray-500 block w-full p-2.5 
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
					placeholder="Search branch name..."
				/>
			</div>
			<button
				type="submit"
				className="p-2.5 ms-2 text-sm font-medium text-white bg-gray-800 rounded-lg border
         border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none
          focus:ring-gray-300 "
			>
				<svg
					className="w-4 h-4"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
				<span className="sr-only">Search</span>
			</button>
		</form>
	);
}
