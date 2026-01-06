# [Feature] Interactive Lesson Interface

## Goal Description
Create the core learning experience: the `/lesson/[id]` page. This page will load a specific lesson's challenges, present them to the user one by one, maintain the heart/life system, and validate answers using the Supabase data and Pyodide engine.

## Proposed Changes
### Pages & Layouts
#### [NEW] [src/app/(main)/lesson/[id]/page.tsx](file:///c:/Users/nanbu/Yuki/Code/Antigravity/programming-duo-study/web/src/app/(main)/lesson/[id]/page.tsx)
-   **Dynamic Route**: Captures `id` from URL.
-   **Data Fetching**: calls `getLesson(id)` (needs to be created in `queries.ts`).
-   **State Management**: Tracks current challenge index, hearts, and correct/incorrect state.

#### [NEW] [src/app/(main)/lesson/layout.tsx](file:///c:/Users/nanbu/Yuki/Code/Antigravity/programming-duo-study/web/src/app/(main)/lesson/layout.tsx)
-   **Minimal Layout**: No sidebar/bottom nav. Just a progress bar and exit button (X) to focus the user.

### Components
#### [NEW] [src/components/lesson/challenge-renderer.tsx](file:///c:/Users/nanbu/Yuki/Code/Antigravity/programming-duo-study/web/src/components/lesson/challenge-renderer.tsx)
-   Switch component that renders either `QuizChallenge` or `CodeChallenge` based on challenge type.

#### [NEW] [src/components/lesson/quiz-challenge.tsx](file:///c:/Users/nanbu/Yuki/Code/Antigravity/programming-duo-study/web/src/components/lesson/quiz-challenge.tsx)
-   Renders a question and multiple-choice options.

#### [NEW] [src/components/lesson/code-challenge.tsx](file:///c:/Users/nanbu/Yuki/Code/Antigravity/programming-duo-study/web/src/components/lesson/code-challenge.tsx)
-   Uses `CodeEditor` and `Terminal`.
-   **Validation Logic**: Runs user code via `usePython`.
    -   *Simple check*: Matches exact output string.
    -   *Advanced check* (future): Inspects variables.

#### [NEW] [src/components/lesson/footer.tsx](file:///c:/Users/nanbu/Yuki/Code/Antigravity/programming-duo-study/web/src/components/lesson/footer.tsx)
-   "Check Answer" button. 
-   Changes to "Continue" on success or "Retry" on failure.
-   Displays feedback message (Green/Red banner).

### Database
#### [MODIFY] [src/db/queries.ts](file:///c:/Users/nanbu/Yuki/Code/Antigravity/programming-duo-study/web/src/db/queries.ts)
-   Add `getLesson(id)`: Fetches lesson details and its blob/jsonb content (`challenges`).

## Verification Plan
### Manual Verification
1.  Click a lesson node on `/learn`.
2.  Ensure redirection to `/lesson/[id]`.
3.  Verify "Select" challenge type renders radio buttons.
4.  Verify selecting correct answer -> Green Banner -> Proceed.
5.  Verify selecting incorrect answer -> Red Banner -> Heart Loss (UI only for now).
