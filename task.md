# Tasks

## Phase 1: Foundation & Setup 🏗️

> [!IMPORTANT] > **Localization Rule**: All user-facing UI text MUST be in **Japanese** (日本語). Check every component seriously!

- [x] **Project Initialization**
  - [x] Run `npx create-next-app` (v16.1.1, Turbo, TS, Tailwind)
  - [x] Verify local dev server (`npm run dev`)
  - [x] **Localization**: Translate UI components and Content to Japanese
- [x] **UI/UX Setup** (Based on `design.md`)
  - [x] Install Shadcn/ui & Lucide React
  - [x] Configure `tailwind.config.ts` (globals.css for v4) with "Electric Blue & Coral" theme colors
  - [ ] Create basic `Button` variants (Primary 3D, Ghost, Secondary)
  - [x] Setup `Framer Motion` for animations

## Phase 2: Database & Auth (Supabase) 🗄️

- [x] **Supabase Setup**
  - [x] Create Supabase Project
  - [x] Add Environment Variables (`.env.local`)
- [ ] **Authentication**
  - [x] Implement Google Login & Email Auth (SSR/Server Actions)
  - [x] Create Protected Route Middleware (Migrated to `proxy.ts`)
- [ ] **Database Schema Design & Migration**
  - [x] Create `schema.sql` (Profiles, Courses, Units, Lessons)
  - [ ] Run SQL in Supabase Dashboard (User Action Required)

## Phase 3: Core App Structure 📱

- [x] **Layout Implementation**
  - [x] Mobile-first Shell (Bottom Navigation for Mobile, Sidebar for Desktop)
  - [x] Header (Heart display, Streak flame, Gem counter - Mock Data)
- [ ] **Learning Map (Home)**
  - [x] Create `/learn` page shell
  - [x] Create "Sugoroku" Unit Map component (Zig-zag layout, Node states)
  - [x] Implement Level Nodes (Locked/Active/Completed states)

## Phase 4: Python Learning Engine 🐍

- [x] **Execution Environment**
  - [x] Setup Pyodide (Load via Next.js Script)
  - [x] Create `usePython` hook for execution & stdout capture
  - [x] Build `CodeEditor` (Simple editor with syntax highlighting)
- [x] **Code Editor**
  - [x] Implement Editor Component
  - [x] Add Run button & Output console (Playground)

## Phase 5: Lesson Logic & Content 📚

- [x] **Lesson Interface**
  - [x] Create `/lesson/[id]` page shell
  - [x] Implement Challenge Renderer (Select/Quiz vs Code)
  - [x] Build Feedback System (Correct/Incorrect Modal)
  - [x] Integrate Pyodide for answer validation

## Phase 6: Progress & Gamification 🚀

- [x] **Data Persistence (Server Actions)**
  - [x] `completeLesson` action: Update `user_progress`, unlock next lesson
  - [x] `deductHeart` action: Sync heart loss to DB
  - [x] `addXP` action: Award XP on completion
- [/] **UI Updates**
  - [x] Show XP gain animation on completion (Confetti)
  - [x] **Localization**: Ensure Modal text is Japanese
  - [ ] Unlock animation on Map (optional)
  - [ ] Sound effects (optional) & Feedback

## Phase 7: Polish & Economy 💎

- [ ] **Feedback System**
  - [ ] "Check" Button logic (Validate answer)
  - [ ] Correct/Incorrect Bottom Sheet animations
  - [ ] Sound Effects (Optional)
- [ ] **Economy logic**
  - [ ] XP calculation & update (Server Action)
  - [ ] Heart deduction system

## Phase 8: Content - "Python Basics 1" 📝

- [ ] Seed Database with initial course data
  - [ ] Unit 1: "Hello Python" (Print, Strings)
  - [ ] Unit 2: "Variables" (Assignment, Numbers)
