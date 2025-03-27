export interface ParityQuestion {
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

export const parityQuestions: ParityQuestion[] = [
  {
    id: 1,
    title: "Education Equity",
    description: "A local school district is facing gender disparity in STEM subjects. What action would best address this?",
    options: [
      {
        id: 1,
        text: "Create STEM mentorship programs for all students",
        isCorrect: true,
        feedback: "Mentorship programs help break barriers and inspire all students! +5 points"
      },
      {
        id: 2,
        text: "Separate classes based on gender",
        isCorrect: false,
        feedback: "Segregation reinforces stereotypes. Try again."
      },
      {
        id: 3,
        text: "Focus only on traditional subjects",
        isCorrect: false,
        feedback: "Limiting opportunities affects everyone. Try again."
      }
    ],
    sdg: [{ number: 5, description: "Achieve gender equality and empower all women and girls" }]
  },
  {
    id: 2,
    title: "Workplace Leadership",
    description: "A company wants to improve gender diversity in leadership positions. What's the most effective approach?",
    options: [
      {
        id: 1,
        text: "Implement transparent promotion criteria",
        isCorrect: false,
        feedback: "Clear criteria help, but more is needed. Try again."
      },
      {
        id: 2,
        text: "Establish leadership development programs for all employees",
        isCorrect: true,
        feedback: "Investing in everyone's growth promotes equality! +5 points"
      },
      {
        id: 3,
        text: "Maintain current promotion practices",
        isCorrect: false,
        feedback: "Status quo perpetuates inequality. Try again."
      }
    ],
    sdg: [{ number: 5, description: "Achieve gender equality and empower all women and girls" }]
  },
  {
    id: 3,
    title: "Healthcare Access",
    description: "A rural community lacks adequate maternal healthcare services. What solution would be most effective?",
    options: [
      {
        id: 1,
        text: "Wait for private healthcare providers",
        isCorrect: false,
        feedback: "Delays risk lives. Try again."
      },
      {
        id: 2,
        text: "Focus only on urban hospitals",
        isCorrect: false,
        feedback: "Rural communities need care too. Try again."
      },
      {
        id: 3,
        text: "Establish mobile health clinics",
        isCorrect: true,
        feedback: "Mobile clinics bring care to those who need it! +5 points"
      }
    ],
    sdg: [{ number: 10, description: "Reduce inequality within and among countries" }]
  },
  {
    id: 4,
    title: "Sports Inclusion",
    description: "A community sports center is addressing gender participation gaps. What approach would be most inclusive?",
    options: [
      {
        id: 1,
        text: "Maintain separate facilities",
        isCorrect: false,
        feedback: "Separation limits opportunities. Try again."
      },
      {
        id: 2,
        text: "Create inclusive programs with equal funding",
        isCorrect: true,
        feedback: "Equal opportunities in sports benefit everyone! +5 points"
      },
      {
        id: 3,
        text: "Focus on traditional gender sports",
        isCorrect: false,
        feedback: "Stereotypes limit participation. Try again."
      }
    ],
    sdg: [{ number: 5, description: "Achieve gender equality and empower all women and girls" }]
  },
  {
    id: 5,
    title: "Technology Access",
    description: "A community center is addressing the digital gender gap. What's the best initiative?",
    options: [
      {
        id: 1,
        text: "Provide basic computer training",
        isCorrect: false,
        feedback: "Basic training alone isn't enough. Try again."
      },
      {
        id: 2,
        text: "Focus on advanced users only",
        isCorrect: false,
        feedback: "This excludes beginners. Try again."
      },
      {
        id: 3,
        text: "Create comprehensive digital literacy programs",
        isCorrect: true,
        feedback: "Comprehensive programs ensure no one is left behind! +5 points"
      }
    ],
    sdg: [{ number: 10, description: "Reduce inequality within and among countries" }]
  },
  {
    id: 6,
    title: "Economic Empowerment",
    description: "A microfinance initiative aims to support local entrepreneurs. What approach would be most effective?",
    options: [
      {
        id: 1,
        text: "Offer loans to established businesses",
        isCorrect: false,
        feedback: "This excludes new entrepreneurs. Try again."
      },
      {
        id: 2,
        text: "Provide equal access to loans and training",
        isCorrect: true,
        feedback: "Equal access to resources empowers everyone! +5 points"
      },
      {
        id: 3,
        text: "Focus on large business loans",
        isCorrect: false,
        feedback: "This excludes small entrepreneurs. Try again."
      }
    ],
    sdg: [{ number: 10, description: "Reduce inequality within and among countries" }]
  },
  {
    id: 7,
    title: "Political Participation",
    description: "A local government wants to increase diverse representation. What action would be most effective?",
    options: [
      {
        id: 1,
        text: "Maintain current election systems",
        isCorrect: false,
        feedback: "Status quo limits representation. Try again."
      },
      {
        id: 2,
        text: "Create leadership workshops",
        isCorrect: true,
        feedback: "Building capacity increases participation! +5 points"
      },
      {
        id: 3,
        text: "Restrict participation criteria",
        isCorrect: false,
        feedback: "Restrictions reduce diversity. Try again."
      }
    ],
    sdg: [{ number: 5, description: "Achieve gender equality and empower all women and girls" }]
  },
  {
    id: 8,
    title: "Media Representation",
    description: "A media company is addressing gender stereotypes. What approach would create the most positive change?",
    options: [
      {
        id: 1,
        text: "Continue current portrayal",
        isCorrect: false,
        feedback: "Current stereotypes harm society. Try again."
      },
      {
        id: 2,
        text: "Create diverse content teams",
        isCorrect: true,
        feedback: "Diverse perspectives create inclusive content! +5 points"
      },
      {
        id: 3,
        text: "Focus on traditional roles",
        isCorrect: false,
        feedback: "Traditional roles reinforce bias. Try again."
      }
    ],
    sdg: [{ number: 5, description: "Achieve gender equality and empower all women and girls" }]
  },
  {
    id: 9,
    title: "Agricultural Innovation",
    description: "A farming community is modernizing its practices. How can they ensure inclusive development?",
    options: [
      {
        id: 1,
        text: "Train male farmers only",
        isCorrect: false,
        feedback: "Excluding women farmers limits progress. Try again."
      },
      {
        id: 2,
        text: "Maintain traditional methods",
        isCorrect: false,
        feedback: "Avoiding innovation affects productivity. Try again."
      },
      {
        id: 3,
        text: "Provide equal access to training and resources",
        isCorrect: true,
        feedback: "Equal access to agricultural knowledge benefits all! +5 points"
      }
    ],
    sdg: [{ number: 10, description: "Reduce inequality within and among countries" }]
  },
  {
    id: 10,
    title: "Environmental Leadership",
    description: "An environmental project needs community support. What's the most inclusive approach?",
    options: [
      {
        id: 1,
        text: "Engage diverse community leaders",
        isCorrect: true,
        feedback: "Diverse leadership strengthens environmental action! +5 points"
      },
      {
        id: 2,
        text: "Use existing leadership only",
        isCorrect: false,
        feedback: "Limited perspectives miss opportunities. Try again."
      },
      {
        id: 3,
        text: "Postpone community engagement",
        isCorrect: false,
        feedback: "Delaying participation reduces impact. Try again."
      }
    ],
    sdg: [{ number: 5, description: "Achieve gender equality and empower all women and girls" }]
  },
  {
    id: 11,
    title: "Cultural Inclusion",
    description: "A community festival is being planned. How can it best promote equality?",
    options: [
      {
        id: 1,
        text: "Showcase traditional roles only",
        isCorrect: false,
        feedback: "Limited representation excludes many. Try again."
      },
      {
        id: 2,
        text: "Celebrate diverse achievements",
        isCorrect: true,
        feedback: "Inclusive celebration strengthens community! +5 points"
      },
      {
        id: 3,
        text: "Maintain past festival format",
        isCorrect: false,
        feedback: "Not evolving misses opportunities. Try again."
      }
    ],
    sdg: [{ number: 10, description: "Reduce inequality within and among countries" }]
  },
  {
    id: 12,
    title: "Youth Development",
    description: "A youth center is expanding its programs. What approach would be most equitable?",
    options: [
      {
        id: 1,
        text: "Focus on traditional activities",
        isCorrect: false,
        feedback: "Limited programs restrict growth. Try again."
      },
      {
        id: 2,
        text: "Separate programs by gender",
        isCorrect: false,
        feedback: "Segregation limits learning. Try again."
      },
      {
        id: 3,
        text: "Create inclusive skill-building programs",
        isCorrect: true,
        feedback: "Inclusive programs develop all youth! +5 points"
      }
    ],
    sdg: [{ number: 5, description: "Achieve gender equality and empower all women and girls" }]
  },
  {
    id: 13,
    title: "Public Transportation",
    description: "A city is improving its public transport. How can they ensure inclusive access?",
    options: [
      {
        id: 1,
        text: "Design safe, accessible routes for all",
        isCorrect: true,
        feedback: "Safe transport benefits everyone! +5 points"
      },
      {
        id: 2,
        text: "Focus on peak hour service",
        isCorrect: false,
        feedback: "Limited service excludes many users. Try again."
      },
      {
        id: 3,
        text: "Maintain current routes only",
        isCorrect: false,
        feedback: "Not improving access affects mobility. Try again."
      }
    ],
    sdg: [{ number: 10, description: "Reduce inequality within and among countries" }]
  },
  {
    id: 14,
    title: "Emergency Response",
    description: "A community is updating its emergency plans. What approach ensures equal protection?",
    options: [
      {
        id: 1,
        text: "Use existing response plans",
        isCorrect: false,
        feedback: "Old plans may miss vulnerable groups. Try again."
      },
      {
        id: 2,
        text: "Create inclusive emergency protocols",
        isCorrect: true,
        feedback: "Inclusive planning protects everyone! +5 points"
      },
      {
        id: 3,
        text: "Focus on main areas only",
        isCorrect: false,
        feedback: "Limited coverage risks lives. Try again."
      }
    ],
    sdg: [{ number: 10, description: "Reduce inequality within and among countries" }]
  },
  {
    id: 15,
    title: "Digital Innovation",
    description: "A tech company is developing new products. How can they ensure inclusive design?",
    options: [
      {
        id: 1,
        text: "Test with diverse user groups",
        isCorrect: true,
        feedback: "Inclusive design serves everyone better! +5 points"
      },
      {
        id: 2,
        text: "Focus on advanced users",
        isCorrect: false,
        feedback: "Limited testing excludes many. Try again."
      },
      {
        id: 3,
        text: "Skip user testing phase",
        isCorrect: false,
        feedback: "No testing risks accessibility. Try again."
      }
    ],
    sdg: [{ number: 10, description: "Reduce inequality within and among countries" }]
  },
  {
    id: 16,
    title: "Sports Leadership",
    description: "A sports organization wants to increase diversity in coaching. What's the best approach?",
    options: [
      {
        id: 1,
        text: "Keep current hiring practices",
        isCorrect: false,
        feedback: "Status quo limits diversity. Try again."
      },
      {
        id: 2,
        text: "Create inclusive coaching programs",
        isCorrect: true,
        feedback: "Developing diverse coaches enriches sports! +5 points"
      },
      {
        id: 3,
        text: "Hire based on past experience only",
        isCorrect: false,
        feedback: "Traditional criteria perpetuate gaps. Try again."
      }
    ],
    sdg: [{ number: 5, description: "Achieve gender equality and empower all women and girls" }]
  },
  {
    id: 17,
    title: "Financial Education",
    description: "A bank is developing financial literacy programs. How can they ensure equal access?",
    options: [
      {
        id: 1,
        text: "Offer advanced courses only",
        isCorrect: false,
        feedback: "Complex programs exclude beginners. Try again."
      },
      {
        id: 2,
        text: "Create multi-level, inclusive programs",
        isCorrect: true,
        feedback: "Accessible financial education empowers all! +5 points"
      },
      {
        id: 3,
        text: "Focus on existing customers",
        isCorrect: false,
        feedback: "Limited access perpetuates inequality. Try again."
      }
    ],
    sdg: [{ number: 10, description: "Reduce inequality within and among countries" }]
  },
  {
    id: 18,
    title: "Community Planning",
    description: "A neighborhood is being redeveloped. How can the planning be most inclusive?",
    options: [
      {
        id: 1,
        text: "Consult property owners only",
        isCorrect: false,
        feedback: "Limited input excludes many voices. Try again."
      },
      {
        id: 2,
        text: "Delay community meetings",
        isCorrect: false,
        feedback: "Postponing participation limits inclusion. Try again."
      },
      {
        id: 3,
        text: "Engage all community members",
        isCorrect: true,
        feedback: "Inclusive planning creates better communities! +5 points"
      }
    ],
    sdg: [{ number: 10, description: "Reduce inequality within and among countries" }]
  },
  {
    id: 19,
    title: "Arts and Culture",
    description: "An arts center is expanding its programs. What approach promotes equal representation?",
    options: [
      {
        id: 1,
        text: "Showcase diverse artists and perspectives",
        isCorrect: true,
        feedback: "Diverse art enriches culture! +5 points"
      },
      {
        id: 2,
        text: "Focus on traditional art forms",
        isCorrect: false,
        feedback: "Limited focus excludes new voices. Try again."
      },
      {
        id: 3,
        text: "Maintain current exhibition policy",
        isCorrect: false,
        feedback: "Status quo limits artistic diversity. Try again."
      }
    ],
    sdg: [{ number: 5, description: "Achieve gender equality and empower all women and girls" }]
  },
  {
    id: 20,
    title: "Professional Development",
    description: "A company is revising its training programs. How can they ensure equal growth opportunities?",
    options: [
      {
        id: 1,
        text: "Maintain current training schedule",
        isCorrect: false,
        feedback: "Limited programs restrict growth. Try again."
      },
      {
        id: 2,
        text: "Create flexible, inclusive training",
        isCorrect: true,
        feedback: "Accessible training develops everyone! +5 points"
      },
      {
        id: 3,
        text: "Focus on senior staff only",
        isCorrect: false,
        feedback: "Exclusive training limits potential. Try again."
      }
    ],
    sdg: [{ number: 5, description: "Achieve gender equality and empower all women and girls" }]
  }
]; 