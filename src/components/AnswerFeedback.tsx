import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AnswerFeedbackProps {
  isCorrect: boolean;
  correctAnswer: "makkah" | "madinah";
  userAnswer: "makkah" | "madinah";
  onContinue: () => void;
}

export default function AnswerFeedback({ 
  isCorrect, 
  correctAnswer, 
  userAnswer, 
  onContinue 
}: AnswerFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onContinue}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <Card className="p-6 text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            {isCorrect ? (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h3 className="text-xl font-semibold text-foreground">
              {isCorrect ? "Correct!" : "Incorrect"}
            </h3>
            
            {!isCorrect && (
              <p className="text-muted-foreground">
                The correct answer is <span className="font-semibold capitalize text-foreground">{correctAnswer}</span>
              </p>
            )}
          </motion.div>
          
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Tap anywhere to continue
          </motion.p>
        </Card>
      </motion.div>
    </motion.div>
  );
}