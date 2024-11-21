import Link from "next/link";

function ProductCard({ id, title }) {
	return (
		<div className="sm:w-full p-6 space-y-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<div className="w-full h-48 bg-gray-300 rounded"></div>
			<div className="flex justify-between  text-xl font-bold text-gray-900 dark:text-white tracking-tight">
				<h5>Product {id}</h5>
				<p>20$</p>
			</div>

			<p className=" font-normal text-gray-700 dark:text-gray-400 whitespace-nowrap text-ellipsis overflow-hidden w-full">
				{title}
			</p>
			<div className="flex flex-row-reverse">
				<Link
					href={"/product-details/" + id}
					className="inline-flex  items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300"
				>
					More Details
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
							d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
						/>
					</svg>
				</Link>
			</div>
		</div>
	);
}

export default ProductCard;
