"use client";

import { QuizChallenge } from "./quiz-challenge";
import { CodeChallenge } from "./code-challenge";

interface ChallengeRendererProps {
  challenge: any; // Type properly
  sessionState: any; // user inputs
  onSelectOption: (option: string) => void;
  onCodeChange: (code: string) => void;
  status: "idle" | "correct" | "incorrect";
}

export function ChallengeRenderer({
  challenge,
  sessionState,
  onSelectOption,
  onCodeChange,
  status,
}: ChallengeRendererProps) {
  if (!challenge) return null;

  switch (challenge.type) {
    case "SELECT":
      return (
        <QuizChallenge
          question={challenge.question}
          options={challenge.options}
          selectedOption={sessionState.selectedOption}
          onSelect={onSelectOption}
          status={status}
        />
      );
    case "CODE":
      return (
         <CodeChallenge 
            question={challenge.question}
            initialCode={challenge.initialCode}
            code={sessionState.code}
            onChange={onCodeChange}
            status={status}
         />
      );
    default:
      return <div>Unknown challenge type: {challenge.type}</div>;
  }
}
