"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const onSubmit = async (data) => {
		const result = await signIn("credentials", {
			redirect: false,
			// callbackUrl: "/",
			...data,
		});
		if (result.ok) {
			toast.success("Log in Successfully");
			router.push("/");
		} else if (result.error) {
			toast.error("email or password not correct");
		}
	};

	return (
		<div className="mt-5 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl/9 font-semibold tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm/6 font-medium text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								type="email"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
										message: "Invalid email address",
									},
								})}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
							/>
							{errors.email && (
								<p style={{ color: "red" }}>
									{errors.email.message.toString()}
								</p>
							)}
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm/6 font-medium text-gray-800"
							>
								Password
							</label>
							<div className="text-sm">
								<a
									href="#"
									className="font-semibold text-gray-800 hover:text-gray-500"
								>
									Forgot password?
								</a>
							</div>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 6,
										message: "Password must be at least 6 characters long",
									},
								})}
							/>
							{errors.password && (
								<p style={{ color: "red" }}>
									{errors.password.message.toString()}
								</p>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
