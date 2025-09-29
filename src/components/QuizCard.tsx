import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Chapter } from "@/shared/schema";

interface QuizCardProps {
  chapter: Chapter;
  onAnswer: (answer: "makkah" | "madinah") => void;
  isAnswering: boolean;
}

export default function QuizCard({ chapter, onAnswer, isAnswering }: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-8 text-center space-y-6">
        <div className="space-y-4">
          <motion.h2 
            className="text-2xl font-serif font-semibold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {chapter.name_complex}
          </motion.h2>
          
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-3xl font-arabic text-primary" dir="rtl">
              {chapter.name_arabic}
            </p>
            <p className="text-lg text-muted-foreground">
            &quot;{chapter.translated_name.name}&quot;
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-medium text-foreground">
            Where was this chapter revealed?
          </h3>
          
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onAnswer("makkah")}
              disabled={isAnswering}
              className="min-w-32 hover-elevate"
              data-testid="button-makkah"
            >
              Makkah
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onAnswer("madinah")}
              disabled={isAnswering}
              className="min-w-32 hover-elevate"
              data-testid="button-madinah"
            >
              Madinah
            </Button>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}