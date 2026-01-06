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

-- Seed Initial Data (Python 101)
insert into courses (title, image_src) values ('Python Basics', '/icons/python.svg');

insert into units (course_id, title, description, "order") 
values (1, 'Introduction to Python', 'Learn the basics of Python syntax and variables.', 1);

insert into lessons (unit_id, title, "order", challenges)
values (1, 'Hello World', 1, '[
  {
    "type": "SELECT", 
    "question": "How do you print text in Python?", 
    "options": ["console.log()", "print()", "echo"], 
    "correctOption": "print()" 
  }
]'::jsonb);
