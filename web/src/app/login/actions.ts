'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { createClient } from '@/lib/supabase/server';

// Remember Me の設定を Cookie に保存
async function setRememberMePreference(rememberMe: boolean) {
	const cookieStore = await cookies();

	if (rememberMe) {
		// Remember Me が有効な場合は、長期間の Cookie を設定
		cookieStore.set('remember_me', 'true', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 30, // 30日間
			path: '/',
		});
	} else {
		// Remember Me が無効な場合は、セッション Cookie を設定（ブラウザ閉じたら削除）
		cookieStore.set('remember_me', 'false', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			// maxAge を設定しないとセッション Cookie になる
			path: '/',
		});
	}
}

export async function login(formData: FormData) {
	const supabase = await createClient();

	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const rememberMe = formData.get('rememberMe') === 'on';

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return { error: error.message };
	}

	// Remember Me の設定を保存
	await setRememberMePreference(rememberMe);

	revalidatePath('/', 'layout');
	redirect('/learn');
}

export async function signup(formData: FormData) {
	const supabase = await createClient();

	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const rememberMe = formData.get('rememberMe') === 'on';

	const { error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		return { error: error.message };
	}

	// Remember Me の設定を保存
	await setRememberMePreference(rememberMe);

	revalidatePath('/', 'layout');
	redirect('/learn');
}

export async function loginWithGoogle() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${
				process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
			}/auth/callback`,
		},
	});

	if (error) {
		redirect('/error');
	}

	if (data.url) {
		redirect(data.url);
	}
}

export async function signOut() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	redirect('/');
}
