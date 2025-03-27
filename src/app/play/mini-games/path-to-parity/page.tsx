"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { parityQuestions } from "@/data/quiz/pathToParity";
import { Brain, Trophy, ArrowRight } from "lucide-react";

const gameInstructions = {
  title: "How to Play",
  steps: [
    "Move forward by making inclusive choices",
    "Clear barriers to create a path to equality",
    "Each correct choice earns points",
    "Reach the finish line by completing all questions",
    "Become a Parity Pioneer!"
  ]
};

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function PathToParityPage() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [barriersCleared, setBarriersCleared] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<typeof parityQuestions>([]);
  const [attempts, setAttempts] = useState(0);
  const [questionScores, setQuestionScores] = useState<Array<{ attempts: number; points: number }>>([]);

  useEffect(() => {
    // Select 6 random questions when the game starts
    const shuffled = shuffleArray(parityQuestions);
    const selected = shuffled.slice(0, 6);
    // Shuffle options for each selected question
    const withShuffledOptions = selected.map(question => ({
      ...question,
      options: shuffleArray(question.options)
    }));
    setSelectedQuestions(withShuffledOptions);
  }, []);

  const startGame = () => {
    if (playerName.trim()) {
      setGameStarted(true);
    }
  };

  const getPointsForAttempt = () => {
    switch (attempts) {
      case 0: return 10;
      case 1: return 9;
      case 2: return 8;
      default: return 8;
    }
  };

  const handleChoice = (optionId: number) => {
    if (isTransitioning) return;
    
    const question = selectedQuestions[currentLevel];
    const option = question.options.find(opt => opt.id === optionId);
    
    if (option?.isCorrect) {
      const points = getPointsForAttempt();
      setScore(prev => prev + points);
      setBarriersCleared(1);
      setFeedback(`Correct! +${points} points`);
      
      // Record the score for this question
      setQuestionScores(prev => [
        ...prev,
        { attempts: attempts + 1, points }
      ]);
      
      if (barriersCleared === 0) {
        if (currentLevel === selectedQuestions.length - 1) {
          setGameCompleted(true);
        } else {
          setCurrentLevel(prev => prev + 1);
          setBarriersCleared(0);
          setFeedback("");
          setAttempts(0); // Reset attempts for next question
        }
      }
    } else {
      setAttempts(prev => prev + 1);
      const nextPoints = getPointsForAttempt();
      setFeedback(`${option?.feedback || "Try again!"} (Next correct answer: +${nextPoints} points)`);
    }
  };

  const resetGame = () => {
    const shuffled = shuffleArray(parityQuestions);
    const selected = shuffled.slice(0, 6);
    const withShuffledOptions = selected.map(question => ({
      ...question,
      options: shuffleArray(question.options)
    }));
    setSelectedQuestions(withShuffledOptions);
    
    setCurrentLevel(0);
    setScore(0);
    setBarriersCleared(0);
    setFeedback("");
    setGameCompleted(false);
    setGameStarted(false);
    setPlayerName("");
    setIsTransitioning(false);
    setAttempts(0);
    setQuestionScores([]);
  };

  const totalSteps = selectedQuestions.length * 3;
  const question = selectedQuestions[currentLevel];

  if (!gameStarted) {
    return (
      <main className="relative min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 pt-9">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Path to Parity
              </h1>
              <p className="text-xl text-foreground/90">
                Guide your group to equality and inclusion
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-2">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-semibold text-foreground">{gameInstructions.title}</h2>
                </div>
                <div className="space-y-3">
                  {gameInstructions.steps.map((step: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 text-left"
                    >
                      <ArrowRight className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <p className="text-foreground/70">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your name (optional)"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full max-w-md px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none"
              />
              <button
                onClick={startGame}
                className="px-6 py-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-400 font-medium transition-all duration-300"
              >
                Start Game
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  if (gameCompleted) {
    return (
      <main className="relative min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Game Complete!
              </h1>
              <div className="flex items-center justify-center space-x-2">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <p className="text-2xl text-foreground/90">
                  {playerName ? `${playerName}: ` : ""}{score} points
                </p>
              </div>
              <p className="text-xl text-foreground/70">
                {score >= 30 ? "Parity Pioneer" : score >= 20 ? "Equality Explorer" : "Inclusion Learner"}
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Question Scorecard</h2>
                <div className="grid gap-3">
                  {selectedQuestions.map((question, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {questionScores[index]?.attempts === 1 ? "⭐" : "✨"}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Question {index + 1}</div>
                          <div className="text-sm text-foreground/70">{question.title}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-purple-400">
                          +{questionScores[index]?.points} pts
                        </div>
                        <div className="text-sm text-foreground/70">
                          {questionScores[index]?.attempts} {questionScores[index]?.attempts === 1 ? "try" : "tries"}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-center text-foreground/70">
                  ⭐ = First try success | ✨ = Multiple attempts
                </div>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="px-6 py-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-400 font-medium transition-all duration-300"
            >
              Play Again
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Path to Parity
            </h1>
            <div className="flex items-center justify-between text-sm text-foreground/70">
              <span>Question {currentLevel + 1} of {selectedQuestions.length}</span>
              <span>Score: {score}</span>
            </div>
          </div>

          {question && (
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground">{question.title}</h2>
                  <p className="text-foreground/70">{question.description}</p>
                </div>

                <div className="relative py-8">
                  {/* Path Steps */}
                  <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: selectedQuestions.length }).map((_, index) => {
                      const isCurrentStep = index === currentLevel;
                      const isPastStep = index < currentLevel;
                      const isLastStep = index === selectedQuestions.length - 1;

                      return (
                        <div key={index} className="relative">
                          {/* Star emoji for completed steps */}
                          {(isPastStep || (isCurrentStep && barriersCleared === 1)) && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-2xl z-10"
                            >
                              ✨
                            </motion.div>
                          )}
                          
                          {/* Step marker */}
                          <div 
                            className={`h-16 rounded-lg border transition-all duration-300 ${
                              isPastStep 
                                ? "bg-purple-500/30 border-purple-500" 
                                : isCurrentStep
                                ? "bg-purple-500/20 border-purple-500 animate-pulse"
                                : "bg-black/20 border-white/10"
                            }`}
                          >
                            {/* Emoji indicators */}
                            <div className="absolute inset-0 flex items-center justify-center text-2xl">
                              {isCurrentStep && barriersCleared === 0 && "👥"}
                              {isLastStep && !isPastStep && !isCurrentStep && "🏁"}
                              {!isLastStep && !isPastStep && !isCurrentStep && "🚫"}
                            </div>
                          </div>
                          
                          {/* Question number */}
                          <div className="absolute -top-8 left-0 text-sm text-foreground/70">
                            Q{index + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress line */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-purple-500/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${((currentLevel + (barriersCleared ? 1 : 0)) / selectedQuestions.length) * 100}%`,
                        transition: { duration: 0.5, ease: "easeInOut" }
                      }}
                      className="h-full bg-purple-500"
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center text-foreground/90"
                    >
                      {feedback}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Choose an action:</h3>
                  <div className="grid gap-3">
                    {question.options.map((option) => (
                      <motion.button
                        key={option.id}
                        onClick={() => handleChoice(option.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all duration-300"
                      >
                        {option.text}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">SDG Goals:</h3>
                  <div className="space-y-2">
                    {question.sdg.map((goal) => (
                      <div key={goal.number} className="text-sm text-foreground/70">
                        SDG {goal.number}: {goal.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
} 