"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Users, Timer, Star, CheckCircle, Trophy, X, Printer } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

// Update print styles at the top
const printStyles = `
  @media print {
    /* Hide everything initially */
    body * {
      visibility: hidden;
    }

    /* Show only the modal content */
    .relative.w-full.max-w-4xl.max-h-\\[90vh\\] {
      visibility: visible !important;
      position: relative !important;
      left: 0 !important;
      top: 0 !important;
      width: 100% !important;
      max-height: none !important;
      overflow: visible !important;
      background: white !important;
      margin: 0 !important;
      padding: 20px !important;
    }

    .relative.w-full.max-w-4xl.max-h-\\[90vh\\] * {
      visibility: visible !important;
      color: black !important;
    }

    /* Add page breaks */
    .space-y-6 > div {
      page-break-inside: avoid;
      margin-bottom: 20px !important;
    }

    /* Ensure proper spacing */
    .space-y-3 {
      margin-bottom: 15px !important;
    }

    /* Hide buttons */
    button {
      display: none !important;
    }

    /* Remove borders and backgrounds */
    .rounded-lg, .rounded-full, .border {
      border: none !important;
      background: none !important;
    }

    /* Reset fixed positioning */
    .fixed {
      position: relative !important;
    }

    /* Reset backdrop */
    .backdrop-blur-sm {
      backdrop-filter: none !important;
    }

    /* Ensure proper margins */
    @page {
      margin: 2cm;
    }

    /* Force background colors for SDG sections */
    .bg-pink-500\\/10, .bg-purple-500\\/10 {
      background: white !important;
      border: 1px solid #ddd !important;
      padding: 15px !important;
      margin-bottom: 10px !important;
    }
  }
`;

