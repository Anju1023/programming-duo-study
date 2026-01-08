# 直してほしいところ

- [x] ~~ゆくゆくは JavaScript とか他の言語も実装したいから、トップページに Python って書いてあるのおかしいかも~~
- [x] ~~Lesson を増やして完成させたい~~
- [ ] ログイン機能をもっと充実させたい
  - [x] ~~今はメールアドレスとパスワードでログインするけど、Google とかでログインできるようにしたい~~
  - [ ] ログイン情報を保存できるようにしたい
- [ ] トップページの構成を変更したい
- [ ] 問題構成を、進み方をゆっくりにしてほしい。(毎日やる前提なので、もっと反復してほしい)Duolingo の問題構成のように！！
  - [ ] 類題を何度か出す(反復)
  - [ ] 時々セクションのまとめを出す

---

# 詳細タスクリスト

## 🚀 タスク 1: トップページの Python 表記を汎用化

**目的**: 将来 JavaScript など他の言語も追加できるように

### 作業内容

- [ ] `src/app/page.tsx` の修正
  - [ ] L30: 「Python をマスターしよう」→「プログラミングをマスターしよう」
  - [ ] L60: 「Python コードを直接実行」→「コードを直接実行」
- [ ] `src/app/layout.tsx` の修正（SEO メタデータ）
  - [ ] L18: title「ゲーム感覚で Python を学ぼう」→「ゲーム感覚でプログラミングを学ぼう」
  - [ ] L20: description の Python 表記を修正
  - [ ] L22: keywords から Python を削除または変更
  - [ ] L30, 32, 38, 40: OGP/Twitter の Python 表記を修正
- [ ] `src/components/layout/mobile-header.tsx` の修正
  - [ ] L9: 「Python 基礎」→ 現在のコース名を動的に表示
- [ ] `src/app/(main)/learn/page.tsx` の修正
  - [ ] L45: 「Python 実験室」→「コード実験室」
- [ ] `src/components/feature/playground.tsx` の修正
  - [ ] L34: 「Python Playground」→「Code Playground」
- [ ] `src/components/code/code-editor.tsx` の修正
  - [ ] L40: 「PYTHON 3」→ 動的に言語名を表示（または削除）

---

## ✅ タスク 2: Lesson を増やす（完了）

前回のセッションで対応済み！

- Unit 2 の LEARN スライド追加
- Unit 3-6（条件分岐、ループ、リスト、関数）を新規追加

---

## 🔐 タスク 3: ログイン機能の充実

### 3-1: Google ログイン（✅ 実装済み）

コードを確認したところ、すでに `loginWithGoogle()` が実装されている！  
ただし、Supabase ダッシュボードで Google OAuth プロバイダーの設定が必要。

- [ ] Supabase Dashboard で Google プロバイダーを有効化
  - [ ] Google Cloud Console で OAuth クライアント ID を作成
  - [ ] クライアント ID とシークレットを Supabase に設定
  - [ ] リダイレクト URL を設定

### 3-2: ログイン情報の保存（Remember Me）

- [ ] Supabase のセッション永続化オプションを確認
  - [ ] `@supabase/ssr` の `setSession` オプションを調査
- [ ] ログインフォームに「ログイン状態を保持する」チェックボックスを追加
  - [ ] `src/app/login/page.tsx` に UI 追加
  - [ ] `src/app/login/actions.ts` でセッション設定を変更

---

## 🏠 タスク 4: トップページの構成変更

**あんじゅに確認が必要:**  
どのように変更したい？

- [ ] ヒーローセクションのデザイン変更？
- [ ] 新しいセクションの追加（成功事例、チュートリアル動画など）？
- [ ] ナビゲーションの変更？
- [ ] フッターの追加？

---

## 🔄 タスク 5: Duolingo 風の問題構成（反復学習）

### 5-1: 類題を何度か出す（反復）

- [ ] チャレンジのデータ構造を拡張
  - [ ] `challenges` JSONB に `variations` フィールドを追加
  - [ ] 同じ概念の問題バリエーションを定義
- [ ] レッスン進行ロジックの変更
  - [ ] `src/components/lesson/lesson-container.tsx` を修正
  - [ ] ランダムに類題を選択するロジックを追加
  - [ ] 間違えた問題を後で再出題するロジック

### 5-2: セクションのまとめを出す

- [ ] 新しいチャレンジタイプ `REVIEW` を追加
  - [ ] `content-guide.md` にルールを追記
  - [ ] 複数レッスンの復習問題をまとめる
- [ ] Unit 完了時にまとめクイズを表示
  - [ ] `schema.sql` に Unit 終了時のまとめレッスンを追加
- [ ] スペースドリピティション（間隔反復）の導入
  - [ ] 時間が経った問題を復習として再出題
  - [ ] `user_progress` テーブルに復習履歴を追加

---

## 📋 優先順位

1. **タスク 1**: トップページの Python 表記を汎用化（簡単・すぐできる）
2. **タスク 3-1**: Google ログイン設定（Supabase 側の設定のみ）
3. **タスク 3-2**: Remember Me 機能（中程度）
4. **タスク 4**: トップページ構成変更（要確認）
5. **タスク 5**: Duolingo 風の問題構成（大きめ・設計必要）
