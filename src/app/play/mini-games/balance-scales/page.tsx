"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GridBackground } from "@/components/ui/grid-background";
import { Navbar } from "@/components/Navbar";
import { Scale } from "./components/Scale";
import { gameRounds, GameRound } from "./game-data";
import { CheckCircle, XCircle, ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameState {
  value: number;
  target: number;
  score: number;
  isComplete: boolean;
  selectedOption: number | null;
  showFeedback: boolean;
}

// Types
type Scale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // 0 = far left, 5 = balanced, 10 = far right

interface Round {
  id: number;
  scenario: string;
  description: string;
  initialScale: Scale;
  options: {
    id: number;
    text: string;
    impact: number; // How much this moves the scale (-5 to +5)
    feedback: string;
  }[];
}

export default function BalanceScalesGame() {
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    value: 5,
    target: 5,
    score: 0,
    isComplete: false,
    selectedOption: null,
    showFeedback: false
  });
  const [playerName, setPlayerName] = useState<string>("");
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // Current round data
  const currentRound = gameRounds[currentRoundIndex];

  // Handle option selection
  const handleOptionSelect = (optionId: number) => {
    const option = currentRound.options.find(opt => opt.id === optionId);
    if (!option) return;

    // Calculate new scale value
    const newScale = Math.max(0, Math.min(10, gameState.value + option.impact));
    
    setGameState(prev => ({
      ...prev,
      value: newScale,
      selectedOption: optionId,
      showFeedback: true,
      score: prev.score + (newScale === 5 ? 10 : 0)
    }));

    if (newScale === 5) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  // Handle next round
  const handleNextRound = () => {
    if (currentRoundIndex < gameRounds.length - 1) {
      setCurrentRoundIndex(prev => prev + 1);
      setGameState(prev => ({
        ...prev,
        value: gameRounds[currentRoundIndex + 1].initialScale,
        selectedOption: null,
        showFeedback: false
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        isComplete: true
      }));
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameState({
      value: currentRound.initialScale,
      target: 5,
      score: 0,
      isComplete: false,
      selectedOption: null,
      showFeedback: false
    });
    setCurrentRoundIndex(0);
    setStreak(0);
  };

  const handlePlayAgain = () => {
    setGameState({
      value: gameRounds[0].initialScale,
      target: 5,
      score: 0,
      isComplete: false,
      selectedOption: null,
      showFeedback: false
    });
    setCurrentRoundIndex(0);
    setStreak(0);
  };

  const renderScreen = () => {
    if (!gameStarted) {
      return (
        <div className="space-y-6">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Welcome!</h2>
            <p className="text-foreground/80 mb-6">
              Enter your name to begin balancing the scales of equality. Each choice you make impacts the balance - choose wisely!
            </p>
            <div className="flex gap-4">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name (optional)"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-red-500/50"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartGame}
                className="px-6 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-white/10 rounded-lg text-foreground font-medium transition-all duration-300 hover:border-red-500/50"
              >
                Start Game
              </motion.button>
            </div>
          </div>

          {/* Game Instructions */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How to Play</h2>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <span>Each round presents a scenario with an unbalanced scale</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                <span>Choose actions to move the scale towards balance</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span>Earn points for achieving balance and learn about equality</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Complete all rounds to become a Balance Master!</span>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    if (gameState.isComplete) {
      return (
        <div className="space-y-8 text-center">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-yellow-500/20 border border-yellow-500/30">
              <Trophy className="w-12 h-12 text-yellow-400" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Congratulations{playerName ? `, ${playerName}` : ""}!
            </h2>
            <p className="text-xl text-foreground/80">
              You've completed the Balance the Scales challenge
            </p>
            <p className="text-2xl font-semibold text-red-400">
              Final Score: {gameState.score}
            </p>
            {gameState.score >= 45 && (
              <div className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                Balance Master Achieved!
              </div>
            )}
          </div>

          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlayAgain}
              className="px-6 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-white/10 rounded-lg text-foreground font-medium transition-all duration-300 hover:border-red-500/50"
            >
              Play Again
            </motion.button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Score and Progress */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-foreground/70">Round {currentRoundIndex + 1} of {gameRounds.length}</p>
            <p className="text-lg font-medium text-foreground">Score: {gameState.score}</p>
          </div>
          {streak > 0 && (
            <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
              {streak} in a row!
            </div>
          )}
        </div>

        {/* Scenario */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{currentRound.scenario}</h2>
          <p className="text-foreground/80">{currentRound.description}</p>
        </div>

        {/* Scale Visualization */}
        <div className="flex justify-center py-8">
          <Scale value={gameState.value} size="lg" />
        </div>

        {/* Options */}
        <div className="space-y-4">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="w-12 text-left">#</th>
                <th className="text-left">Option</th>
              </tr>
            </thead>
            <tbody>
              {currentRound.options.map((option) => (
                <tr key={option.id}>
                  <td className="align-top pt-2">{option.id}</td>
                  <td>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={gameState.showFeedback}
                      className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                        gameState.selectedOption === option.id
                          ? "bg-red-500/20 border-red-500/50"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {option.text}
                    </motion.button>
                    {gameState.showFeedback && gameState.selectedOption === option.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        <p className="text-sm text-foreground/80">{option.feedback}</p>
                        {gameState.value === 5 && (
                          <div className="mt-2 flex items-center gap-2 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Perfect balance!</span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {gameState.showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-6"
            >
              <Button
                onClick={handleNextRound}
                className="bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30"
              >
                {currentRoundIndex < gameRounds.length - 1 ? (
                  <>Next Round <ArrowRight className="ml-2 w-4 h-4" /></>
                ) : (
                  'Complete Game'
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0">
        <GridBackground />
      </div>

      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-6">
            Balance the Scales
          </h1>
          <p className="text-xl text-foreground/90 mb-8">
            Promote gender equality and social inclusion by balancing virtual scales. Make choices that create positive change!
          </p>

          {renderScreen()}
        </motion.div>
      </div>
    </main>
  );
} 