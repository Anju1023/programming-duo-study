# 📱 プログラミング学習アプリ (Duolingo/Mimo風) 要件定義書

## 1. プロジェクト概要
DuolingoやMimoのように、ゲーム感覚で楽しくプログラミングを学べるWebアプリケーション。
**「毎日続けたくなっちゃう！」** をコンセプトに、直感的なUIとゲーミフィケーション要素を取り入れます。

## 2. 技術スタック (2026年 最新トレンド構成)

### Core
- **Framework:** Next.js 16.1.1 (App Router, Server Components)
- **Language:** TypeScript
- **Styling:**
  - Tailwind CSS (v4 最新安定版想定)
  - **Shadcn/ui** (Premium UI Components)
  - **Framer Motion** (リッチなアニメーション)
- **Icons:** Lucide React

### Backend / Infrastructure
- **Database & Auth:** **Supabase** (PostgreSQL)
  - Auth: メール/パスワード, Googleログイン
  - Database: ユーザーデータ、進捗、カリキュラム管理
  - Realtime: ランキング更新などの即時反映
- **State Management:** **Zustand** (シンプルで高速なクライアント状態管理)
- **Code Execution:**
  - **Pyodide** (WebAssembly) を採用し、ブラウザ上でPythonコードを安全に実行。
  - 将来的に他言語 (JS, Web) 対応も考慮するが、まずは **Python** に特化。

### Editor
- **Code Editor:** `@monaco-editor/react` または `react-simple-code-editor` (スマホ操作性を考慮して選定)

## 3. 機能要件 (MVP)

### 🎓 1. 学習 (Learn)
- **ロードマップ表示**: スゴロク形式の学習パス (Duolingoライク)。
- **レッスン形式 (Python特化)**:
  - **クイズ**: コードの穴埋め、実行結果の予測。
  - **並べ替え (Parsons Problems)**: バラバラのPythonコードを正しいロジック順に並べる。
  - **コーディング**: ブラウザ上のエディタでPythonコードを書き、Runボタンで実行。`print()` 出力を判定。
- **即時フィードバック**: 正解・不正解をリッチなアニメーションで表示。

### 🔥 2. ゲーミフィケーション (Gamification)
- **HP (ハート)**: 間違えると減る。時間が経つと回復。
- **XP (経験値)**: レッスンクリアで獲得。
- **ストリーク (連続記録)**: 毎日の学習継続を可視化。
- **ランキング (Leaderboard)**: 週間XPで他のユーザーと競争。

### 👤 3. プロフィール & 設定
- 進捗状況の確認。
- アバター設定 (今回はシンプルなアイコン選択などを想定)。

## 4. UI/UX デザインガイドライン
- **Color Palette**:
  - Primary: ビビッドなグリーンまたはパープル (Mimo感)。
  - Feedback: 正解(Green), 不正解(Red), 注意(Yellow)。
  - Dark Mode対応。
- **Mobile First**: スマホでの操作性を最優先。ボタンは大きく、押しやすく。
- **Micro-interactions**: ボタンを押した時の沈み込み、正解時の紙吹雪など、「触って気持ちいい」演出。

## 5. 今後の拡張性 (Future)
- **有料プラン (Pro)**: ハート無限、上級コース。
- **コミュニティ**: 質問掲示板機能。
- **AI チューター**: コードの解説をしてくれるbot (Vercel AI SDK活用)。

---
TODO:
1. `requirements.md` の承認
2. `npx create-next-app` でプロジェクト作成
3. Supabase プロジェクトのセットアップ
