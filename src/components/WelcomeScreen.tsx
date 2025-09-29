import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play, BookOpen } from "lucide-react";

interface WelcomeScreenProps {
  onStartQuiz: () => void;
  questionsRemaining: number;
  hasPlayedToday: boolean;
}

export default function WelcomeScreen({ onStartQuiz, questionsRemaining, hasPlayedToday }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-8 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <BookOpen className="w-16 h-16 text-primary" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl font-serif font-bold text-foreground">
            Makkah or Madinah
          </h1>
          
          <p className="text-xl font-arabic text-primary" dir="rtl">
            مكة أم المدينة
          </p>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Test your knowledge of the Quran by identifying where each chapter was revealed
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {hasPlayedToday ? (
            <div className="space-y-4">
              <p className="text-lg text-foreground">
                Welcome back!
              </p>
              <p className="text-muted-foreground">
                You&apos;ve completed today&apos;s quiz. Come back tomorrow for new questions!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">1</div>
                  <div className="text-sm text-muted-foreground">Per Day</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary" data-testid="text-remaining-count">
                    {questionsRemaining}
                  </div>
                  <div className="text-sm text-muted-foreground">Remaining</div>
                </div>
              </div>

              <Button 
                onClick={onStartQuiz}
                size="lg"
                className="w-full max-w-sm mx-auto hover-elevate"
                data-testid="button-start-quiz"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Today&apos;s Quiz
              </Button>
            </div>
          )}
          
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            &quot;And it is We who have sent down the Quran and indeed, We will be its guardian.&quot; - Quran 15:9
          </motion.p>
        </motion.div>
      </Card>
    </motion.div>
  );
}