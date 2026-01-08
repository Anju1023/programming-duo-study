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
    "type": "SELECT", 
    "question": "Pythonでテキストを表示するにはどうしますか？", 
    "options": ["console.log()", "print()", "echo"], 
    "correctOption": "print()" 
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (1, '変数の魔法', 2, '[
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

-- Unit 2 Lessons (assuming Unit ID 2 relies on serial, but hardcoding 2 is risky if we run multiple times without reset. 
-- However, since this is a reset script (drop tables at top), ID 2 is safe to assume for the second insert.)

insert into lessons (unit_id, title, "order", challenges)
values (2, '文字列の魔法', 1, '[
  {
    "type": "SELECT",
    "question": "Pythonで変数の値を文字列の中に埋め込む（f-string）正しい書き方は？",
    "options": ["f\"Hello {name}\"", "f\"Hello (name)\"", "\"Hello {name}\""],
    "correctOption": "f\"Hello {name}\""
  },
  {
    "type": "CODE",
    "question": "変数 `food` に \"おにぎり\" を入れて、f-stringを使って \"好きな食べ物は おにぎり です\" と表示してください。",
    "initialCode": "food = \"おにぎり\"\n",
    "correctOption": "print"
  }
]'::jsonb);

insert into lessons (unit_id, title, "order", challenges)
values (2, '数値の冒険', 2, '[
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
    "type": "SELECT",
    "question": "整数 (Integer) を表す型はどれ？",
    "options": ["int", "str", "float"],
    "correctOption": "int"
  },
  {
    "type": "CODE",
    "question": "変数 `age` (文字列の \"20\") を整数に変換して、それに 5 を足した数を print してください。",
    "initialCode": "age = \"20\"\n# ここで整数に変換して計算\n",
    "correctOption": "print"
  }
]'::jsonb);

-- Backfill profiles for existing auth users (in case of DB reset)
insert into public.profiles (id, email, username)
select id, email, raw_user_meta_data->>'full_name'
from auth.users
on conflict (id) do nothing;
