import React, { useState, useEffect } from 'react';
import { ScreenState, UserProgress, LessonContent } from './types';
import { generateDailyLesson, evaluateAnswer, generateDailyEncouragement } from './services/geminiService';
import { Mascot } from './components/Mascot';
import { Button } from './components/Button';
import { BookOpen, Check, RefreshCw, Star, Trophy, Home, Settings, ArrowRight, Heart } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>(ScreenState.WELCOME);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    streak: 3,
    xp: 120,
    lastLessonDate: new Date().toISOString(),
  });
  
  const [currentLesson, setCurrentLesson] = useState<LessonContent | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; encouragement: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dailyQuote, setDailyQuote] = useState<string>("読み込み中...");

  useEffect(() => {
    const fetchQuote = async () => {
      const quote = await generateDailyEncouragement();
      setDailyQuote(quote);
    };
    fetchQuote();
  }, [currentScreen]);

  const startLesson = async () => {
    setIsLoading(true);
    const lesson = await generateDailyLesson(userProgress.level, "JavaScriptの基礎");
    setCurrentLesson(lesson);
    setFeedback(null);
    setSelectedOption(null);
    setIsLoading(false);
    setCurrentScreen(ScreenState.LESSON);
  };

  const checkAnswer = async () => {
    if (!currentLesson || !selectedOption) return;
    setIsLoading(true);
    const result = await evaluateAnswer(currentLesson, selectedOption);
    setFeedback(result);
    setIsLoading(false);
  };

  const handleNext = () => {
    if (feedback?.isCorrect) {
      setUserProgress(prev => ({ ...prev, xp: prev.xp + 50 }));
      setCurrentScreen(ScreenState.SUCCESS);
    } else {
      setSelectedOption(null);
      setFeedback(null);
    }
  };

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-komorebi-bg animate-fade-in">
      <div className="mb-8">
        <Mascot emotion="happy" size="lg" />
      </div>
      <h1 className="text-3xl font-bold text-komorebi-text mb-2">木漏れ日コード</h1>
      <p className="text-gray-500 mb-8 max-w-xs leading-relaxed">
        あせらず、ゆっくり。<br/>
        あなたのペースでプログラミングを。<br/>
        <span className="text-xs mt-2 block opacity-70">1日5分から始める優しい習慣</span>
      </p>
      <Button onClick={() => setCurrentScreen(ScreenState.DASHBOARD)} fullWidth className="max-w-xs text-lg">
        今日も始める
      </Button>
      <p className="mt-4 text-sm text-gray-400">
        現在 {userProgress.streak}日 連続継続中！ 🌱
      </p>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-komorebi-bg pb-24 animate-fade-in">
      <div className="p-6 pt-12 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-komorebi-text">おかえりなさい</h2>
          <p className="text-gray-500 text-sm">今日は「JavaScriptの基礎」を覗いてみましょう。</p>
        </div>
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-50">
          <Mascot emotion="neutral" size="sm" />
        </div>
      </div>

      {/* AI Motivation Quote */}
      <div className="px-6 mb-8">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 relative">
          <div className="text-komorebi-secondary">
            <Heart size={24} className="fill-current" />
          </div>
          <p className="text-sm text-komorebi-text italic font-medium leading-relaxed">
            「{dailyQuote}」
          </p>
        </div>
      </div>

      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="bg-orange-100 p-2 rounded-full mb-2 text-orange-500">
            <RefreshCw size={20} />
          </div>
          <span className="text-2xl font-bold text-komorebi-text">{userProgress.streak}日</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Streak</span>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
           <div className="bg-yellow-100 p-2 rounded-full mb-2 text-yellow-600">
            <Star size={20} />
          </div>
          <span className="text-2xl font-bold text-komorebi-text">{userProgress.xp}</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">XP Point</span>
        </div>
      </div>

      <div className="px-6 mb-8">
        <div className="bg-komorebi-primary bg-opacity-10 p-6 rounded-[2.5rem] border-2 border-komorebi-primary border-opacity-10 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="font-bold text-komorebi-primary text-xl mb-1">本日の学び</h3>
            <p className="text-xs text-gray-600 mb-6">
              レベル {userProgress.level}: JavaScriptのきほん
            </p>
            <Button onClick={startLesson} fullWidth className="bg-komorebi-primary">
              スタート <ArrowRight size={18} />
            </Button>
          </div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-komorebi-primary opacity-5 rounded-full group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>

       <div className="px-6">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
                <div className="bg-komorebi-secondary bg-opacity-10 p-2 rounded-xl text-komorebi-secondary">
                    <BookOpen size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-700 text-sm">コラム：挫折は通過点</h4>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                        コードが動かないのは、あなたが悪いのではなく、ただの書き間違いです。デザイナーの感性があれば、必ず美しいコードが書けるようになります。
                    </p>
                </div>
            </div>
        </div>
       </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-10 py-5 flex justify-between items-center text-gray-400">
        <button className="text-komorebi-primary flex flex-col items-center">
            <Home size={24} />
            <span className="text-[10px] mt-1 font-bold">ホーム</span>
        </button>
        <button className="flex flex-col items-center hover:text-komorebi-primary transition-colors">
            <Trophy size={24} />
            <span className="text-[10px] mt-1">記録</span>
        </button>
        <button className="flex flex-col items-center hover:text-komorebi-primary transition-colors">
            <Settings size={24} />
            <span className="text-[10px] mt-1">設定</span>
        </button>
      </nav>
    </div>
  );

  const renderLesson = () => {
    if (isLoading && !currentLesson) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-komorebi-bg text-gray-500">
           <Mascot emotion="thinking" />
           <p className="mt-4 animate-pulse font-medium">心を込めて準備しています...</p>
        </div>
      );
    }
    if (!currentLesson) return null;
    return (
      <div className="min-h-screen bg-komorebi-bg flex flex-col animate-slide-up">
        <div className="w-full h-2 bg-gray-100">
            <div className="h-full bg-komorebi-primary w-1/3 rounded-r-full"></div>
        </div>
        <div className="flex-1 p-6 flex flex-col max-w-2xl mx-auto w-full">
            <div className="mb-6 flex items-center justify-between">
                 <button onClick={() => setCurrentScreen(ScreenState.DASHBOARD)} className="text-gray-400 text-sm hover:text-gray-600">✕ 休憩する</button>
                 <span className="text-[10px] font-bold text-komorebi-primary bg-komorebi-primary/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                    {currentLesson.topic}
                 </span>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-8 relative">
                <p className="text-komorebi-text leading-relaxed text-sm">
                    {currentLesson.intro}
                </p>
                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
            </div>
            <div className="mb-4">
                <Mascot emotion={feedback ? (feedback.isCorrect ? 'happy' : 'encouraging') : 'neutral'} size="sm" />
            </div>
            <h3 className="text-xl font-bold text-komorebi-text mb-6">
                {currentLesson.question}
            </h3>
            <div className="bg-slate-800 rounded-3xl p-6 shadow-xl mb-8 font-mono text-white relative overflow-hidden">
                 <div className="flex gap-1.5 mb-6 opacity-30">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                 </div>
                 <pre className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                    {currentLesson.codeTemplate.split('____').map((part, i) => (
                        <React.Fragment key={i}>
                            {part}
                            {i < currentLesson.codeTemplate.split('____').length - 1 && (
                                <span className={`inline-block min-w-[80px] border-b-2 text-center transition-all px-2 ${
                                    selectedOption ? 'border-komorebi-secondary text-komorebi-secondary font-bold' : 'border-gray-600 text-gray-600'
                                }`}>
                                    {selectedOption || '???'}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                 </pre>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-10">
                {currentLesson.options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => !feedback && setSelectedOption(opt)}
                        disabled={!!feedback}
                        className={`p-4 rounded-2xl border-2 font-mono text-sm transition-all text-center active:scale-95 ${
                            selectedOption === opt 
                            ? 'border-komorebi-primary bg-komorebi-primary/10 text-komorebi-primary shadow-inner' 
                            : 'border-gray-100 bg-white text-gray-500 hover:border-komorebi-primary/30'
                        }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
            <div className="flex-1"></div>
            {feedback ? (
                <div className={`fixed bottom-0 left-0 right-0 p-8 rounded-t-[3rem] shadow-2xl animate-slide-up ${
                    feedback.isCorrect ? 'bg-green-50/95' : 'bg-orange-50/95'
                } backdrop-blur-md`}>
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-full ${feedback.isCorrect ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                                {feedback.isCorrect ? <Check size={24} /> : <RefreshCw size={24} />}
                            </div>
                            <span className={`text-xl font-bold ${feedback.isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
                                {feedback.isCorrect ? 'すごい！正解です' : 'おしいです！'}
                            </span>
                        </div>
                        <p className="text-gray-700 text-sm mb-2 font-medium">{feedback.message}</p>
                        <p className="text-gray-500 text-xs mb-6 italic">{feedback.encouragement}</p>
                        <Button fullWidth onClick={handleNext} className={feedback.isCorrect ? 'bg-komorebi-primary' : 'bg-komorebi-secondary'}>
                            {feedback.isCorrect ? '次のステップへ' : 'もう一度考える'}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="sticky bottom-6">
                    <Button fullWidth onClick={checkAnswer} disabled={!selectedOption || isLoading} className="shadow-2xl h-14">
                        {isLoading ? '先生が確認しています...' : '答えを出す'}
                    </Button>
                </div>
            )}
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="min-h-screen bg-komorebi-bg flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <Mascot emotion="happy" size="lg" />
        <h2 className="text-4xl font-bold text-komorebi-text mt-8 mb-4">完璧です！</h2>
        <p className="text-gray-500 mb-10 max-w-xs leading-relaxed">
            今日の「できた」を大切に。<br/>
            明日のあなたに繋がります。
        </p>
        <div className="bg-white p-8 rounded-[3rem] shadow-sm w-full max-w-xs mb-10 border border-gray-50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Today's Reward</p>
            <div className="text-5xl font-bold text-komorebi-primary flex items-center justify-center gap-1">
                +50<span className="text-xl text-gray-300 font-medium ml-1">XP</span>
            </div>
        </div>
        <Button onClick={() => setCurrentScreen(ScreenState.DASHBOARD)} fullWidth className="max-w-xs h-14 text-lg">
            ホームに戻る
        </Button>
    </div>
  );

  return (
    <>
      {currentScreen === ScreenState.WELCOME && renderWelcome()}
      {currentScreen === ScreenState.DASHBOARD && renderDashboard()}
      {currentScreen === ScreenState.LESSON && renderLesson()}
      {currentScreen === ScreenState.SUCCESS && renderSuccess()}
    </>
  );
}