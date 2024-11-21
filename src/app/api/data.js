export default async function getProducts() {
	const products = await fetch("https://jsonplaceholder.typicode.com/posts", {
		cache: "force-cache",
		next: {
			revalidate: 60,
		},
	}).then((response) => response.json());
	return products;
}
