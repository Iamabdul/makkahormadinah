import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, RefreshCw } from "lucide-react";

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onPlayAgain?: () => void;
  canPlayAgain: boolean;
  timeUntilNextGame?: string;
}

export default function ResultsScreen({ 
  score, 
  totalQuestions, 
  onPlayAgain, 
  canPlayAgain,
  timeUntilNextGame 
}: ResultsScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent! MashaAllah, well done!";
    if (percentage >= 60) return "Good work! Keep learning!";
    if (percentage >= 40) return "Not bad! There's room for improvement.";
    return "Keep studying! You'll do better next time.";
  };

  const getStarCount = () => {
    if (percentage >= 80) return 3;
    if (percentage >= 60) return 2;
    return 1;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-8 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-serif font-semibold text-foreground">
            Quiz Complete!
          </h2>
          
          <motion.div 
            className="flex justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {Array.from({ length: 3 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: i < getStarCount() ? 1 : 0.3 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Star 
                  className={`w-8 h-8 ${
                    i < getStarCount() 
                      ? 'text-primary fill-primary' 
                      : 'text-muted-foreground'
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2" data-testid="text-score-display">
              {score}/{totalQuestions}
            </div>
            <div className="text-2xl text-muted-foreground">
              {percentage}% Correct
            </div>
          </div>
          
          <p className="text-lg text-foreground" data-testid="text-performance-message">
            {getPerformanceMessage()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          {canPlayAgain ? (
            <Button 
              onClick={onPlayAgain}
              size="lg"
              className="w-full max-w-sm mx-auto hover-elevate"
              data-testid="button-play-again"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          ) : (
            <div className="space-y-2">
              <p className="text-muted-foreground">
                You've completed today's quiz!
              </p>
              <p className="text-sm text-muted-foreground" data-testid="text-next-game-time">
                Come back {timeUntilNextGame} for 5 new questions
              </p>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground">
            Continue your Islamic learning journey daily
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}