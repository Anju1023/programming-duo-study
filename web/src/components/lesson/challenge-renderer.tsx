'use client';

import { QuizChallenge } from './quiz-challenge';
import { CodeChallenge } from './code-challenge';
import { LessonInstruction } from './lesson-instruction';

interface ChallengeRendererProps {
	challenge: any; // Type properly
	sessionState: any; // user inputs
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
					content={challenge.content || challenge.question}
					onComplete={onLearnComplete || (() => {})}
				/>
			);
		case 'SELECT':
			return (
				<QuizChallenge
					question={challenge.question}
					options={challenge.options}
					selectedOption={sessionState.selectedOption}
					onSelect={onSelectOption}
					status={status}
				/>
			);
		case 'CODE':
			return (
				<CodeChallenge
					question={challenge.question}
					initialCode={challenge.initialCode}
					code={sessionState.code}
					onChange={onCodeChange}
					status={status}
					onHotkey={onCodeHotkey}
				/>
			);
		default:
			return <div>Unknown challenge type: {challenge.type}</div>;
	}
}
