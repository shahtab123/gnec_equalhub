"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GridBackground } from "@/components/ui/grid-background";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Navbar } from "@/components/Navbar";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";

// Import quiz data
import { mcqQuestions } from "@/data/quiz/mcq";
import { tfQuestions } from "@/data/quiz/tf";
import { pledgeTasks } from "@/data/quiz/pledge";
import { microAdvocacyTasks } from "@/data/quiz/microAdvocacy";
import { mtfQuestions } from "@/data/quiz/mtf";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface TFQuestion {
  id: number;
  scenario: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

interface MatchingQuestion {
  id: number;
  fact: string;
  statistic: string;
}

interface Pledge {
  id: number;
  title: string;
  description: string;
  impact: string;
}

interface MicroAdvocacy {
  id: number;
  task: string;
  impact: string;
  resources: string[];
}

export default function QuestPage() {
  const [userName, setUserName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // State for current questions
  const [currentQuestions, setCurrentQuestions] = useState({
    mcq: null as any,
    tf: null as any,
    mtf: null as any,
    pledge: null as any,
    microAdvocacy: null as any,
  });

  const [selectedMCQAnswer, setSelectedMCQAnswer] = useState<string | null>(null);
  const [showMCQFeedback, setShowMCQFeedback] = useState(false);

  const [selectedTFAnswer, setSelectedTFAnswer] = useState<boolean | null>(null);
  const [showTFFeedback, setShowTFFeedback] = useState(false);

  const [mtfAnswers, setMtfAnswers] = useState<{[key: string]: string}>({});
  const [showMTFFeedback, setShowMTFFeedback] = useState(false);
  const [shuffledMatches, setShuffledMatches] = useState<string[]>([]);

  const [pledgeText, setPledgeText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showWordLimitWarning, setShowWordLimitWarning] = useState(false);

  const [microAdvocacyText, setMicroAdvocacyText] = useState("");
  const [microAdvocacyWordCount, setMicroAdvocacyWordCount] = useState(0);
  const [showMicroAdvocacyWarning, setShowMicroAdvocacyWarning] = useState(false);

  // Initialize questions when starting the quiz
  useEffect(() => {
    if (currentStep === 1) {
      const selectedMTF = mtfQuestions[Math.floor(Math.random() * mtfQuestions.length)];
      const shuffled = [...selectedMTF.matches].sort(() => Math.random() - 0.5);
      
      setCurrentQuestions({
        mcq: mcqQuestions[Math.floor(Math.random() * mcqQuestions.length)],
        tf: tfQuestions[Math.floor(Math.random() * tfQuestions.length)],
        mtf: selectedMTF,
        pledge: pledgeTasks[Math.floor(Math.random() * pledgeTasks.length)],
        microAdvocacy: microAdvocacyTasks[Math.floor(Math.random() * microAdvocacyTasks.length)],
      });
      setShuffledMatches(shuffled);
    }
  }, [currentStep]);

  const handleStart = () => {
    if (userName.trim()) {
      setCurrentStep(1);
    }
  };

  const handleMCQAnswer = (selectedAnswer: string) => {
    setSelectedMCQAnswer(selectedAnswer);
    setShowMCQFeedback(true);
    const isCorrect = selectedAnswer === currentQuestions.mcq.answer;
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextAfterMCQ = () => {
    setAnswers([...answers, { 
      question: currentQuestions.mcq.question, 
      answer: selectedMCQAnswer, 
      correct: selectedMCQAnswer === currentQuestions.mcq.answer 
    }]);
    setCurrentStep(2);
    setSelectedMCQAnswer(null);
    setShowMCQFeedback(false);
  };

  const handleTFAnswer = (selectedAnswer: boolean) => {
    setSelectedTFAnswer(selectedAnswer);
    setShowTFFeedback(true);
    const isCorrect = selectedAnswer === currentQuestions.tf.answer;
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextAfterTF = () => {
    setAnswers([...answers, { 
      question: currentQuestions.tf.question, 
      answer: selectedTFAnswer, 
      correct: selectedTFAnswer === currentQuestions.tf.answer 
    }]);
    setCurrentStep(3);
    setSelectedTFAnswer(null);
    setShowTFFeedback(false);
  };

  const handleMTFAnswer = (option: string, match: string) => {
    setMtfAnswers(prev => ({
      ...prev,
      [option.charAt(0)]: match.charAt(0)
    }));
  };

  const handleMTFSubmit = () => {
    const correctAnswers = currentQuestions.mtf.answer.split(", ").reduce((acc: {[key: string]: string}, curr: string) => {
      const [option, match] = curr.split("-");
      acc[option] = match;
      return acc;
    }, {});

    const isCorrect = Object.entries(mtfAnswers).every(([option, match]) => correctAnswers[option] === match);
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, {
      question: currentQuestions.mtf.question,
      answer: mtfAnswers,
      correct: isCorrect,
      correctAnswers
    }]);

    setShowMTFFeedback(true);
  };

  const handleNextAfterMTF = () => {
    setCurrentStep(4);
    setMtfAnswers({});
    setShowMTFFeedback(false);
  };

  const handlePledgeInput = (text: string) => {
    const words = text.trim().split(/\s+/);
    const count = text.trim() === '' ? 0 : words.length;
    
    if (count <= 200) {
      setPledgeText(text);
      setWordCount(count);
      setShowWordLimitWarning(false);
    } else {
      setShowWordLimitWarning(true);
    }
  };

  const handleNextAfterPledge = () => {
    setAnswers([...answers, { question: currentQuestions.pledge.task, answer: pledgeText }]);
    setCurrentStep(5);
    setPledgeText("");
    setWordCount(0);
  };

  const handleMicroAdvocacyInput = (text: string) => {
    const words = text.trim().split(/\s+/);
    const count = text.trim() === '' ? 0 : words.length;
    
    if (count <= 200) {
      setMicroAdvocacyText(text);
      setMicroAdvocacyWordCount(count);
      setShowMicroAdvocacyWarning(false);
    } else {
      setShowMicroAdvocacyWarning(true);
    }
  };

  const handleMicroAdvocacySubmit = () => {
    setAnswers([...answers, { question: currentQuestions.microAdvocacy.task, answer: microAdvocacyText }]);
    setShowResults(true);
    setMicroAdvocacyText("");
    setMicroAdvocacyWordCount(0);
  };

  const handleDownloadPDF = () => {
    // Add print-specific styles
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body { background: #1a1a1a !important; color: white !important; }
        nav { display: none !important; }
        .fixed.inset-0 { display: none !important; }
        .pt-24 { padding-top: 1rem !important; }
        button { display: none !important; }
        * { color-adjust: exact !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      }
    `;
    document.head.appendChild(style);

    // Print
    window.print();

    // Cleanup
    document.head.removeChild(style);
  };

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0">
        <GridBackground />
      </div>

      <Navbar />

      <div className="relative max-w-4xl mx-auto px-4 pt-24">
        {currentStep === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12"
          >
            {/* Welcome Message */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Welcome to Quest Mode!
              </h1>
              <p className="text-2xl text-foreground/90">Are you ready for the challenge?</p>
            </div>

            {/* Name Input Section */}
            <div className="max-w-md mx-auto">
              <p className="text-lg text-foreground mb-4">Please enter your name to begin your quest:</p>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/10 border border-foreground/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-red-500/50"
                  placeholder="Enter your name"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStart}
                  className="px-8 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-foreground/10 rounded-xl text-foreground font-semibold transition-all duration-300 hover:border-red-500/50"
                >
                  Start Quest
                </motion.button>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
              {/* About Card */}
              <CardSpotlight className="p-8" color="red">
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">About the Quiz</h2>
                  </div>
                  <p className="text-foreground text-lg">
                    Test your knowledge about Sustainable Development Goals 5 (Gender Equality) and 10 (Reduced Inequalities) through an engaging interactive quiz.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-red-400/50 to-transparent"></div>
                      <h3 className="text-lg font-medium text-foreground">Quiz Structure</h3>
                      <div className="h-px flex-1 bg-gradient-to-l from-red-400/50 to-transparent"></div>
                    </div>
                    <ul className="text-foreground space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                        Multiple Choice Question
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                        True/False Question
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                        Match the Fact Challenge
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                        Pledge an Action
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                        Micro-Advocacy Task
                      </li>
                    </ul>
                  </div>
                </div>
              </CardSpotlight>

              {/* Rules Card */}
              <CardSpotlight className="p-8" color="blue">
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Rules & Guidelines</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-blue-400/50 to-transparent"></div>
                        <h3 className="text-lg font-medium text-foreground">Individual Mode</h3>
                        <div className="h-px flex-1 bg-gradient-to-l from-blue-400/50 to-transparent"></div>
                      </div>
                      <ul className="text-foreground space-y-3">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          Answer questions independently
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          No time limit
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          Review answers after completion
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                          Track your progress
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-blue-400/50 to-transparent"></div>
                        <h3 className="text-lg font-medium text-foreground">Group Mode</h3>
                        <div className="h-px flex-1 bg-gradient-to-l from-blue-400/50 to-transparent"></div>
                      </div>
                      <ul className="text-foreground space-y-3">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                          Compare scores with others
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                          Share pledges and advocacy ideas
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                          Engage in discussions
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                          Learn from different perspectives
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardSpotlight>

              {/* Use Cases Card */}
              <CardSpotlight className="p-8" color="green">
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">Use Cases</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-green-400/50 to-transparent"></div>
                        <h3 className="text-lg font-medium text-foreground">Professional Settings</h3>
                        <div className="h-px flex-1 bg-gradient-to-l from-green-400/50 to-transparent"></div>
                      </div>
                      <ul className="text-foreground space-y-3">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                          Office training sessions
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                          Team building activities
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                          Diversity workshops
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                          Corporate SDG initiatives
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-green-400/50 to-transparent"></div>
                        <h3 className="text-lg font-medium text-foreground">Educational Settings</h3>
                        <div className="h-px flex-1 bg-gradient-to-l from-green-400/50 to-transparent"></div>
                      </div>
                      <ul className="text-foreground space-y-3">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                          Classroom discussions
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                          Student group activities
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                          Awareness campaigns
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                          Research projects
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardSpotlight>
            </div>
          </motion.div>
        ) : !showResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10"
          >
            {/* Quiz Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1 mr-4">
                <h3 className="text-foreground text-lg font-medium">Welcome, {userName}!</h3>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div className="flex h-full">
                      <div className="bg-white/20 h-full transition-all duration-300" style={{ width: '20%', backgroundColor: currentStep >= 1 ? 'rgb(248 113 113 / 0.8)' : undefined }}></div>
                      <div className="bg-white/20 h-full transition-all duration-300" style={{ width: '20%', backgroundColor: currentStep >= 2 ? 'rgb(251 146 60 / 0.8)' : undefined }}></div>
                      <div className="bg-white/20 h-full transition-all duration-300" style={{ width: '20%', backgroundColor: currentStep >= 3 ? 'rgb(192 132 252 / 0.8)' : undefined }}></div>
                      <div className="bg-white/20 h-full transition-all duration-300" style={{ width: '20%', backgroundColor: currentStep >= 4 ? 'rgb(74 222 128 / 0.8)' : undefined }}></div>
                      <div className="bg-white/20 h-full transition-all duration-300" style={{ width: '20%', backgroundColor: currentStep >= 5 ? 'rgb(250 204 21 / 0.8)' : undefined }}></div>
                    </div>
                  </div>
                  <span className="text-foreground/80 text-sm whitespace-nowrap">Step {currentStep}/5</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(0)}
                className="px-4 py-2 bg-white/10 border border-foreground/20 rounded-lg text-foreground hover:bg-white/20 transition-colors duration-300"
              >
                Back to Home
              </motion.button>
            </div>

            {currentStep === 1 && currentQuestions.mcq && (
              <div id="mcq-section" className="bg-gradient-to-br from-red-500/40 via-red-500/30 to-transparent dark:from-red-500/20 dark:via-red-500/10 border border-red-500/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Multiple Choice Question</h2>
                <p className="text-xl text-foreground/90 mb-6">{currentQuestions.mcq.question}</p>
                <div className="space-y-4">
                  {currentQuestions.mcq.options.map((option: string, index: number) => {
                    const isSelected = option === selectedMCQAnswer;
                    const isCorrect = option === currentQuestions.mcq.answer;
                    let buttonStyle = "w-full text-left px-6 py-4 bg-white/10 border border-red-500/20 rounded-lg text-foreground hover:bg-white/20 transition-colors duration-300";
                    
                    if (showMCQFeedback) {
                      if (isCorrect) {
                        buttonStyle = "w-full text-left px-6 py-4 bg-green-500/20 border border-green-500/40 rounded-lg text-foreground";
                      } else if (isSelected && !isCorrect) {
                        buttonStyle = "w-full text-left px-6 py-4 bg-red-500/20 border border-red-500/40 rounded-lg text-foreground";
                      }
                    }

                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: showMCQFeedback ? 1 : 1.02 }}
                        whileTap={{ scale: showMCQFeedback ? 1 : 0.98 }}
                        onClick={() => !showMCQFeedback && handleMCQAnswer(option)}
                        className={buttonStyle}
                        disabled={showMCQFeedback}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showMCQFeedback && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                          {showMCQFeedback && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                {showMCQFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex justify-end"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNextAfterMCQ}
                      className="px-6 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-500/20 rounded-lg text-foreground font-medium transition-all duration-300"
                    >
                      Next Question
                    </motion.button>
                  </motion.div>
                )}
              </div>
            )}

            {currentStep === 2 && currentQuestions.tf && (
              <div id="tf-section" className="bg-gradient-to-br from-orange-500/40 via-orange-500/30 to-transparent dark:from-orange-500/20 dark:via-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">True or False</h2>
                <p className="text-xl text-foreground/90 mb-6">{currentQuestions.tf.question}</p>
                <div className="flex gap-4">
                  {[true, false].map((option) => {
                    const isSelected = option === selectedTFAnswer;
                    const isCorrect = option === currentQuestions.tf.answer;
                    let buttonStyle = "flex-1 px-6 py-4 bg-white/10 border border-orange-500/20 rounded-lg text-foreground hover:bg-white/20 transition-colors duration-300";
                    
                    if (showTFFeedback) {
                      if (isCorrect) {
                        buttonStyle = "flex-1 px-6 py-4 bg-green-500/20 border border-green-500/40 rounded-lg text-foreground";
                      } else if (isSelected && !isCorrect) {
                        buttonStyle = "flex-1 px-6 py-4 bg-red-500/20 border border-red-500/40 rounded-lg text-foreground";
                      }
                    }

                    return (
                      <motion.button
                        key={option.toString()}
                        whileHover={{ scale: showTFFeedback ? 1 : 1.02 }}
                        whileTap={{ scale: showTFFeedback ? 1 : 0.98 }}
                        onClick={() => !showTFFeedback && handleTFAnswer(option)}
                        className={buttonStyle}
                        disabled={showTFFeedback}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>{option ? 'True' : 'False'}</span>
                          {showTFFeedback && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                          {showTFFeedback && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                {showTFFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex justify-end"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNextAfterTF}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500/20 to-purple-500/20 hover:from-orange-500/30 hover:to-purple-500/30 border border-orange-500/20 rounded-lg text-foreground font-medium transition-all duration-300"
                    >
                      Next Question
                    </motion.button>
                  </motion.div>
                )}
              </div>
            )}

            {currentStep === 3 && currentQuestions.mtf && (
              <div id="mtf-section" className="bg-gradient-to-br from-purple-500/40 via-purple-500/30 to-transparent dark:from-purple-500/20 dark:via-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Match the Fact</h2>
                <p className="text-xl text-foreground/90 mb-6">{currentQuestions.mtf.question}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* Options Column */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-purple-400 mb-4">Options</h3>
                    {currentQuestions.mtf.options.map((option: string, index: number) => (
                      <div key={index} className="bg-white/10 p-4 rounded-lg border border-purple-500/20">
                        <p className="text-foreground">{option}</p>
                        <div className="mt-2">
                          <select
                            value={mtfAnswers[option.charAt(0)] || ""}
                            onChange={(e) => handleMTFAnswer(option, e.target.value)}
                            className="w-full px-3 py-2 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500/50 appearance-none"
                            disabled={showMTFFeedback}
                            aria-label={`Select match for ${option}`}
                            style={{
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              backgroundColor: 'white',
                              color: 'black'
                            }}
                          >
                            <option value="" style={{ backgroundColor: 'white', color: 'black' }}>Select a match...</option>
                            {shuffledMatches.map((match, i) => {
                              const matchNumber = match.charAt(0);
                              const isSelected = Object.values(mtfAnswers).includes(matchNumber);
                              return (
                                <option 
                                  key={i} 
                                  value={matchNumber}
                                  disabled={isSelected && mtfAnswers[option.charAt(0)] !== matchNumber}
                                  style={{ backgroundColor: 'white', color: 'black', opacity: isSelected ? 0.5 : 1 }}
                                >
                                  {match.replace(/^\d+\)/, '•')}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        {showMTFFeedback && (
                          <div className="mt-2 flex items-center gap-2">
                            {mtfAnswers[option.charAt(0)] === currentQuestions.mtf.answer.split(", ").find((ans: string) => ans.startsWith(option.charAt(0)))?.split("-")[1] ? (
                              <div className="flex items-center gap-2 text-green-400">
                                <CheckCircle className="w-4 h-4" />
                                <span>Correct</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-red-400">
                                <XCircle className="w-4 h-4" />
                                <span>Incorrect</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Matches Column */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-purple-400 mb-4">Matches</h3>
                    {shuffledMatches.map((match: string, index: number) => (
                      <div key={index} className="bg-white/10 p-4 rounded-lg border border-purple-500/20">
                        <p className="text-foreground">{match.replace(/^\d+\)/, '•')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {!showMTFFeedback && Object.keys(mtfAnswers).length === currentQuestions.mtf.options.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex justify-end"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleMTFSubmit}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-green-500/20 hover:from-purple-500/30 hover:to-green-500/30 border border-purple-500/20 rounded-lg text-foreground font-medium transition-all duration-300"
                    >
                      Submit Answers
                    </motion.button>
                  </motion.div>
                )}

                {showMTFFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    {!Object.entries(mtfAnswers).every(([option, match]) => 
                      match === currentQuestions.mtf.answer.split(", ").find((ans: string) => ans.startsWith(option))?.split("-")[1]
                    ) && (
                      <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <h4 className="text-red-400 font-medium mb-2">Correct Answers:</h4>
                        {currentQuestions.mtf.answer.split(", ").map((answer: string, index: number) => {
                          const [option, match] = answer.split("-");
                          const optionText = currentQuestions.mtf.options.find((opt: string) => opt.startsWith(option));
                          const matchText = currentQuestions.mtf.matches[parseInt(match) - 1].replace(/^\d+\)/, '•');
                          return (
                            <div key={index} className="text-foreground/90">
                              <span className="text-purple-400">{optionText}</span> → <span className="text-green-400">{matchText}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNextAfterMTF}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-green-500/20 hover:from-purple-500/30 hover:to-green-500/30 border border-purple-500/20 rounded-lg text-foreground font-medium transition-all duration-300"
                      >
                        Next Question
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {currentStep === 4 && currentQuestions.pledge && (
              <div className="bg-gradient-to-br from-green-500/40 via-green-500/30 to-transparent dark:from-green-500/20 dark:via-green-500/10 border border-green-500/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Pledge an Action</h2>
                <p className="text-xl text-foreground/90 mb-6">{currentQuestions.pledge.task}</p>
                <div className="relative">
                  <textarea
                    value={pledgeText}
                    onChange={(e) => handlePledgeInput(e.target.value)}
                    className={`w-full h-32 px-4 py-3 bg-white/10 border ${
                      wordCount === 200 ? 'border-green-500/50' : 'border-green-500/20'
                    } rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-green-500/50 ${
                      showWordLimitWarning ? 'border-red-500/50' : ''
                    }`}
                    placeholder="Write your pledge here... (max 200 words)"
                  />
                  <div className={`absolute bottom-2 right-2 text-sm ${
                    wordCount === 200 ? 'text-green-500' : 'text-foreground/70'
                  }`}>
                    {wordCount}/200 words
                  </div>
                </div>
                {showWordLimitWarning && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-400 text-sm flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>You have exceeded the 200-word limit. Please remove some words before continuing.</span>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: wordCount > 0 ? 1 : 0, y: wordCount > 0 ? 0 : 10 }}
                  className="mt-6 flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextAfterPledge}
                    className="px-6 py-3 bg-gradient-to-r from-green-500/20 to-yellow-500/20 hover:from-green-500/30 hover:to-yellow-500/30 border border-green-500/20 rounded-lg text-foreground font-medium transition-all duration-300"
                  >
                    Next Question
                  </motion.button>
                </motion.div>
              </div>
            )}

            {currentStep === 5 && currentQuestions.microAdvocacy && (
              <div className="bg-gradient-to-br from-yellow-500/40 via-yellow-500/30 to-transparent dark:from-yellow-500/20 dark:via-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Micro-Advocacy</h2>
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20 mb-6">
                  <h3 className="text-yellow-400 font-medium mb-2">Purpose:</h3>
                  <p className="text-foreground/90">{currentQuestions.microAdvocacy.purpose}</p>
                </div>
                <p className="text-xl text-foreground/90 mb-6">{currentQuestions.microAdvocacy.task}</p>
                <div className="relative">
                  <textarea
                    value={microAdvocacyText}
                    onChange={(e) => handleMicroAdvocacyInput(e.target.value)}
                    className={`w-full h-32 px-4 py-3 bg-white/10 border ${
                      microAdvocacyWordCount === 200 ? 'border-yellow-500/50' : 'border-yellow-500/20'
                    } rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-yellow-500/50 ${
                      showMicroAdvocacyWarning ? 'border-red-500/50' : ''
                    }`}
                    placeholder="Write your response here... (max 200 words)"
                  />
                  <div className={`absolute bottom-2 right-2 text-sm ${
                    microAdvocacyWordCount === 200 ? 'text-yellow-500' : 'text-foreground/70'
                  }`}>
                    {microAdvocacyWordCount}/200 words
                  </div>
                </div>
                {showMicroAdvocacyWarning && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-400 text-sm flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>You have exceeded the 200-word limit. Please remove some words before continuing.</span>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: microAdvocacyWordCount > 0 ? 1 : 0, y: microAdvocacyWordCount > 0 ? 0 : 10 }}
                  className="mt-6 flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleMicroAdvocacySubmit}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-red-500/20 hover:from-yellow-500/30 hover:to-red-500/30 border border-yellow-500/20 rounded-lg text-foreground font-medium transition-all duration-300"
                  >
                    Complete Quest
                  </motion.button>
                </motion.div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Quest Results</h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(0)}
                className="px-4 py-2 bg-white/10 border border-foreground/20 rounded-lg text-foreground hover:bg-white/20 transition-colors duration-300"
              >
                Back to Home
              </motion.button>
            </div>
            <div className="mb-8">
              <p className="text-xl text-foreground/90">
                Score: <span className="font-bold text-red-400">{score}/3</span>
              </p>
            </div>
            <div className="space-y-6 mb-8">
              {answers.map((answer, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4" id={
                  index === 0 ? 'mcq-section' :
                  index === 1 ? 'tf-section' :
                  index === 2 ? 'mtf-section' :
                  undefined
                }>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                    index === 0 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    index === 1 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                    index === 2 ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    index === 3 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {index === 0 ? 'Multiple Choice Question' :
                     index === 1 ? 'True/False Question' :
                     index === 2 ? 'Match the Fact' :
                     index === 3 ? 'Pledge an Action' :
                     'Micro-Advocacy'}
                  </div>
                  <p className="text-foreground/90 mb-4">{answer.question}</p>
                  {currentQuestions.mcq && index === 0 ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {currentQuestions.mcq.options.map((option: string, i: number) => (
                          <div key={i} className={`p-3 rounded-lg ${
                            option === answer.answer 
                              ? 'bg-red-500/20 border-red-500/40' 
                              : option === currentQuestions.mcq.answer
                                ? 'bg-green-500/20 border-green-500/40'
                                : 'bg-white/10 border-white/20'
                          } border`}>
                            {option}
                            {option === answer.answer && !answer.correct && (
                              <span className="ml-2 text-red-400">(Your Answer)</span>
                            )}
                            {option === currentQuestions.mcq.answer && !answer.correct && (
                              <span className="ml-2 text-green-400">(Correct Answer)</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        {answer.correct ? (
                          <CheckCircle className="text-green-500" />
                        ) : (
                          <XCircle className="text-red-500" />
                        )}
                        <span className={answer.correct ? "text-green-500" : "text-red-500"}>
                          {answer.correct ? "Correct" : "Incorrect"}
                        </span>
                      </div>
                      {!answer.correct && currentQuestions.mcq.explanation && (
                        <p className="text-foreground/70 mt-2 italic">{currentQuestions.mcq.explanation}</p>
                      )}
                    </div>
                  ) : currentQuestions.tf && index === 1 ? (
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        {[true, false].map((option) => (
                          <div
                            key={option.toString()}
                            className={`flex-1 p-3 rounded-lg ${
                              option === answer.answer 
                                ? answer.correct
                                  ? 'bg-green-500/20 border-green-500/40'
                                  : 'bg-red-500/20 border-red-500/40'
                                : option === currentQuestions.tf.answer && !answer.correct
                                  ? 'bg-green-500/20 border-green-500/40'
                                  : 'bg-white/10 border-white/20'
                            } border`}
                          >
                            <div className="flex items-center justify-center">
                              <span>{option ? 'True' : 'False'}</span>
                              {option === answer.answer && !answer.correct && (
                                <span className="ml-2 text-red-400">(Your Answer)</span>
                              )}
                              {option === currentQuestions.tf.answer && !answer.correct && (
                                <span className="ml-2 text-green-400">(Correct Answer)</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        {answer.correct ? (
                          <CheckCircle className="text-green-500" />
                        ) : (
                          <XCircle className="text-red-500" />
                        )}
                        <span className={answer.correct ? "text-green-500" : "text-red-500"}>
                          {answer.correct ? "Correct" : "Incorrect"}
                        </span>
                      </div>
                      {!answer.correct && currentQuestions.tf.details && (
                        <p className="text-foreground/70 mt-2 italic">{currentQuestions.tf.details}</p>
                      )}
                    </div>
                  ) : currentQuestions.mtf && index === 2 ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {currentQuestions.mtf.options.map((option: string, i: number) => {
                          const optionLetter = option.charAt(0);
                          const userMatch = answer.answer[optionLetter];
                          const correctMatch = answer.correctAnswers[optionLetter];
                          const isCorrect = userMatch === correctMatch;
                          
                          return (
                            <div key={i} className={`p-3 rounded-lg ${
                              isCorrect
                                ? 'bg-green-500/20 border-green-500/40'
                                : 'bg-red-500/20 border-red-500/40'
                            } border`}>
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-foreground">{option}</span>
                                  <span className="mx-2">→</span>
                                  <span className={isCorrect ? "text-green-400" : "text-red-400"}>
                                    {currentQuestions.mtf.matches[parseInt(userMatch) - 1].replace(/^\d+\)/, '•')}
                                  </span>
                                </div>
                                {isCorrect ? (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-400" />
                                )}
                              </div>
                              {!isCorrect && (
                                <div className="mt-2 text-green-400 text-sm">
                                  Correct match: {currentQuestions.mtf.matches[parseInt(correctMatch) - 1].replace(/^\d+\)/, '•')}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        {answer.correct ? (
                          <CheckCircle className="text-green-500" />
                        ) : (
                          <XCircle className="text-red-500" />
                        )}
                        <span className={answer.correct ? "text-green-500" : "text-red-500"}>
                          {answer.correct ? "All Correct" : "Some Incorrect"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-foreground/70">Your answer: {
                        typeof answer.answer === 'object' 
                          ? Object.entries(answer.answer)
                              .map(([option, match]) => `${option}-${match}`)
                              .join(", ")
                          : answer.answer
                      }</p>
                      {answer.correct !== undefined && (
                        <div className="flex items-center gap-2 mt-2">
                          {answer.correct ? (
                            <CheckCircle className="text-green-500" />
                          ) : (
                            <XCircle className="text-red-500" />
                          )}
                          <span className={answer.correct ? "text-green-500" : "text-red-500"}>
                            {answer.correct ? "Correct" : "Incorrect"}
                          </span>
                        </div>
                      )}
                      {currentQuestions.tf?.details && index === 1 && (
                        <p className="text-foreground/70 mt-2 italic">{currentQuestions.tf.details}</p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadPDF}
              className="w-full px-6 py-4 bg-gradient-to-r from-red-500/20 to-blue-500/20 hover:from-red-500/30 hover:to-blue-500/30 border border-white/10 rounded-xl text-foreground font-semibold transition-all duration-300 hover:border-red-500/50 flex items-center justify-center gap-2"
            >
              Download Results as PDF
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  );
} 