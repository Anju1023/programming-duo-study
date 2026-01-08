import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

import { PythonProvider } from '@/components/providers/python-provider';

export const metadata: Metadata = {
	title: 'PyLearn - ゲーム感覚でPythonを学ぼう',
	description:
		'Duolingo風のゲーミフィケーションでPythonプログラミングを楽しく学習。初心者でも安心のステップバイステップ解説付き。',
	keywords: [
		'Python',
		'プログラミング学習',
		'初心者',
		'ゲーミフィケーション',
		'無料',
	],
	authors: [{ name: 'PyLearn Team' }],
	openGraph: {
		title: 'PyLearn - ゲーム感覚でPythonを学ぼう',
		description:
			'Duolingo風のゲーミフィケーションでPythonプログラミングを楽しく学習。',
		type: 'website',
		locale: 'ja_JP',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'PyLearn - ゲーム感覚でPythonを学ぼう',
		description:
			'Duolingo風のゲーミフィケーションでPythonプログラミングを楽しく学習。',
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
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<PythonProvider>{children}</PythonProvider>
			</body>
		</html>
	);
}
