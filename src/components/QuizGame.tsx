"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chapter } from "@/shared/schema";
import WelcomeScreen from "./WelcomeScreen";
import QuizCard from "./QuizCard";
import ProgressIndicator from "./ProgressIndicator";
import AnswerFeedback from "./AnswerFeedback";
import ResultsScreen from "./ResultsScreen";
import LoadingSpinner from "./LoadingSpinner";

type GameState = "welcome" | "loading" | "playing" | "feedback" | "results";

interface QuizGameProps {
  className?: string;
  chapters: Chapter[];
}

export default function QuizGame({ className, chapters }: QuizGameProps) {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [currentQuestions, setCurrentQuestions] = useState<Chapter[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState<"makkah" | "madinah" | null>(
    null
  );
  const [hasPlayedToday] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);

  const totalQuestions = 5;
  const questionsRemaining = hasPlayedToday ? 0 : totalQuestions;

  const startQuiz = () => {
    setGameState("loading");

    setTimeout(() => {
      const shuffled = [...chapters].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, totalQuestions);
      setCurrentQuestions(selected);
      setCurrentQuestionIndex(0);
      setScore(0);
      setGameState("playing");
    }, 1500);
  };

  const handleAnswer = (answer: "makkah" | "madinah") => {
    if (isAnswering) return;

    setIsAnswering(true);
    setUserAnswer(answer);

    const currentChapter = currentQuestions[currentQuestionIndex];
    const isCorrect = answer === currentChapter.revelation_place;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setGameState("feedback");
      setIsAnswering(false);
    }, 300);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer(null);
      setGameState("playing");
    } else {
      setGameState("results");
    }
  };

  const resetGame = () => {
    setGameState("welcome");
    setCurrentQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswer(null);
  };

  const currentChapter = currentQuestions[currentQuestionIndex];
  const isCorrect = userAnswer === currentChapter?.revelation_place;

  return (
    <div
      className={`min-h-screen bg-background flex flex-col ${className || ""}`}
    >
      <div className="flex-1 flex flex-col justify-center p-4 space-y-6">
        {gameState === "playing" && (
          <ProgressIndicator
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            score={score}
          />
        )}

        <AnimatePresence mode="wait">
          {gameState === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WelcomeScreen
                onStartQuiz={startQuiz}
                questionsRemaining={questionsRemaining}
                hasPlayedToday={hasPlayedToday}
              />
            </motion.div>
          )}

          {gameState === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <LoadingSpinner message="Preparing your quiz..." />
            </motion.div>
          )}

          {gameState === "playing" && currentChapter && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizCard
                chapter={currentChapter}
                onAnswer={handleAnswer}
                isAnswering={isAnswering}
              />
            </motion.div>
          )}

          {gameState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultsScreen
                score={score}
                totalQuestions={totalQuestions}
                onPlayAgain={resetGame}
                canPlayAgain={!hasPlayedToday}
                timeUntilNextGame="tomorrow"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {gameState === "feedback" && currentChapter && userAnswer && (
          <AnswerFeedback
            isCorrect={isCorrect}
            correctAnswer={currentChapter.revelation_place}
            userAnswer={userAnswer}
            onContinue={handleContinue}
          />
        )}
      </div>
    </div>
  );
}
