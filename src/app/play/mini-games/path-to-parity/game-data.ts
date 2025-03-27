export interface Level {
  id: number;
  title: string;
  description: string;
  options: {
    id: number;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  sdg: {
    number: number;
    description: string;
  }[];
}

export interface GameInstructions {
  title: string;
  steps: string[];
}

export const gameInstructions: GameInstructions = {
  title: "How to Play",
  steps: [
    "Move forward by making inclusive choices",
    "Clear barriers to create a path to equality",
    "Each correct choice earns points",
    "Reach the finish line by completing all levels",
    "Become a Parity Pioneer!"
  ]
};

export const totalSteps = 9; // 3 levels × 3 steps each

export const levels: Level[] = [
  {
    id: 1,
    title: "Education Access",
    description: "Help ensure equal access to education for all children. Choose actions that promote inclusive education.",
    options: [
      {
        id: 1,
        text: "Fund education programs for all children",
        isCorrect: true,
        feedback: "Equal education lifts everyone up! +5 points"
      },
      {
        id: 2,
        text: "Build schools in wealthy areas only",
        isCorrect: false,
        feedback: "That's not inclusive! Try again."
      },
      {
        id: 3,
        text: "Delay educational reforms",
        isCorrect: false,
        feedback: "Delays affect children's future. Try again."
      }
    ],
    sdg: [
      {
        number: 5,
        description: "Achieve gender equality and empower all women and girls"
      }
    ]
  },
  {
    id: 2,
    title: "Workplace Fairness",
    description: "Address workplace discrimination and promote fair hiring practices. Make choices that create an inclusive work environment.",
    options: [
      {
        id: 1,
        text: "Implement fair hiring and equal pay policies",
        isCorrect: true,
        feedback: "Fair workplace practices promote equality! +5 points"
      },
      {
        id: 2,
        text: "Focus on stereotypes in hiring",
        isCorrect: false,
        feedback: "Stereotypes perpetuate bias. Try again."
      },
      {
        id: 3,
        text: "Ignore workplace discrimination",
        isCorrect: false,
        feedback: "Ignoring bias maintains inequality. Try again."
      }
    ],
    sdg: [
      {
        number: 5,
        description: "Achieve gender equality and empower all women and girls"
      },
      {
        number: 10,
        description: "Reduce inequality within and among countries"
      }
    ]
  },
  {
    id: 3,
    title: "Healthcare Equity",
    description: "Ensure access to healthcare and services in all communities. Make choices that promote health equity.",
    options: [
      {
        id: 1,
        text: "Build healthcare facilities in underserved areas",
        isCorrect: true,
        feedback: "Healthcare for all promotes inclusion! +5 points"
      },
      {
        id: 2,
        text: "Focus on urban areas only",
        isCorrect: false,
        feedback: "Rural communities need access too. Try again."
      },
      {
        id: 3,
        text: "Delay healthcare improvements",
        isCorrect: false,
        feedback: "Delays affect community health. Try again."
      }
    ],
    sdg: [
      {
        number: 10,
        description: "Reduce inequality within and among countries"
      }
    ]
  }
]; 