-- Reset Database (Use with caution!)
drop table if exists user_progress cascade;
drop table if exists lessons cascade;
drop table if exists units cascade;
drop table if exists courses cascade;
drop table if exists profiles cascade;
drop function if exists public.handle_new_user cascade;

-- Create a table for public profiles using Supabase Auth
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  username text,
  avatar_url text,
  hearts integer default 5,
  u_gem integer default 0,
  xp integer default 0,
  streak integer default 0,
  last_active_date date default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Handle new user signup automatically
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, username)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Courses Tables
create table courses (
  id serial primary key,
  title text not null,
  image_src text not null
);

create table units (
  id serial primary key,
  course_id integer references courses(id) on delete cascade not null,
  title text not null,
  description text not null,
  "order" integer not null
);

create table lessons (
  id serial primary key,
  unit_id integer references units(id) on delete cascade not null,
  title text not null,
  "order" integer not null,
  challenges jsonb default '[]'::jsonb -- Stores the lesson content
);

create table user_progress (
  user_id uuid references profiles(id) on delete cascade not null,
  active_course_id integer references courses(id) on delete cascade,
  completed_lesson_ids integer[] default '{}',
  primary key (user_id)
);

alter table user_progress enable row level security;

create policy "Users can view own progress."
  on user_progress for select
  using ( auth.uid() = user_id );

create policy "Users can insert own progress."
  on user_progress for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own progress."
  on user_progress for update
  using ( auth.uid() = user_id );

-- Seed Initial Data (Python 101)
insert into courses (title, image_src) values ('Python 基礎 (Python Basics)', '/icons/python.svg');

insert into units (course_id, title, description, "order") 
values (1, 'Python入門', 'Pythonの基本的な構文と変数の使い方を学びます。', 1);

