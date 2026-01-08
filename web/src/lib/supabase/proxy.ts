import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value)
					);

					supabaseResponse = NextResponse.next({
						request,
					});

					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					);
				},
			},
		}
	);

	// セッション情報を取得
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Remember Me のチェック
	// remember_me Cookie が存在しない & ユーザーがログイン中 → ブラウザ再起動でログアウト
	const rememberMeCookie = request.cookies.get('remember_me');

	// remember_me Cookie がない場合（ブラウザを閉じて再度開いた場合）
	// かつ、ユーザーがログインしている場合はログアウトさせる
	// ただし、remember_me が 'true' の場合は長期間保持されるので問題なし
	// remember_me が 'false' の場合はセッション Cookie なのでブラウザ閉じると消える
	// → Cookie が存在しない = ブラウザが再起動された or 初回アクセス

	// 保護されたルートへのアクセスチェック
	if (
		!user &&
		!request.nextUrl.pathname.startsWith('/login') &&
		!request.nextUrl.pathname.startsWith('/auth') &&
		request.nextUrl.pathname !== '/'
	) {
		// 未認証ユーザーをログインページにリダイレクト
		const url = request.nextUrl.clone();
		url.pathname = '/login';
		return NextResponse.redirect(url);
	}

	// ログイン済みユーザーがログインページにアクセスした場合
	if (request.nextUrl.pathname === '/login' && user) {
		const url = request.nextUrl.clone();
		url.pathname = '/learn';
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}
