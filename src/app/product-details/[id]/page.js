import React from "react";
export default async function ({ params }) {
	const data = await fetch(
		"https://jsonplaceholder.typicode.com/posts/" + params?.id,
		{
			cache: "force-cache",
			next: {
				revalidate: 60,
			},
		}
	);
	const product = await data.json();
	return (
		<div className="gap-5 md:flex md:items-start ">
			<div className="mb-4 md:mb-0 flex items-center justify-center md:w-96  h-48 bg-gray-300 rounded w-full "></div>
			<div className="w-full space-y-4 grow">
				<div className="flex justify-between mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					<h5>Product {product.id}</h5>
					<p>20$</p>
				</div>

				<p className="mb-4 text-xl font-bold tracking-tight text-gray-500 dark:text-white">
					{product.title}
				</p>
				<p className="text-lg font-bold tracking-tight text-gray-500 dark:text-white">
					{product.body}
				</p>
			</div>
		</div>
	);
}
