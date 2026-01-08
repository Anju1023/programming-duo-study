'use client';

import { useActionState } from 'react';
import { login, signup } from './actions';
import { loginWithGoogle } from './actions';
import { Button } from '@/components/ui/button';
import { Code2 } from 'lucide-react';

// Wrapper to match useActionState signature
async function loginAction(prevState: unknown, formData: FormData) {
	return await login(formData);
}

async function signupAction(prevState: unknown, formData: FormData) {
	return await signup(formData);
}

export default function LoginPage() {
	const [loginState, loginDispatch, isLoginPending] = useActionState(
		loginAction,
		null
	);
	const [signupState, signupDispatch, isSignupPending] = useActionState(
		signupAction,
		null
	);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
			<div className="w-full max-w-md space-y-8">
				<div className="flex flex-col items-center text-center">
					<Code2 className="h-12 w-12 text-primary mb-2" />
					<h2 className="text-3xl font-extrabold tracking-tight">
						CodePopへようこそ
					</h2>
					<p className="text-muted-foreground mt-2">
						ログインして学習を続けましょう！
					</p>
				</div>

				<div className="bg-card p-8 rounded-xl border shadow-sm space-y-6">
					<form className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium">
								メールアドレス
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder="hello@example.com"
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="password" className="text-sm font-medium">
								パスワード
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							/>
						</div>

						{/* Remember Me チェックボックス */}
						<div className="flex items-center space-x-2">
							<input
								id="rememberMe"
								name="rememberMe"
								type="checkbox"
								defaultChecked
								className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
							/>
							<label
								htmlFor="rememberMe"
								className="text-sm text-muted-foreground"
							>
								ログイン状態を保持する
							</label>
						</div>

						{/* Error Message Display */}
						{loginState?.error && (
							<p className="text-sm text-destructive">{loginState.error}</p>
						)}
						{signupState?.error && (
							<p className="text-sm text-destructive">{signupState.error}</p>
						)}

						<div className="flex flex-col gap-2 pt-2">
							<Button
								formAction={loginDispatch}
								disabled={isLoginPending}
								className="w-full"
							>
								{isLoginPending ? 'ログイン中...' : 'ログイン'}
							</Button>
							<Button
								formAction={signupDispatch}
								disabled={isSignupPending}
								variant="outline"
								className="w-full"
							>
								{isSignupPending ? '登録中...' : '新規登録'}
							</Button>
						</div>
					</form>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-card px-2 text-muted-foreground">または</span>
						</div>
					</div>

					<form action={loginWithGoogle}>
						<Button variant="secondary" className="w-full" type="submit">
							Googleで続ける
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
