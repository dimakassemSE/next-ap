"use client";
import { useState, useEffect } from "react";
import getProducts from "../../api/data";
import Link from "next/link";
import { toast } from "react-toastify";
const ProductTable = () => {
	const [productList, setProductList] = useState([]);
	const [rowsLimit] = useState(5);
	const [rowsToShow, setRowsToShow] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [customPagination, setCustomPagination] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	useEffect(() => {
		getProducts().then((data) => {
			setProductList(data);
		});
	}, []);
	useEffect(() => {
		console.log(productList);
		setRowsToShow(productList?.slice(0, rowsLimit));
		setIsLoading(false);
		setTotalPage(Math.ceil(productList?.length / rowsLimit));
		setCustomPagination(
			Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
		);
	}, [productList]);

	const nextPage = () => {
		const startIndex = rowsLimit * (currentPage + 1);
		const endIndex = startIndex + rowsLimit;
		const newArray = productList.slice(startIndex, endIndex);
		setRowsToShow(newArray);
		setCurrentPage(currentPage + 1);
	};
	const changePage = (value) => {
		const startIndex = value * rowsLimit;
		const endIndex = startIndex + rowsLimit;
		const newArray = productList.slice(startIndex, endIndex);
		setRowsToShow(newArray);
		setCurrentPage(value);
	};
	const previousPage = () => {
		const startIndex = (currentPage - 1) * rowsLimit;
		const endIndex = startIndex + rowsLimit;
		const newArray = productList.slice(startIndex, endIndex);
		setRowsToShow(newArray);
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		} else {
			setCurrentPage(0);
		}
	};

	const onDelete = (id) => {
		if (rowsToShow.findIndex((a) => a.id === id) === -1) return;
		setRowsToShow(rowsToShow.filter((product) => product.id !== id));
		toast.success("Product Delete Successfully", 3000);
	};
	if (isLoading) {
		return <div>Loading</div>;
	}
	return (
		<div className="h-full bg-white flex  items-center justify-center">
			<div className="w-full px-2 ">
				<div className="flex justify-between">
					<h1 className="text-2xl font-medium">Products</h1>
					<Link
						href={"/dashborad/" + 0}
						className="flex gap-1 rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-500"
					>
						<p>add </p>
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
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
					</Link>
				</div>
				<div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
					<table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
						<thead className="rounded-lg text-base text-white font-semibold w-full">
							<tr className="bg-[#222E3A]/[6%]">
								<th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
									ID
								</th>
								<th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
									Title
								</th>
								<th className="py-3 px-3  justify-center gap-1 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
									Body
								</th>
								<th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap"></th>
								<th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap"></th>
							</tr>
						</thead>
						<tbody>
							{!!rowsToShow?.length &&
								rowsToShow?.map((data, index) => (
									<tr
										className={`${
											index % 2 == 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
										} hover:bg-slate-50`}
										key={index}
									>
										<td
											className={`py-2 px-3 font-normal text-base ${
												index == 0
													? "border-t-2 border-black"
													: index == rowsToShow?.length
													? "border-y"
													: "border-t"
											} whitespace-nowrap`}
										>
											{data?.id}
										</td>
										<td
											className={`py-2 px-3 font-normal text-base ${
												index == 0
													? "border-t-2 border-black"
													: index == rowsToShow?.length
													? "border-y"
													: "border-t"
											} whitespace-nowrap text-ellipsis max-w-[250px] overflow-hidden`}
										>
											{data?.title}
										</td>
										<td
											className={`py-2 px-3 font-normal text-base ${
												index == 0
													? "border-t-2 border-black"
													: index == rowsToShow?.length
													? "border-y"
													: "border-t"
											} whitespace-nowrap text-ellipsis max-w-[250px] overflow-hidden`}
										>
											{data?.body}
										</td>

										<td
											className={`py-2 px-3 text-base  font-normal ${
												index == 0
													? "border-t-2 border-black"
													: index == rowsToShow?.length
													? "border-y"
													: "border-t"
											} `}
										>
											<Link
												className="text-gray-800 hover:text-green-300"
												href={`/dashborad/${data.id}?title=${data.title}&body=${data.body}`}
											>
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
														d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
													/>
												</svg>
											</Link>
										</td>
										<td
											className={`py-5 px-4 text-base  font-normal ${
												index == 0
													? "border-t-2 border-black"
													: index == rowsToShow?.length
													? "border-y"
													: "border-t"
											}`}
										>
											<button
												className="text-gray-800 hover:text-red-300"
												onClick={() => onDelete(data?.id)}
											>
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
														d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
													/>
												</svg>
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
					<div className="text-lg">
						Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
						{currentPage == totalPage - 1
							? productList?.length
							: (currentPage + 1) * rowsLimit}{" "}
						of {productList?.length} entries
					</div>
					<div className="flex">
						<ul
							className="flex justify-center items-center gap-x-[10px] z-30"
							role="navigation"
							aria-label="Pagination"
						>
							<li
								className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
									currentPage == 0
										? "bg-[#cccccc] pointer-events-none"
										: " cursor-pointer"
								}
  `}
								onClick={previousPage}
							>
								<img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
							</li>
							{customPagination?.map((data, index) => (
								<li
									className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
										currentPage == index
											? "text-gray-600  border-gray-500"
											: "border-[#E4E4EB] "
									}`}
									onClick={() => changePage(index)}
									key={index}
								>
									{index + 1}
								</li>
							))}
							<li
								className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
									currentPage == totalPage - 1
										? "bg-[#cccccc] pointer-events-none"
										: " cursor-pointer"
								}`}
								onClick={nextPage}
							>
								<img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProductTable;
