"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import getProducts from "../api/data";
import SearchBar from "./SearchBar";
import ErrorComponent from "./ErrorComponent";
import Loading from "./Loading";

function ProductsContainer() {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		getProducts().then((data) => {
			setProducts(data);
		});
	}, []);
	useEffect(() => {
		setIsLoading(false);
	}, [products]);
	const [productsFiltered, setProductFiltered] = useState([]);
	return (
		<div className="space-y-2">
			<div className="block md:flex justify-between items-center  space-y-2 md:space-y-0">
				<h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Products
				</h1>
				<SearchBar
					onSubmit={({ search }) => {
						setError("");
						console.log(search);
						const dataFiltered = !search
							? products
							: products.filter(
									(product) =>
										product.title
											.toLowerCase()
											.includes(search.toLowerCase()) ||
										product.body.toLowerCase().includes(search.toLowerCase())
							  );
						!dataFiltered.length
							? setError("Item Not Found")
							: setProductFiltered(dataFiltered);
					}}
				/>
			</div>
			{isLoading ? (
				<Loading />
			) : !error ? (
				<div>
					{
						<ul className="md:grid grid-cols-4 gap-4 space-y-2 md:space-y-0">
							{!productsFiltered.length
								? products?.map((product) => (
										<li key={product.id}>
											<ProductCard {...product} />
										</li>
								  ))
								: productsFiltered.map((product) => (
										<li key={product.id}>
											<ProductCard {...product} />
										</li>
								  ))}
						</ul>
					}
				</div>
			) : (
				<ErrorComponent message={error} />
			)}
		</div>
	);
}

export default ProductsContainer;
