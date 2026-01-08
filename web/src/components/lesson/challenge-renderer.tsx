'use client';

import { QuizChallenge } from './quiz-challenge';
import { CodeChallenge } from './code-challenge';
import { LessonInstruction } from './lesson-instruction';

interface BaseChallenge {
	type: 'LEARN' | 'SELECT' | 'CODE';
}

interface LearnChallenge extends BaseChallenge {
	type: 'LEARN';
	content: string;
	question?: string; // Fallback
}

interface SelectChallenge extends BaseChallenge {
	type: 'SELECT';
	question: string;
	options: string[];
}

interface CodeChallengeType extends BaseChallenge {
	type: 'CODE';
	question: string;
	initialCode: string;
}

type Challenge = LearnChallenge | SelectChallenge | CodeChallengeType;

interface SessionState {
	selectedOption?: string;
	code?: string;
}

interface ChallengeRendererProps {
	challenge: Challenge;
	sessionState: SessionState;
	onSelectOption: (option: string) => void;
	onCodeChange: (code: string) => void;
	onLearnComplete?: () => void;
	onCodeHotkey?: () => void; // For Ctrl+Enter in code challenges
	status: 'idle' | 'correct' | 'incorrect';
}

export function ChallengeRenderer({
	challenge,
	sessionState,
	onSelectOption,
	onCodeChange,
	onLearnComplete,
	onCodeHotkey,
	status,
}: ChallengeRendererProps) {
	if (!challenge) return null;

	switch (challenge.type) {
		case 'LEARN':
			return (
				<LessonInstruction
					content={challenge.content || challenge.question || ''}
					onComplete={onLearnComplete || (() => {})}
				/>
			);
		case 'SELECT':
			return (
				<QuizChallenge
					question={challenge.question || ''}
					options={challenge.options || []}
					selectedOption={sessionState.selectedOption ?? null}
					onSelect={onSelectOption}
					status={status}
				/>
			);
		case 'CODE':
			return (
				<CodeChallenge
					question={challenge.question || ''}
					initialCode={challenge.initialCode || ''}
					code={sessionState.code ?? ''}
					onChange={onCodeChange}
					status={status}
					onHotkey={onCodeHotkey}
				/>
			);
		default:
			return <div>Unknown challenge: {JSON.stringify(challenge)}</div>;
	}
}