insert into lessons (unit_id, title, "order", challenges)
values (1, 'Hello World', 1, '[
  {
    "type": "LEARN",
    "content": "# Pythonの世界へようこそ！\nここでは **Python（パイソン）** というプログラミング言語を学びます。\n\nPythonで文字を表示するには `print()` という魔法の言葉（関数）を使います。\n\n`print(\"Python\")`\n\nこのように書くと、画面に **Python** と表示されます。\nさあ、やってみよう！"
  },
  {
    "type": "SELECT", 
    "question": "Pythonでテキストを表示するにはどうしますか？", 
    "options": ["console.log()", "print()", "echo"], 
    "correctOption": "print()" 
  },
  {
    "type": "CODE",
    "question": "\"Hello World\" と表示するコードを書いてください。",
    "initialCode": "# print() を使って表示しよう\n",
    "correctOption": "print"
  },
  {
    "type": "SELECT",
    "question": "print(\"こんにちは\") を実行すると何が表示される？",
    "options": ["こんにちは", "print(\"こんにちは\")", "エラー"],
    "correctOption": "こんにちは"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (1, '変数の魔法', 2, '[
  {
    "type": "LEARN",
    "content": "# 変数ってなに？\n\n**変数**は、データを入れておく「箱」のようなものです。\n\n```python\nname = \"Python\"\n```\n\n上の例では `name` という箱に `\"Python\"` という文字を入れています。\n\n## 重要ポイント！\n\n- 文字列（テキスト）は必ず **クォート（\" \"）** で囲みます\n- 数字はクォートなしで書きます（例: `age = 20`）\n\nこれを覚えたら、変数マスターへの第一歩です！"
  },
  {
    "type": "SELECT", 
    "question": "文字列を変数に入れるとき、正しい書き方はどれ？",
    "options": ["name = Python", "name = \"Python\"", "\"name\" = Python"],
    "correctOption": "name = \"Python\""
  },
  {
    "type": "CODE",
    "question": "変数 `name` に \"プログラミング\" という文字を入れて、printしてください。",
    "initialCode": "# ここにコードを書いてね\nname = ",
    "correctOption": "print" 
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (1, '数値の計算', 3, '[
  {
    "type": "LEARN",
    "content": "# Pythonで計算しよう！\n\nPythonは電卓のように計算ができます。\n\n```python\nprint(2 + 3)  # 足し算 → 5\nprint(10 - 4) # 引き算 → 6\nprint(3 * 4)  # 掛け算 → 12\nprint(8 / 2)  # 割り算 → 4.0\n```\n\n## 覚えておこう\n\n- 足し算: `+`\n- 引き算: `-`\n- 掛け算: `*`（アスタリスク）\n- 割り算: `/`（スラッシュ）\n\n数字はクォートで囲まなくてOK！"
  },
  {
    "type": "SELECT", 
    "question": "Pythonで `print(2 + 3)` を実行するとどうなりますか？", 
    "options": ["23", "5", "エラーになる"], 
    "correctOption": "5" 
  },
  {
    "type": "CODE",
    "question": "変数 `apple` に 100 を入れて、`apple * 2` を print してください。",
    "initialCode": "apple = 100\n",
    "correctOption": "print"
  }
]'::jsonb);

insert into units (course_id, title, description, "order")
values (1, 'データ型と操作', '文字列や数値を自由自在に操る魔法を覚えよう！', 2);

-- Unit 2 Lessons (with LEARN slides added per content-guide.md rules)

insert into lessons (unit_id, title, "order", challenges)
values (2, '文字列の魔法', 1, '[
  {
    "type": "LEARN",
    "content": "# f-string（エフストリング）を覚えよう！\n\n変数の値を文字列の中に埋め込みたいとき、**f-string** を使います。\n\n```python\nname = \"太郎\"\nprint(f\"こんにちは、{name}さん！\")\n```\n\n実行結果: `こんにちは、太郎さん！`\n\n## ポイント\n- 文字列の前に `f` を付ける\n- 変数は `{ }` で囲む\n- 計算も埋め込める: `f\"1 + 2 = {1 + 2}\"`"
  },
  {
    "type": "SELECT",
    "question": "Pythonで変数の値を文字列の中に埋め込む（f-string）正しい書き方は？",
    "options": ["f\"Hello {name}\"", "f\"Hello (name)\"", "\"Hello {name}\""],
    "correctOption": "f\"Hello {name}\""
  },
  {
    "type": "CODE",
    "question": "変数 `food` に \"おにぎり\" を入れて、f-stringを使って \"好きな食べ物は おにぎり です\" と表示してください。",
    "initialCode": "food = \"おにぎり\"\n# f-string を使って print しよう\n",
    "correctOption": "print"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (2, '数値の冒険', 2, '[
  {
    "type": "LEARN",
    "content": "# 余りを求める演算子 %\n\n割り算の **余り** を求めるには `%`（パーセント記号）を使います。\n\n```python\nprint(7 % 3)  # 結果: 1\nprint(10 % 5) # 結果: 0\nprint(9 % 4)  # 結果: 1\n```\n\n## どんな時に使う？\n- 偶数・奇数の判定（`x % 2 == 0` なら偶数）\n- 繰り返し処理\n- ゲームのスコア計算"
  },
  {
    "type": "SELECT",
    "question": "割り算の「余り」を求める記号は？ (例: 7 ÷ 3 = 2 余り 1)",
    "options": ["%", "/", "#"],
    "correctOption": "%"
  },
  {
    "type": "CODE",
    "question": "10 を 3 で割った「余り」を print してください。",
    "initialCode": "# ヒント: % を使います\n",
    "correctOption": "print"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (2, '型の迷宮', 3, '[
  {
    "type": "LEARN",
    "content": "# データ型って何？\n\nPythonでは、データにはそれぞれ **型（タイプ）** があります。\n\n## 主な型\n- `int` - 整数（1, 42, -10）\n- `float` - 小数（3.14, 0.5）\n- `str` - 文字列（\"Hello\", \"Python\"）\n\n## 型を調べる\n```python\nprint(type(42))      # <class \"int\">\nprint(type(3.14))    # <class \"float\">\nprint(type(\"Hello\")) # <class \"str\">\n```\n\n## 型変換\n```python\nint(\"20\")   # 文字列 → 整数\nstr(100)    # 整数 → 文字列\nfloat(\"3.5\") # 文字列 → 小数\n```"
  },
  {
    "type": "SELECT",
    "question": "整数 (Integer) を表す型はどれ？",
    "options": ["int", "str", "float"],
    "correctOption": "int"
  },
  {
    "type": "CODE",
    "question": "変数 `age` (文字列の \"20\") を整数に変換して、それに 5 を足した数を print してください。",
    "initialCode": "age = \"20\"\n# int() で整数に変換して計算しよう\n",
    "correctOption": "print"
  }
]'::jsonb);

-- =============================================
-- Unit 3: 条件分岐
-- =============================================
insert into units (course_id, title, description, "order")
values (1, '条件分岐', 'if文を使ってプログラムに判断力を与えよう！', 3);

insert into lessons (unit_id, title, "order", challenges)
values (3, 'if文の基本', 1, '[
  {
    "type": "LEARN",
    "content": "# if文で条件分岐しよう！\n\n**if文** を使うと、条件によって実行する処理を変えられます。\n\n```python\nage = 20\nif age >= 18:\n    print(\"大人です\")\n```\n\n## ポイント\n- `if 条件:` の後に **コロン（:）** を付ける\n- 実行する処理は **インデント**（スペース4つ）を入れる\n- 条件が True なら実行、False ならスキップ"
  },
  {
    "type": "SELECT",
    "question": "if文の書き方で正しいのはどれ？",
    "options": ["if x == 10:", "if x == 10", "if (x == 10)"],
    "correctOption": "if x == 10:"
  },
  {
    "type": "CODE",
    "question": "変数 `score` が 80 以上なら \"合格\" と表示するコードを書いてください。",
    "initialCode": "score = 85\n# if文を書こう\n",
    "correctOption": "print"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (3, 'else と elif', 2, '[
  {
    "type": "LEARN",
    "content": "# else と elif で複数の分岐を作ろう！\n\n## else - 「それ以外」\n```python\nage = 15\nif age >= 18:\n    print(\"大人です\")\nelse:\n    print(\"子供です\")\n```\n\n## elif - 「そうでなければ、もし〜なら」\n```python\nscore = 75\nif score >= 90:\n    print(\"優秀！\")\nelif score >= 60:\n    print(\"合格！\")\nelse:\n    print(\"がんばろう！\")\n```\n\n`elif` は何個でも追加できます！"
  },
  {
    "type": "SELECT",
    "question": "elif の意味として正しいのは？",
    "options": ["そうでなければ、もし〜なら", "常に実行", "ループする"],
    "correctOption": "そうでなければ、もし〜なら"
  },
  {
    "type": "CODE",
    "question": "変数 `temp` が 30以上なら \"暑い\"、20以上なら \"快適\"、それ以外なら \"寒い\" と表示してください。",
    "initialCode": "temp = 25\n# if, elif, else を使おう\n",
    "correctOption": "print"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (3, '比較演算子', 3, '[
  {
    "type": "LEARN",
    "content": "# 比較演算子をマスターしよう！\n\n条件を作るときに使う記号です。\n\n## 比較演算子\n- `==` 等しい\n- `!=` 等しくない\n- `<` より小さい\n- `>` より大きい\n- `<=` 以下\n- `>=` 以上\n\n## 論理演算子\n- `and` - 両方 True なら True\n- `or` - どちらか True なら True\n- `not` - True と False を反転\n\n```python\nif age >= 18 and age < 65:\n    print(\"働き盛り！\")\n```"
  },
  {
    "type": "SELECT",
    "question": "「等しくない」ことを表す演算子は？",
    "options": ["!=", "==", "<>"],
    "correctOption": "!="
  },
  {
    "type": "CODE",
    "question": "変数 `x` が 10以上 かつ 20以下 なら \"範囲内\" と表示してください。",
    "initialCode": "x = 15\n# and を使って条件を書こう\n",
    "correctOption": "print"
  }
]'::jsonb);

-- =============================================
-- Unit 4: ループ
-- =============================================
insert into units (course_id, title, description, "order")
values (1, 'ループ', '繰り返し処理で効率的なプログラムを作ろう！', 4);

insert into lessons (unit_id, title, "order", challenges)
values (4, 'for ループ', 1, '[
  {
    "type": "LEARN",
    "content": "# for ループで繰り返そう！\n\n同じ処理を何度も繰り返すときは **for ループ** を使います。\n\n```python\nfor i in range(5):\n    print(i)\n# 結果: 0, 1, 2, 3, 4\n```\n\n## range() の使い方\n- `range(5)` - 0から4まで\n- `range(1, 6)` - 1から5まで\n- `range(0, 10, 2)` - 0から8まで2刻み\n\n## リストをループ\n```python\nfruits = [\"りんご\", \"みかん\", \"ぶどう\"]\nfor fruit in fruits:\n    print(fruit)\n```"
  },
  {
    "type": "SELECT",
    "question": "range(3) で生成される数値は？",
    "options": ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3"],
    "correctOption": "0, 1, 2"
  },
  {
    "type": "CODE",
    "question": "for ループを使って 1 から 5 までの数字を print してください。",
    "initialCode": "# range() を使おう\n",
    "correctOption": "for"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (4, 'while ループ', 2, '[
  {
    "type": "LEARN",
    "content": "# while ループで条件が True の間繰り返す！\n\n**while ループ** は条件が True の間、処理を繰り返します。\n\n```python\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1\n# 結果: 0, 1, 2\n```\n\n## 注意！無限ループ\n条件が永遠に True だと止まらなくなります！\n\n```python\n# 危険な例（実行しないで！）\nwhile True:\n    print(\"永遠に続く...\")\n```"
  },
  {
    "type": "SELECT",
    "question": "while ループが終了する条件は？",
    "options": ["条件が False になったとき", "条件が True になったとき", "3回繰り返したとき"],
    "correctOption": "条件が False になったとき"
  },
  {
    "type": "CODE",
    "question": "while ループを使って 5 から 1 までカウントダウンして print してください。",
    "initialCode": "count = 5\n# while を使ってカウントダウン\n",
    "correctOption": "while"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (4, 'break と continue', 3, '[
  {
    "type": "LEARN",
    "content": "# break と continue でループを制御！\n\n## break - ループを途中で終了\n```python\nfor i in range(10):\n    if i == 5:\n        break\n    print(i)\n# 結果: 0, 1, 2, 3, 4\n```\n\n## continue - その回だけスキップ\n```python\nfor i in range(5):\n    if i == 2:\n        continue\n    print(i)\n# 結果: 0, 1, 3, 4（2がスキップ）\n```"
  },
  {
    "type": "SELECT",
    "question": "ループを途中で完全に抜けるのは？",
    "options": ["break", "continue", "exit"],
    "correctOption": "break"
  },
  {
    "type": "CODE",
    "question": "1から10までループし、5になったらループを終了するコードを書いてください。",
    "initialCode": "# break を使おう\n",
    "correctOption": "break"
  }
]'::jsonb);

-- =============================================
-- Unit 5: リスト・コレクション
-- =============================================
insert into units (course_id, title, description, "order")
values (1, 'リスト・コレクション', '複数のデータをまとめて管理しよう！', 5);

insert into lessons (unit_id, title, "order", challenges)
values (5, 'リストの基本', 1, '[
  {
    "type": "LEARN",
    "content": "# リストで複数のデータを管理しよう！\n\n**リスト** は複数のデータを順番に保存できる箱です。\n\n```python\nfruits = [\"りんご\", \"みかん\", \"ぶどう\"]\nprint(fruits[0])  # りんご\nprint(fruits[1])  # みかん\nprint(fruits[2])  # ぶどう\n```\n\n## ポイント\n- `[ ]` で囲む\n- 要素はカンマ `,` で区切る\n- インデックスは **0 から始まる**\n- `fruits[-1]` で最後の要素を取得"
  },
  {
    "type": "SELECT",
    "question": "リストの最初の要素を取得するインデックスは？",
    "options": ["0", "1", "-1"],
    "correctOption": "0"
  },
  {
    "type": "CODE",
    "question": "リスト `colors` を作って \"赤\", \"青\", \"緑\" を入れ、2番目の要素を print してください。",
    "initialCode": "# リストを作ろう\n",
    "correctOption": "print"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (5, 'リストの操作', 2, '[
  {
    "type": "LEARN",
    "content": "# リストを操作しよう！\n\n## 要素の追加\n```python\nfruits = [\"りんご\"]\nfruits.append(\"みかん\")\nprint(fruits)  # [\"りんご\", \"みかん\"]\n```\n\n## 要素の削除\n```python\nfruits.pop()     # 最後を削除\nfruits.pop(0)    # 指定位置を削除\n```\n\n## 長さを調べる\n```python\nprint(len(fruits))  # 要素数\n```\n\n## 要素の変更\n```python\nfruits[0] = \"バナナ\"\n```"
  },
  {
    "type": "SELECT",
    "question": "リストに要素を追加するメソッドは？",
    "options": ["append()", "add()", "push()"],
    "correctOption": "append()"
  },
  {
    "type": "CODE",
    "question": "空のリスト `items` を作り、\"ペン\" と \"ノート\" を追加して print してください。",
    "initialCode": "items = []\n# append() で追加しよう\n",
    "correctOption": "print"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (5, '辞書（dict）', 3, '[
  {
    "type": "LEARN",
    "content": "# 辞書でキーと値をペアで管理！\n\n**辞書（dict）** はキーと値のペアでデータを管理します。\n\n```python\nuser = {\n    \"name\": \"太郎\",\n    \"age\": 20,\n    \"city\": \"東京\"\n}\nprint(user[\"name\"])  # 太郎\n```\n\n## 値の追加・変更\n```python\nuser[\"email\"] = \"taro@example.com\"\nuser[\"age\"] = 21\n```\n\n## キーの確認\n```python\nprint(\"name\" in user)  # True\n```"
  },
  {
    "type": "SELECT",
    "question": "辞書を作るときに使う記号は？",
    "options": ["{ }", "[ ]", "( )"],
    "correctOption": "{ }"
  },
  {
    "type": "CODE",
    "question": "辞書 `book` を作り、\"title\" に \"Python入門\"、\"price\" に 2000 を入れて print してください。",
    "initialCode": "# 辞書を作ろう\n",
    "correctOption": "print"
  }
]'::jsonb);

-- =============================================
-- Unit 6: 関数
-- =============================================
insert into units (course_id, title, description, "order")
values (1, '関数', '自分だけの命令を作って再利用しよう！', 6);

insert into lessons (unit_id, title, "order", challenges)
values (6, '関数の定義', 1, '[
  {
    "type": "LEARN",
    "content": "# 関数を作ってみよう！\n\n**関数** は処理をまとめて名前を付けたものです。何度でも呼び出せます！\n\n```python\ndef greet():\n    print(\"こんにちは！\")\n\ngreet()  # こんにちは！\ngreet()  # こんにちは！\n```\n\n## ポイント\n- `def 関数名():` で定義\n- 最後に **コロン（:）** を付ける\n- 処理は **インデント** する\n- `関数名()` で呼び出す"
  },
  {
    "type": "SELECT",
    "question": "関数を定義するキーワードは？",
    "options": ["def", "func", "function"],
    "correctOption": "def"
  },
  {
    "type": "CODE",
    "question": "\"おはよう！\" と表示する関数 `morning` を作って呼び出してください。",
    "initialCode": "# def で関数を定義しよう\n",
    "correctOption": "def"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (6, '引数と戻り値', 2, '[
  {
    "type": "LEARN",
    "content": "# 引数と戻り値を使おう！\n\n## 引数 - 関数に値を渡す\n```python\ndef greet(name):\n    print(f\"こんにちは、{name}！\")\n\ngreet(\"太郎\")  # こんにちは、太郎！\n```\n\n## 戻り値 - 関数から値を返す\n```python\ndef add(a, b):\n    return a + b\n\nresult = add(3, 5)\nprint(result)  # 8\n```\n\n`return` で値を返すと、呼び出し元で使えます！"
  },
  {
    "type": "SELECT",
    "question": "関数から値を返すキーワードは？",
    "options": ["return", "give", "output"],
    "correctOption": "return"
  },
  {
    "type": "CODE",
    "question": "2つの数を受け取って掛け算した結果を返す関数 `multiply` を作ってください。",
    "initialCode": "# def multiply(a, b): を作ろう\n",
    "correctOption": "return"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (6, 'スコープと変数', 3, '[
  {
    "type": "LEARN",
    "content": "# スコープ - 変数の有効範囲\n\n変数には **スコープ（有効範囲）** があります。\n\n## ローカル変数\n関数の中で作った変数は、その関数の中だけで有効。\n```python\ndef test():\n    x = 10  # ローカル変数\n    print(x)\n\ntest()\n# print(x)  # エラー！外からは見えない\n```\n\n## グローバル変数\n関数の外で作った変数は、どこからでも見える。\n```python\nmessage = \"Hello\"\n\ndef show():\n    print(message)\n\nshow()  # Hello\n```"
  },
  {
    "type": "SELECT",
    "question": "関数の中で定義した変数を何と呼ぶ？",
    "options": ["ローカル変数", "グローバル変数", "一時変数"],
    "correctOption": "ローカル変数"
  },
  {
    "type": "CODE",
    "question": "グローバル変数 `name` を作り、関数 `hello` の中でそれを使って挨拶を print してください。",
    "initialCode": "# グローバル変数と関数を作ろう\n",
    "correctOption": "def"
  }
]'::jsonb);

-- =============================================
-- 復習レッスン（セクションまとめ）
-- Duolingo風: 各Unitの最後に復習クイズを追加
-- =============================================

-- Unit 1 復習レッスン
insert into lessons (unit_id, title, "order", challenges)
values (1, '復習: Python入門', 4, '[
  {
    "type": "LEARN",
    "content": "# Unit 1 の復習\n\nここまで学んだことを復習しましょう！\n\n## 学んだこと\n- `print()` で文字を表示\n- 変数にデータを保存\n- 四則演算（+, -, *, /）\n\n準備はいい？"
  },
  {
    "type": "SELECT",
    "question": "次のうち、正しい変数の宣言はどれ？",
    "options": ["123name = \"test\"", "name = \"test\"", "\"name\" = test"],
    "correctOption": "name = \"test\""
  },
  {
    "type": "SELECT",
    "question": "print(10 - 3) の結果は？",
    "options": ["103", "7", "\"10 - 3\""],
    "correctOption": "7"
  },
  {
    "type": "CODE",
    "question": "変数 `greeting` に \"Hello\" を入れて print してください。",
    "initialCode": "# 変数を作って表示しよう\n",
    "correctOption": "print"
  },
  {
    "type": "SELECT",
    "question": "掛け算に使う記号は？",
    "options": ["x", "*", "#"],
    "correctOption": "*"
  }
]'::jsonb);

-- Unit 2 復習レッスン
insert into lessons (unit_id, title, "order", challenges)
values (2, '復習: データ型と操作', 4, '[
  {
    "type": "LEARN",
    "content": "# Unit 2 の復習\n\n## 学んだこと\n- f-string で変数を文字列に埋め込む\n- 余り演算子 `%`\n- データ型（int, str, float）と型変換"
  },
  {
    "type": "SELECT",
    "question": "f-string の正しい書き方は？",
    "options": ["f\"Hello {name}\"", "\"Hello\" + name", "f(\"Hello {name}\")"],
    "correctOption": "f\"Hello {name}\""
  },
  {
    "type": "SELECT",
    "question": "15 % 4 の結果は？",
    "options": ["3", "3.75", "4"],
    "correctOption": "3"
  },
  {
    "type": "CODE",
    "question": "文字列 \"100\" を整数に変換して、50 を足した結果を print してください。",
    "initialCode": "num_str = \"100\"\n# 型変換して計算しよう\n",
    "correctOption": "print"
  }
]'::jsonb);

-- Unit 3 復習レッスン
insert into lessons (unit_id, title, "order", challenges)
values (3, '復習: 条件分岐', 4, '[
  {
    "type": "LEARN",
    "content": "# Unit 3 の復習\n\n## 学んだこと\n- if文で条件分岐\n- else と elif で複数分岐\n- 比較演算子（==, !=, <, >, and, or）"
  },
  {
    "type": "SELECT",
    "question": "\"AかつB\" を表す論理演算子は？",
    "options": ["and", "or", "not"],
    "correctOption": "and"
  },
  {
    "type": "SELECT",
    "question": "if x == 5: の意味は？",
    "options": ["x に 5 を代入", "x が 5 と等しいかチェック", "x から 5 を引く"],
    "correctOption": "x が 5 と等しいかチェック"
  },
  {
    "type": "CODE",
    "question": "変数 `age` が 18 以上なら \"成人\" と表示するコードを書いてください。",
    "initialCode": "age = 20\n# 条件分岐を書こう\n",
    "correctOption": "print"
  }
]'::jsonb);

-- Unit 4 復習レッスン
insert into lessons (unit_id, title, "order", challenges)
values (4, '復習: ループ', 4, '[
  {
    "type": "LEARN",
    "content": "# Unit 4 の復習\n\n## 学んだこと\n- for ループと range()\n- while ループ\n- break と continue"
  },
  {
    "type": "SELECT",
    "question": "range(5) が生成する数値は？",
    "options": ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "0, 1, 2, 3, 4, 5"],
    "correctOption": "0, 1, 2, 3, 4"
  },
  {
    "type": "SELECT",
    "question": "ループを途中で終了するのは？",
    "options": ["break", "continue", "stop"],
    "correctOption": "break"
  },
  {
    "type": "CODE",
    "question": "for ループで 1 から 3 まで print してください。",
    "initialCode": "# range() を使おう\n",
    "correctOption": "for"
  }
]'::jsonb);

-- Unit 5 復習レッスン
insert into lessons (unit_id, title, "order", challenges)
values (5, '復習: リスト・コレクション', 4, '[
  {
    "type": "LEARN",
    "content": "# Unit 5 の復習\n\n## 学んだこと\n- リストの作成とインデックス\n- append(), pop(), len()\n- 辞書（dict）のキーと値"
  },
  {
    "type": "SELECT",
    "question": "リストの最初の要素を取得するインデックスは？",
    "options": ["0", "1", "-1"],
    "correctOption": "0"
  },
  {
    "type": "SELECT",
    "question": "辞書を作る記号は？",
    "options": ["{ }", "[ ]", "( )"],
    "correctOption": "{ }"
  },
  {
    "type": "CODE",
    "question": "リスト `fruits` を作り、\"りんご\" を追加して print してください。",
    "initialCode": "fruits = []\n# append() を使おう\n",
    "correctOption": "print"
  }
]'::jsonb);

-- Unit 6 復習レッスン
insert into lessons (unit_id, title, "order", challenges)
values (6, '復習: 関数', 4, '[
  {
    "type": "LEARN",
    "content": "# Unit 6 の復習\n\n## 学んだこと\n- def で関数を定義\n- 引数と戻り値（return）\n- スコープ（ローカル変数とグローバル変数）"
  },
  {
    "type": "SELECT",
    "question": "関数を定義するキーワードは？",
    "options": ["def", "func", "function"],
    "correctOption": "def"
  },
  {
    "type": "SELECT",
    "question": "関数の中で定義した変数を何と呼ぶ？",
    "options": ["ローカル変数", "グローバル変数", "仮引数"],
    "correctOption": "ローカル変数"
  },
  {
    "type": "CODE",
    "question": "2つの数を足して結果を返す関数 `add` を作ってください。",
    "initialCode": "# def add(a, b): を作ろう\n",
    "correctOption": "return"
  }
]'::jsonb);


-- Backfill profiles for existing auth users (in case of DB reset)
insert into public.profiles (id, email, username)
select id, email, raw_user_meta_data->>'full_name'
from auth.users
on conflict (id) do nothing;
