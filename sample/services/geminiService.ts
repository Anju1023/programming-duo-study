import { GoogleGenAI, Type } from "@google/genai";
import { LessonContent, AIExplanation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-3-flash-preview";

export const generateDailyLesson = async (userLevel: number, topicInterest: string = "JavaScriptの基礎"): Promise<LessonContent> => {
  const prompt = `
    あなたは「木漏れ日コード」というアプリの、とても優しく、励まし上手なプログラミングの先生（メンター）です。
    かつてプログラミングに挫折したことのある日本人初心者（レベル: ${userLevel}）のために、
    「${topicInterest}」に関する、ごく短いクイズ形式のレッスンを1つ作成してください。

    【制約事項】
    1. **全ての文章を自然で優しい日本語**で書いてください。
    2. 専門用語（const, console.logなど）は英語で構いませんが、説明は日本語で行ってください。
    3. トーン：丁寧語（です・ます調）。「〜しましょう」「〜ですね」といった、語りかけるような口調で。
    
    【JSON出力フォーマット】
    以下のスキーマに従ってJSONオブジェクトを返してください。
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            topic: { type: Type.STRING },
            intro: { type: Type.STRING },
            question: { type: Type.STRING },
            codeTemplate: { type: Type.STRING },
            correctAnswer: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            explanation: { type: Type.STRING },
          },
          required: ["id", "topic", "intro", "question", "codeTemplate", "correctAnswer", "options", "explanation"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as LessonContent;
    }
    throw new Error("Empty response");
  } catch (error) {
    return {
      id: "fallback-1",
      topic: "はじめての変数",
      intro: "データを入れておく「箱」のことを変数と呼びます。プログラミングの第一歩ですね。",
      question: "定数（一度入れたら書き換えられない箱）を作るためのキーワードはどれでしょう？",
      codeTemplate: "____ greeting = 'こんにちは';",
      correctAnswer: "const",
      options: ["const", "let", "var", "function"],
      explanation: "constはconstant（定数）の略です。一度決めたら変わらない、安心な箱を作れますよ。",
    };
  }
};

export const generateDailyEncouragement = async (): Promise<string> => {
  const prompt = `
    プログラミングに挫折した経験がある20代の日本人デザイナーに向けた、今日の励ましの一言を日本語で作成してください。
    - 短く、心に響く、穏やかな言葉。
    - 「今日も一歩進んで偉いですね」「デザインの視点があるからこそ、コードも綺麗に書けますよ」といった内容。
    - 丁寧語（です・ます）。
    - 30文字以内。
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text || "今日もあなたのペースで、ゆっくり進みましょう。";
  } catch (e) {
    return "焦らなくて大丈夫。その一歩が宝物です。";
  }
};

export const evaluateAnswer = async (
  lesson: LessonContent,
  userAnswer: string
): Promise<AIExplanation> => {
  if (userAnswer === lesson.correctAnswer) {
    return {
      isCorrect: true,
      message: "素晴らしい正解です！その調子です。",
      encouragement: "一歩ずつ、確実に進んでいますね。",
    };
  }

  const prompt = `
    プログラミング学習中のユーザーが不正解を選びました。
    優しく、次に繋がるようなフィードバックを日本語で作成してください。
    問題: ${lesson.question}
    正解: ${lesson.correctAnswer}
    ユーザーの回答: ${userAnswer}
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            message: { type: Type.STRING },
            encouragement: { type: Type.STRING },
          },
        },
      },
    });
    
    if (response.text) {
      const result = JSON.parse(response.text) as AIExplanation;
      result.isCorrect = false; 
      return result;
    }
    return { isCorrect: false, message: "もう少しです！", encouragement: "もう一度考えてみましょう。" };
  } catch (e) {
    return { isCorrect: false, message: "惜しい！違います。", encouragement: "あきらめないで！" };
  }
};