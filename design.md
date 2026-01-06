# 🎨 UI/UX デザイン仕様書 (design.md)

## 1. デザインコンセプト
**"Playful & Focus"**
- **遊び心**: 色鮮やかで、触って楽しいインタラクション。
- **集中**: 学習中は余計な情報を排除し、コードと課題に没頭させる。

## 2. カラーパレット (Tailwind CSS v4 Variables)

### Theme Concept: "Electric Blue & Coral" (Original Pop)
既存の学習アプリ(Green/Purple)と被らない、**"知的でエネルギッシュ"** な独自の配色。
ブルーを基調に、遊び心あるコーラルピンクをアクセントに使用します。

### Primary (Brand Identity)
- **Primary**: `#3B82F6` (Electric Blue - 知性・集中・信頼)
  - `bg-primary`, `hover:bg-primary/90`
- **Secondary**: `#2DD4BF` (Teal - リフレッシュ・サブアクション)
- **Accent**: `#F43F5E` (Vibrant Coral - 情熱・ストリーク・ハート)

### Status / Feedback
- **Success (的正解)**: `#10B981` (Emerald Green - 視認性の高い正解色)
- **Error (不正解)**: `#EF4444` (Red - 明確な間違い)
- **Warning**: `#F59E0B` (Amber - 注意)

### Neutral (Background & Text)
- **Background**: `#F8FAFC` (Slate-50) / `#0F172A` (Dark Mode Slate-900)
- **Surface**: `#FFFFFF` (White) / `#1E293B` (Dark Mode Slate-800)
- **Text Main**: `#334155` (Slate-700) / `#F1F5F9` (Slate-100)
- **Text Sub**: `#64748B` (Slate-500) / `#94A3B8` (Slate-400)

## 3. タイポグラフィ
**Font Family**: `Nunito` (Rounded系で親しみやすさ重視) または `Inter` (可読性重視)。
Next.js の `next/font` を使用。

- **Headings**: `Nunito`, Bold / ExtraBold
- **Body**: `Nunito` or `Inter`, Medium / SemiBold (学習アプリなので少し太めが読みやすい)
- **Code**: `Fira Code` or `JetBrains Mono` (Ligatures対応でプログラミング気分を高める)

## 4. UIコンポーネント設計

### Buttons (3D Action Style)
押した感触のある「3D風」ボタンを採用（Duolingoスタイル）。
border-bottomに濃い色をつけて立体感を出す。

```css
.btn-primary {
  @apply bg-[#3B82F6] border-b-4 border-[#2563EB] active:border-b-0 active:translate-y-1 text-white font-bold rounded-xl;
}
```

### Learning Map (スゴロク画面)
- SVGまたはCSS Gridで曲がりくねった道を表現。
- **Lesson Node**:
  - **Completed**: 金色または明るい色で塗りつぶし。
  - **Current**: 脈動するアニメーション (Pulse scale)。
  - **Locked**: グレーアウト + 鍵アイコン。

### Lesson Cards & Quiz UI
- **Card**: 大きな角丸 (`rounded-2xl`)、軽いシャドウ。
- **Option Buttons**: 選択肢はカード形式。タップで枠線が太くなる (`border-2 border-primary`)。
- **Bottom Sheet**: 正解・不正解時のフィードバックは画面下部からスライドイン。
  - **Correct**: 「正解！」 + 「次へ」ボタン (Green bg)。
  - **Incorrect**: 「正解は...」 + 「了解」ボタン (Red bg)。

## 5. レイアウト構造

### Mobile Layout (Default)
- **Top Bar**: 現在のコース名、HP (ハート)、Gem (通貨)、Streak (炎)。
- **Main Content**: `h-[calc(100vh-140px)]` scrollable。
- **Bottom Navigation**:
  - 🏠 **Learn**: 学習マップ
  - 🏆 **Leaderboard**: ランキング
  - 👤 **Profile**: 設定・実績

### Desktop Layout
- スマホレイアウトを中央に配置し、左右に余白または補足情報（辞書、詳細ステータス）を表示する「スマホエミュレーション風」レイアウト、またはレスポンシブに2カラム化。

## 6. アニメーション & マイクロインタラクション
`framer-motion` を使用。

- **Page Transition**: ふわっと切り替わる (`opacity`, `x` 移動)。
- **Feedback**:
  - 正解時: 紙吹雪 (Confetti)、チェックマークのバウンス。
  - 不正解時: 画面または要素が横に揺れる (Shake)。
- **ProgressBar**: ぬるっと動く進捗バー。

## 7. アイコン
`lucide-react` を使用。必要に応じてstrokeWidthを太くしてポップさを出す。

---
TODO:
- [ ] `design.md` review
- [ ] `tailwind.config.ts` setup with defined colors
