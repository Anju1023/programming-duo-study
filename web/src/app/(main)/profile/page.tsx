import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { signOut } from '@/app/login/actions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default async function ProfilePage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	return (
		<div className="container max-w-2xl py-8 animate-fade-in">
			<h1 className="text-3xl font-bold mb-8 text-foreground">プロフィール</h1>

			<div className="bg-card border rounded-2xl p-8 shadow-sm space-y-6">
				<div className="flex items-center gap-4 border-b pb-6">
					<div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
						👤
					</div>
					<div>
						<p className="text-sm text-muted-foreground font-medium">
							アカウント
						</p>
						<p className="text-lg font-bold">{user.email}</p>
					</div>
				</div>

				<div className="pt-2">
					<form action={signOut}>
						<Button variant="destructive" className="w-full sm:w-auto gap-2">
							<LogOut className="w-4 h-4" />
							ログアウト
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