interface IceBreaker {
  id: number;
  title: string;
  description: string;
  rules: string[];
  materials: string[];
  sdgTieIn: {
    sdg5: string;
    sdg10: string;
  };
  whyItWorks: string;
  duration: string;
  players: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const iceBreakers: IceBreaker[] = [
  {
    id: 1,
    title: "Role Swap Relay",
    description: "A fun and energetic game where players challenge gender stereotypes by acting out different roles! Teams compete to guess roles while breaking down traditional gender barriers.",
    rules: [
      "Divide into two or more teams",
      "Each team writes 5 traditional gender roles on paper slips",
      "Put all slips in a bowl",
      "One player picks a slip and acts out the opposite gender stereotype",
      "Teammates have 30 seconds to guess the role",
      "No talking during acting - only gestures allowed",
      "Switch players after each guess",
      "First team to guess all 5 roles wins!"
    ],
    materials: [
      "Paper slips",
      "Pens or markers",
      "Bowl or container",
      "Timer",
      "Small objects (cups, spoons, etc.) for acting props"
    ],
    sdgTieIn: {
      sdg5: "Challenges and breaks down gender stereotypes by showing that any gender can perform any role",
      sdg10: "Promotes social inclusion by demonstrating that roles and abilities aren't limited by gender"
    },
    whyItWorks: "The game uses humor and physical activity to make learning fun! When players act out roles typically associated with another gender, it naturally sparks laughter and discussion about equality. The competitive element keeps everyone engaged while the time pressure adds excitement.",
    duration: "15-20 minutes",
    players: "4-12 players (2-3 teams)",
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Inclusion Tower",
    description: "Let's build an Inclusion Tower! Teams compete to build the tallest stable tower using cups, with each cup representing a different marginalized group. The twist? Every cup must connect with others, symbolizing how inclusion makes our community stronger!",
    rules: [
      "Split into small groups",
      "Each group gets 10 cups and paper slips",
      "Write a marginalized group on each slip (e.g., women, rural kids, people with disabilities)",
      "Label each cup with a group name",
      "Stack cups to build your tower",
      "Every cup must touch at least two others",
      "Tower must stand for 10 seconds",
      "If tower falls, start over",
      "No tape or glue allowed - just cups and balance",
      "Tallest stable tower after 5 minutes wins!"
    ],
    materials: [
      "Plastic or paper cups (10 per team)",
      "Paper slips",
      "Markers",
      "Timer"
    ],
    sdgTieIn: {
      sdg5: "Highlights women's inclusion and representation in community building",
      sdg10: "Demonstrates how different marginalized groups can support each other in an inclusive society"
    },
    whyItWorks: "Physical building mirrors social inclusion, sparking teamwork and awareness. As players carefully balance cups, they literally see how supporting different groups creates a stronger, more stable structure. The time pressure and competitive element keep it exciting!",
    duration: "10-15 minutes",
    players: "6-15 players (2-3 teams)",
    difficulty: "Medium"
  },
  {
    id: 3,
    title: "Equality Bingo",
    description: "Time for Equality Bingo! A fun twist on the classic game where players match equality scenarios on their bingo cards. Print pre-made cards or create your own, then play to win while learning about gender equality and inclusion. Perfect for large groups and classroom settings!",
    rules: [
      "Print or create 5x5 bingo cards (we recommend printing!)",
      "Fill squares with equality facts or actions like:",
      "  • Equal pay for equal work",
      "  • Women in leadership roles",
      "  • Access for disabled people",
      "  • Rural education programs",
      "  • Gender-neutral job ads",
      "Choose one person to be the caller",
      "Caller prepares 20+ scenarios matching card items, for example:",
      "  • A company ensures equal salaries → Mark 'Equal pay'",
      "  • A woman becomes CEO → Mark 'Women in leadership'",
      "  • A school adds ramps → Mark 'Access for disabled'",
      "Caller shuffles and reads scenarios randomly",
      "Players mark matching squares on their cards",
      "First to get 5 in a row shouts 'Equality!' and wins",
      "Verify winner's matches before declaring victory"
    ],
    materials: [
      "Printed 5x5 bingo cards (or paper to make them)",
      "List of 20+ equality scenarios for caller",
      "Markers or stickers to mark squares",
      "Printer (recommended)",
      "Optional: Template available to print"
    ],
    sdgTieIn: {
      sdg5: "Teaches gender equality concepts through real-world examples and success stories, highlighting progress in areas like equal pay, leadership, and education",
      sdg10: "Demonstrates how inclusion actions create positive change, featuring scenarios about accessibility, rural development, and equal opportunities"
    },
    whyItWorks: "The familiar bingo format makes learning fun and interactive! Pre-printed cards ensure quality content, while real-world scenarios help players recognize equality actions in everyday life. The game creates natural discussions about different scenarios and their importance, making complex topics accessible to all ages.",
    duration: "20-30 minutes",
    players: "4-20 players",
    difficulty: "Easy"
  },
  {
    id: 4,
    title: "Barrier Breaker",
    description: "Welcome to Barrier Breaker! In this dynamic game, players physically break through barriers of inequality while proposing real solutions. One creates the barriers, the other breaks them - learning about challenges and solutions in a hands-on way!",
    rules: [
      "Split into pairs",
      "One player becomes the barrier maker",
      "Barrier maker ties 3-5 strings across a chair",
      "Label each string with an inequality issue",
      "Other player becomes the breaker",
      "Breaker cuts strings with scissors only",
      "Must say solution while cutting each string",
      "Can't touch strings with hands",
      "1 minute per turn",
      "Switch roles and repeat",
      "Fastest pair wins"
    ],
    materials: [
      "String or yarn",
      "Scissors (one pair per team)",
      "Paper for labels",
      "Tape",
      "Chairs or other supports",
      "Timer"
    ],
    sdgTieIn: {
      sdg5: "Identifies and removes gender-based barriers through active problem-solving",
      sdg10: "Addresses various forms of exclusion and inequality with practical solutions"
    },
    whyItWorks: "Physical action and vocal solutions make it lively and memorable. The act of cutting through barriers while stating solutions creates a powerful connection between problems and their remedies.",
    duration: "15-20 minutes",
    players: "4-12 players (2-6 pairs)",
    difficulty: "Medium"
  },
  {
    id: 5,
    title: "Voice Circle",
    description: "Let's play Voice Circle! A collaborative game where players identify inequality problems and create solutions together. As ideas pass around the circle, watch how one person's problem sparks another's creative solution!",
    rules: [
      "Players sit in a circle",
      "Each writes an inequality problem on a slip",
      "Pass the slip to the left",
      "Next player writes a solution",
      "Read both problem and solution aloud",
      "No repeating problems or solutions",
      "Keep entries under 10 words",
      "Everyone must read once",
      "Go around twice",
      "Group votes for most creative solution"
    ],
    materials: [
      "Paper slips",
      "Pens or markers",
      "Timer (optional)"
    ],
    sdgTieIn: {
      sdg5: "Empowers participants to voice gender-related concerns and propose solutions",
      sdg10: "Creates a platform for discussing various forms of inequality and collaborative problem-solving"
    },
    whyItWorks: "Passing ideas builds connection and collective problem-solving. The circle format ensures everyone participates equally, and the voting element encourages creative thinking about solutions.",
    duration: "15-20 minutes",
    players: "6-15 players",
    difficulty: "Easy"
  },
  {
    id: 6,
    title: "Equal Line-Up",
    description: "A dynamic role-playing game that challenges gender stereotypes through fun, silent acting! Players get to experience different professional and life roles, showing that abilities aren't limited by gender. The twist of swapping roles halfway through adds excitement and breaks down stereotypes in a playful way!",
    rules: [
      "Find an open space and divide players into two equal teams",
      "Each team receives 5 role cards with different jobs/roles like:",
      "  • Teacher leading a class",
      "  • CEO in a meeting",
      "  • Parent caring for baby",
      "  • Chef cooking a meal",
      "  • Engineer fixing machinery",
      "Teams secretly assign roles to their players (mix genders!)",
      "Teams line up facing each other",
      "Players take turns acting out their roles (30 seconds each)",
      "Opposing team gets 3 chances to guess each role",
      "After first round, teams swap all roles across genders",
      "Keep score of correct guesses - fastest team wins!",
      "Remember: No talking during acting - use gestures only"
    ],
    materials: [
      "Role cards or paper slips",
      "Pens or markers",
      "Timer or stopwatch",
      "Score tracking sheet",
      "Open space for movement"
    ],
    sdgTieIn: {
      sdg5: "Demonstrates that professional and life roles are not defined by gender - anyone can be a CEO, caregiver, or anything else they aspire to be",
      sdg10: "Creates an inclusive environment where everyone participates equally and experiences different perspectives"
    },
    whyItWorks: "The combination of physical activity, silent acting, and role reversal makes learning about equality fun and memorable. When players see their teammates successfully portraying roles traditionally associated with different genders, stereotypes naturally break down through laughter and shared experience. The competitive element keeps everyone engaged!",
    duration: "25-30 minutes",
    players: "8-16 players (4-8 per team)",
    difficulty: "Medium"
  },
  {
    id: 7,
    title: "Resource Race",
    description: "An energetic game that teaches fair resource distribution through a fun relay race! Teams compete to deliver resources (spoons) to different community groups (cups), learning about equality and inclusion while racing against time. Each delivery must be accompanied by a positive action shout, making the learning experience both physical and vocal!",
    rules: [
      "Set up a spacious play area",
      "Split players into equal-sized teams",
      "Each team gets 5 cups to label with different groups:",
      "  • Women in technology",
      "  • Rural communities",
      "  • People with disabilities",
      "  • Youth education",
      "  • Elderly care",
      "Scatter spoons (resources) across the room",
      "Teams line up at starting points",
      "On 'GO', players race to collect and deliver spoons",
      "When delivering a spoon, shout an equality action like:",
      "  • 'Tech training for women!'",
      "  • 'Healthcare for rural areas!'",
      "  • 'Jobs for everyone!'",
      "One spoon per cup only",
      "First team to fill all cups with valid actions wins",
      "3-minute time limit - ready, set, GO!"
    ],
    materials: [
      "Paper cups (5 per team)",
      "Spoons or small objects",
      "Paper for labels",
      "Markers",
      "Timer",
      "Large room or outdoor space"
    ],
    sdgTieIn: {
      sdg5: "Shows the importance of fair resource distribution to women and girls through active participation and vocal support",
      sdg10: "Demonstrates how different groups in society need equal access to resources and opportunities"
    },
    whyItWorks: "The fast-paced racing gets everyone's energy up while the shouting of positive actions reinforces learning. Players physically experience the concept of fair distribution, making abstract ideas about equality concrete and memorable. The time pressure adds excitement and keeps players engaged!",
    duration: "15-20 minutes",
    players: "6-15 players (2-3 teams)",
    difficulty: "Easy"
  },
  {
    id: 8,
    title: "Stereotype Smash",
    description: "A high-energy game that tackles stereotypes head-on through quick thinking and positive responses! Players toss a ball while challenging common stereotypes, creating a supportive environment where everyone learns to recognize and counter prejudices. The game combines physical activity with vocal empowerment!",
    rules: [
      "Form a circle with all players standing",
      "Get your soft ball or make a paper ball",
      "First player holds the ball and states a stereotype like:",
      "  • 'Boys don't show emotions'",
      "  • 'Girls can't be leaders'",
      "  • 'Rural people aren't educated'",
      "Tosses ball to another player randomly",
      "Catcher must quickly 'smash' the stereotype with a positive counter:",
      "  • 'Everyone has feelings!'",
      "  • 'Leadership has no gender!'",
      "  • 'Rural wisdom enriches education!'",
      "10 seconds maximum to respond",
      "No repeating stereotypes or responses",
      "Play 10 rounds",
      "Group votes for most creative 'smashes'",
      "Remember: Keep it respectful and supportive!"
    ],
    materials: [
      "Soft ball or crumpled paper ball",
      "Timer",
      "Paper for scoring (optional)",
      "Pens for scoring (optional)"
    ],
    sdgTieIn: {
      sdg5: "Actively challenges gender stereotypes and empowers players to speak up against gender-based assumptions",
      sdg10: "Addresses various forms of social prejudices and promotes inclusive thinking"
    },
    whyItWorks: "The combination of physical movement and quick verbal responses keeps players alert and engaged. The supportive group setting makes it safe to discuss and challenge stereotypes, while the voting element encourages creative and impactful responses. Players learn to think critically about biases while having fun!",
    duration: "20-25 minutes",
    players: "8-15 players",
    difficulty: "Medium"
  },
  {
    id: 9,
    title: "Puzzle of Parity",
    description: "An exciting team game that turns equality goals into a hands-on puzzle challenge! Teams work together to assemble puzzle pieces while shouting empowering messages about equality. The combination of physical puzzle-solving and vocal affirmations makes learning about equality goals fun and memorable!",
    rules: [
      "Prepare the equality puzzle pieces:",
      "Cut large paper into 6 puzzle pieces",
      "Write one equality goal on each piece:",
      "  • Equal pay for all",
      "  • Education access",
      "  • Healthcare rights",
      "  • Job opportunities",
      "  • Political voice",
      "  • Social inclusion",
      "Mix up pieces and divide teams",
      "Teams race to assemble their puzzles",
      "Must shout the meaning of each piece while placing:",
      "  • 'Equal pay creates fair workplaces!'",
      "  • 'Education empowers everyone!'",
      "Pieces must fit perfectly",
      "First team to complete puzzle and explain all pieces wins",
      "3-minute time limit per round"
    ],
    materials: [
      "Large paper sheets (one per team)",
      "Scissors",
      "Markers",
      "Timer",
      "Space for team puzzling"
    ],
    sdgTieIn: {
      sdg5: "Each puzzle piece represents a key aspect of gender equality, creating a complete picture of what true parity looks like",
      sdg10: "The puzzle format shows how different aspects of inclusion fit together to create a fair society"
    },
    whyItWorks: "The physical act of assembling puzzle pieces while shouting positive messages combines tactile learning with vocal reinforcement. Teams literally piece together the elements of equality, making abstract concepts concrete. The competitive element and time pressure keep energy high!",
    duration: "15-20 minutes",
    players: "6-12 players (2-3 teams)",
    difficulty: "Easy"
  },
  {
    id: 10,
    title: "Fair Share Chain",
    description: "A creative writing game that builds awareness about inequality and solutions through collaborative storytelling! Players create a chain of connected ideas, linking problems with practical solutions. Watch how one person's solution inspires the next problem-solver, creating a powerful chain of positive change!",
    rules: [
      "Arrange players in a line or circle",
      "Give each player paper slips and a pen",
      "First player writes an inequality issue like:",
      "  • 'Women earn less in sports'",
      "  • 'Rural schools lack resources'",
      "Pass to next player who writes a solution:",
      "  • 'Equal prize money in tournaments'",
      "  • 'Increase rural education funding'",
      "Next player writes a follow-up issue:",
      "  • 'Need more women coaches'",
      "  • 'Rural teacher shortage'",
      "Continue chain with alternating problems/solutions",
      "Keep entries under 10 words",
      "Each entry must connect to the previous one",
      "No repeating issues or solutions",
      "After 5 minutes, read the entire chain",
      "Longest logical chain wins!"
    ],
    materials: [
      "Paper slips (lots!)",
      "Pens or markers",
      "Timer",
      "Table or flat surface",
      "Optional: Paper clips to connect chain"
    ],
    sdgTieIn: {
      sdg5: "Creates awareness of gender-based inequalities while encouraging practical solutions and systemic thinking",
      sdg10: "Shows how different forms of inequality connect and how solutions can address multiple challenges"
    },
    whyItWorks: "The chain format helps players see how issues and solutions are interconnected. The collaborative nature builds empathy and problem-solving skills, while the time limit keeps ideas flowing. Reading the final chain shows how many positive changes we can create together!",
    duration: "20-25 minutes",
    players: "6-12 players",
    difficulty: "Medium"
  }
];

export default function IceBreakingPage() {
  const [selectedActivity, setSelectedActivity] = useState<IceBreaker | null>(null);
  
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background to-background/80">
      <style>{printStyles}</style>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ice Breaking Activities
            </h1>
            <p className="text-xl text-foreground/80">
              Fun group activities that teach equality and inclusion through play!
            </p>
          </div>

          {/* Grid of Activity Cards */}
          {!selectedActivity && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {iceBreakers.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedActivity(activity)}
                  className="cursor-pointer"
                >
                  <CardSpotlight className="h-full p-6" color="blue">
                    <div className="space-y-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Users className="w-6 h-6 text-foreground" />
                            <h2 className="text-xl font-semibold text-foreground">{activity.title}</h2>
                          </div>
                          <div className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30">
                            {activity.difficulty}
                          </div>
                        </div>
                      </div>
                      <p className="text-foreground/80 line-clamp-2">{activity.description}</p>
                      <div className="flex items-center justify-between text-sm text-foreground/60">
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4" />
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{activity.players}</span>
                        </div>
                      </div>
                    </div>
                  </CardSpotlight>
                </motion.div>
              ))}
              
              {/* Coming Soon Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: iceBreakers.length * 0.1 }}
                className="cursor-not-allowed"
              >
                <CardSpotlight className="h-full p-6 relative overflow-hidden" color="purple">
                  <div className="space-y-4 blur-sm">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Users className="w-6 h-6 text-foreground" />
                          <h2 className="text-xl font-semibold text-foreground">Mystery Activity</h2>
                        </div>
                        <div className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm border border-purple-500/30">
                          Coming Soon
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/80 line-clamp-2">
                      A new exciting activity that will bring more fun and learning to your equality and inclusion journey!
                    </p>
                    <div className="flex items-center justify-between text-sm text-foreground/60">
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4" />
                        <span>??-?? minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>?-?? players</span>
                      </div>
                    </div>
                  </div>
                  {/* Overlay text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold text-purple-400 bg-background/80 px-6 py-3 rounded-full border border-purple-500/30">
                      Coming Soon!
                    </div>
                  </div>
                </CardSpotlight>
              </motion.div>
            </div>
          )}

          {/* Selected Activity Details */}
          {selectedActivity && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm print-content">
              <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-background border border-white/10">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors border border-red-500/30 text-red-400"
                  aria-label="Close activity details"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="p-6 pt-16 space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold text-foreground">{selectedActivity.title}</h2>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Timer className="w-4 h-4" />
                          <span>{selectedActivity.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{selectedActivity.players}</span>
                        </div>
                        <div className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {selectedActivity.difficulty}
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/80">{selectedActivity.description}</p>
                  </div>

                  {/* Rules */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>How to Play</span>
                    </h3>
                    <ul className="space-y-2">
                      {selectedActivity.rules.map((rule, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2 text-foreground/70"
                        >
                          {rule.startsWith('  •') ? (
                            <span className="w-6"></span>
                          ) : (
                            <span className="w-6 font-medium text-blue-400">
                              {(() => {
                                let count = 1;
                                for (let i = 0; i < index; i++) {
                                  if (!selectedActivity.rules[i].startsWith('  •')) {
                                    count++;
                                  }
                                }
                                return `${count}.`;
                              })()}
                            </span>
                          )}
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Materials */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span>What You'll Need</span>
                    </h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedActivity.materials.map((material, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 text-foreground/70"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-400" />
                          <span>{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SDG Tie-In */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-purple-400" />
                      <span>Learning Goals</span>
                    </h3>
                    <div className="grid gap-3">
                      <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                        <div className="font-medium text-pink-400">SDG 5: Gender Equality</div>
                        <p className="text-sm text-foreground/70 mt-1">{selectedActivity.sdgTieIn.sdg5}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="font-medium text-purple-400">SDG 10: Reduced Inequalities</div>
                        <p className="text-sm text-foreground/70 mt-1">{selectedActivity.sdgTieIn.sdg10}</p>
                      </div>
                    </div>
                  </div>

                  {/* Why It Works */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-foreground">Why It Works</h3>
                    <p className="text-foreground/70">{selectedActivity.whyItWorks}</p>
                  </div>

                  {/* Print Button */}
                  <div className="flex justify-end pt-4 border-t border-white/10">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Activity</span>
                    </button>
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