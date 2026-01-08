import type { Metadata } from 'next';
import {
	Geist,
	Geist_Mono,
	Nunito,
	M_PLUS_Rounded_1c,
	Zen_Maru_Gothic,
} from 'next/font/google';
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

const zenMaru = Zen_Maru_Gothic({
	weight: ['300', '400', '500', '700', '900'],
	subsets: ['latin'],
	variable: '--font-zen-maru',
	display: 'swap',
});

import { PythonProvider } from '@/components/providers/python-provider';
import { HeartProvider } from '@/components/providers/heart-provider';

export const metadata: Metadata = {
	title: '木漏れ日コード | あなたのペースでプログラミングを',
	description:
		'あせらず、ゆっくり。1日5分から始める優しいプログラミング習慣。挫折した経験があるあなたへ。',
	keywords: [
		'プログラミング学習',
		'初心者',
		'癒やし',
		'無料',
		'オンライン学習',
		'Python',
	],
	authors: [{ name: 'Komorebi Code Team' }],
	openGraph: {
		title: '木漏れ日コード | あなたのペースでプログラミングを',
		description:
			'あせらず、ゆっくり。1日5分から始める優しいプログラミング習慣。',
		type: 'website',
		locale: 'ja_JP',
	},
	twitter: {
		card: 'summary_large_image',
		title: '木漏れ日コード | あなたのペースでプログラミングを',
		description:
			'あせらず、ゆっくり。1日5分から始める優しいプログラミング習慣。',
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
				className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${mplus.variable} ${zenMaru.variable} antialiased font-sans`}
			>
				<HeartProvider>
					<PythonProvider>{children}</PythonProvider>
				</HeartProvider>
			</body>
		</html>
	);
}
