import Editor from "../components/Editor";

export default function DiaryForm() {
	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100">
			<div className="mx-auto max-w-3xl px-6 py-10">
				{/* Header */}
				<header className="mb-10">
					<h1 className="text-2xl font-semibold tracking-tight">New Entry</h1>
					<p className="mt-1 text-sm text-zinc-400">
						Take your time. There&apos;s no rush.
					</p>
				</header>

				<form className="space-y-10">
					{/* Title */}
					<div>
						<label className="mb-2 block text-sm text-zinc-500">Title</label>
						<input
							type="text"
							placeholder="A quiet evening"
							className="
                w-full bg-transparent
                border-b border-green-900/60
                px-1 pb-2 text-lg
                placeholder-zinc-600
                focus:border-emerald-600
                focus:outline-none
              "
						/>
					</div>

					{/* Date + Today button */}
					<div>
						<label className="mb-2 block text-sm text-zinc-500">Date</label>

						<div className="flex items-end gap-4 max-w-md">
							<input
								type="date"
								className="
                  flex-1 bg-transparent
                  border-b border-green-900/60
                  px-1 pb-2 text-sm
                  text-zinc-300
                  focus:border-emerald-600
                  focus:outline-none
                "
							/>

							<button
								type="button"
								className="
                  pb-2 text-sm
                  text-emerald-500
                  border-b border-transparent
                  hover:border-emerald-600
                  hover:text-emerald-400
                  hover:cursor-pointer
                  transition
                "
							>
								Choose today&apos;s date
							</button>
						</div>
					</div>
					<div>
						<label className="mb-3 block text-sm text-zinc-500">Entry</label>
						<Editor />
					</div>

					{/* Actions */}
					<div className="flex items-center justify-between pt-6">
						<p className="text-xs text-zinc-500">
							Saved locally until you submit.
						</p>

						<button
							type="submit"
							className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 transition"
						>
							Post Entry
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
