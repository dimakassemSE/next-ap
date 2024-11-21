import React from "react";
import ProductForm from "../../_components/form/ProductForm";
export default function page({ params, searchParams }) {
	console.log(searchParams.body);
	const product = {
		id: params?.product,
		title: searchParams?.title,
		body: searchParams?.body,
	};
	return (
		<div>
			<ProductForm {...product} />
		</div>
	);
}
