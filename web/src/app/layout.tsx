import type { Metadata } from 'next';
import { Geist, Geist_Mono, Nunito, M_PLUS_Rounded_1c } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const nunito = Nunito({
	subsets: ['latin'],
	variable: '--font-nunito',
	display: 'swap',
});

const mplus = M_PLUS_Rounded_1c({
	weight: ['400', '500', '700', '800'],
	subsets: ['latin'],
	variable: '--font-mplus',
	display: 'swap',
});

import { PythonProvider } from '@/components/providers/python-provider';
import { HeartProvider } from '@/components/providers/heart-provider';

export const metadata: Metadata = {
	title: 'CodePop - ゲーム感覚でプログラミングを学ぼう',
	description:
		'ゲーム感覚で楽しくプログラミングを学習。1日5分から始められる、初心者にやさしいステップバイステップ解説付き。',
	keywords: [
		'プログラミング学習',
		'初心者',
		'ゲーミフィケーション',
		'無料',
		'オンライン学習',
	],
	authors: [{ name: 'CodePop Team' }],
	openGraph: {
		title: 'CodePop - ゲーム感覚でプログラミングを学ぼう',
		description:
			'ゲーム感覚で楽しくプログラミングを学習。初心者にやさしいステップバイステップ解説付き。',
		type: 'website',
		locale: 'ja_JP',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'CodePop - ゲーム感覚でプログラミングを学ぼう',
		description:
			'ゲーム感覚で楽しくプログラミングを学習。初心者にやさしいステップバイステップ解説付き。',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${mplus.variable} antialiased font-sans`}
			>
				<HeartProvider>
					<PythonProvider>{children}</PythonProvider>
				</HeartProvider>
			</body>
		</html>
	);
}
