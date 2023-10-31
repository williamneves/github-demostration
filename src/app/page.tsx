import Image from "next/image"
import { revalidateTag } from "next/cache"

function Form() {
	async function create(formData: FormData) {
		"use server"
		const name = formData.get("name")
		console.log("received name: " + name)
		await new Promise((resolve) => {
			setTimeout(() => {
				console.log("Api call finished")
				resolve("Hello " + name)
			}, 2000)
		})
		console.log("revalidateTag")
		revalidateTag("/")
		// revalidate cache
	}

	return (
		<form
			action={create}
			className="flex flex-col items-center justify-center gap-4"
		>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				name="name"
				placeholder="Enter your name"
				className="rounded-md border border-gray-200 bg-white p-2 dark:bg-black dark:text-white"
			/>
			<input
				type="submit"
				value="Submit"
				className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			/>
			<p className="text-center text-xs text-gray-200">
				After submit will take 2 seconds to revalidate the path.
			</p>
		</form>
	)
}

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Form />
		</main>
	)
}
