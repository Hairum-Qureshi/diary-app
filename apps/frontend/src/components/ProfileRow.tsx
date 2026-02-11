export default function ProfileRow({
	label,
	value
}: {
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-center justify-between gap-4">
			<span className="text-sm text-zinc-400">{label}</span>
			<span className="text-sm text-zinc-100 text-right break-all">
				{value}
			</span>
		</div>
	);
}
