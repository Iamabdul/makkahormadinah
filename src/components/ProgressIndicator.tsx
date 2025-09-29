import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export default function ProgressIndicator({ currentQuestion, totalQuestions, score }: ProgressIndicatorProps) {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span data-testid="text-question-counter">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span data-testid="text-score">
          Score: {score}/{totalQuestions}
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
      
      <div className="flex justify-between">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <motion.div
            key={i}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
              i < currentQuestion
                ? 'bg-primary border-primary text-primary-foreground'
                : i === currentQuestion
                ? 'border-primary text-primary'
                : 'border-muted text-muted-foreground'
            }`}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: i === currentQuestion ? 1.1 : 1,
              opacity: 1
            }}
            transition={{ duration: 0.2 }}
            data-testid={`progress-step-${i + 1}`}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>
    </div>
  );
}