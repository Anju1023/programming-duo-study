export default function LearnLoading() {
	return (
		<div className="flex flex-col items-center gap-8 py-8 w-full animate-pulse">
			{/* Playground Skeleton */}
			<div className="w-full max-w-2xl bg-muted/20 h-48 rounded-xl border border-dashed border-primary/20" />

			<div className="w-full border-t my-4 opacity-20"></div>

			{/* Unit Skeleton */}
			<div className="w-full max-w-md space-y-4">
				<div className="h-10 w-48 bg-muted rounded-md mx-auto mb-8" />

				{/* Nodes Zig-Zag Mock */}
				<div className="flex justify-center">
					<div className="h-20 w-20 rounded-full bg-muted" />
				</div>
				<div className="flex justify-center translate-x-8">
					<div className="h-20 w-20 rounded-full bg-muted" />
				</div>
				<div className="flex justify-center translate-x-16">
					<div className="h-20 w-20 rounded-full bg-muted" />
				</div>
			</div>
		</div>
	);
}
