export default function LessonLoading() {
	return (
		<div className="flex min-h-screen flex-col bg-background animate-pulse">
			{/* Header Skeleton */}
			<div className="border-b p-4 flex items-center justify-between">
				<div className="h-8 w-8 bg-muted rounded-full" />
				<div className="h-4 w-32 bg-muted rounded-full" />
				<div className="h-8 w-16 bg-muted rounded-full" />
			</div>

			{/* Main Content Skeleton */}
			<main className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 pt-24 pb-32 space-y-6">
				<div className="h-8 w-3/4 max-w-xl bg-muted rounded-md" />
				<div className="h-32 w-full max-w-2xl bg-muted/50 rounded-xl" />
			</main>

			{/* Footer Skeleton */}
			<div className="fixed bottom-0 w-full border-t p-4 lg:p-10 bg-background">
				<div className="mx-auto flex max-w-5xl items-center justify-between">
					<div className="h-12 w-full max-w-xs bg-muted rounded-md ml-auto" />
				</div>
			</div>
		</div>
	);
}
