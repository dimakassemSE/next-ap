"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ProductForm({ id, title = "", body = "" }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		title,
		body,
	});
	const onSubmit = async (data) => {
		toast.success("Product add Successfully");
	};

	return (
		<div className="mt-1 flex min-h-full flex-1 flex-col justify-center px-6 py-3">
			<div className="mx-auto w-1/2">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
					<div>
						<label
							htmlFor="tilte"
							className="block text-sm/6 font-medium text-gray-900"
						>
							tilte
						</label>
						<div className="mt-2">
							<textarea
								id="title"
								type="text"
								{...register("title", {
									required: "title is required",
								})}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
							/>
							{errors.title && (
								<p style={{ color: "red" }}>
									{errors.title.message.toString()}
								</p>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor="body"
							className="block text-sm/6 font-medium text-gray-800"
						>
							Body
						</label>
						<div className="mt-2">
							<textarea
								id="body"
								type="text"
								rows="5"
								className="min-h-fit block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
						>
							add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
