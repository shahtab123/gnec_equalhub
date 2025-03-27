export interface GameRound {
  id: number;
  scenario: string;
  description: string;
  initialScale: number; // 0-10, where 5 is balanced
  options: {
    id: number;
    text: string;
    impact: number; // How much this moves the scale (-5 to +5)
    feedback: string;
  }[];
}

export const gameRounds: GameRound[] = [
  {
    id: 1,
    scenario: "Workplace Leadership",
    description: "A tech company has noticed a significant gender imbalance in their leadership positions. How would you address this?",
    initialScale: 2, // Tilted towards inequality
    options: [
      {
        id: 1,
        text: "Implement a mentorship program specifically for women in leadership roles",
        impact: 2,
        feedback: "Great choice! Mentorship programs help create pathways for women to advance into leadership positions while addressing systemic barriers."
      },
      {
        id: 2,
        text: "Ignore the imbalance as it might fix itself over time",
        impact: -1,
        feedback: "Passive approaches often maintain or worsen inequality. Active steps are needed to create meaningful change."
      },
      {
        id: 3,
        text: "Set clear diversity goals and create transparent promotion criteria",
        impact: 3,
        feedback: "Excellent! Clear goals and transparent criteria help ensure fair opportunities for everyone while addressing unconscious bias."
      }
    ]
  },
  {
    id: 2,
    scenario: "Educational Access",
    description: "A rural community has limited resources for education, affecting girls' school attendance more than boys'. What action would you take?",
    initialScale: 3,
    options: [
      {
        id: 1,
        text: "Provide safe transportation and flexible schedules for all students",
        impact: 3,
        feedback: "Perfect! This solution addresses both safety concerns and practical barriers that often affect girls' education more severely."
      },
      {
        id: 2,
        text: "Focus resources only on boys' education",
        impact: -2,
        feedback: "This would increase the education gap. Equal access to education is a fundamental right for all children."
      },
      {
        id: 3,
        text: "Create community awareness programs about the importance of girls' education",
        impact: 2,
        feedback: "Good choice! Community support is crucial for sustainable change in educational access."
      }
    ]
  },
  {
    id: 3,
    scenario: "Healthcare Access",
    description: "A community health center notices that marginalized groups have lower healthcare utilization rates. How would you improve access?",
    initialScale: 2,
    options: [
      {
        id: 1,
        text: "Implement mobile health clinics that visit underserved areas",
        impact: 3,
        feedback: "Excellent! Mobile clinics bring healthcare directly to those who face transportation or distance barriers."
      },
      {
        id: 2,
        text: "Maintain current services without changes",
        impact: -1,
        feedback: "Keeping the status quo perpetuates healthcare disparities. Active intervention is needed to improve access."
      },
      {
        id: 3,
        text: "Provide multilingual services and cultural competency training",
        impact: 2,
        feedback: "Great choice! This helps break down language and cultural barriers to healthcare access."
      }
    ]
  },
  {
    id: 4,
    scenario: "Workplace Pay Gap",
    description: "An analysis reveals a significant pay gap between different gender and ethnic groups for similar roles. What's your approach?",
    initialScale: 2,
    options: [
      {
        id: 1,
        text: "Conduct a comprehensive pay equity audit and adjust salaries",
        impact: 3,
        feedback: "Perfect! Data-driven approaches help identify and correct pay disparities systematically."
      },
      {
        id: 2,
        text: "Keep salary information confidential",
        impact: -2,
        feedback: "Lack of transparency often perpetuates pay inequities. Open discussion and clear policies are needed."
      },
      {
        id: 3,
        text: "Implement standardized salary bands based on role and experience",
        impact: 2,
        feedback: "Good choice! Standardized pay structures help ensure fair compensation regardless of gender or ethnicity."
      }
    ]
  },
  {
    id: 5,
    scenario: "Community Voice",
    description: "In community planning meetings, certain groups' voices are consistently underrepresented. How would you address this?",
    initialScale: 3,
    options: [
      {
        id: 1,
        text: "Rotate meeting times and provide multiple participation channels",
        impact: 2,
        feedback: "Great approach! This makes participation more accessible for people with different schedules and preferences."
      },
      {
        id: 2,
        text: "Continue with the current meeting format",
        impact: -1,
        feedback: "Maintaining the same format excludes those who face barriers to participation. Changes are needed for inclusive representation."
      },
      {
        id: 3,
        text: "Actively reach out to underrepresented groups and provide support for participation",
        impact: 3,
        feedback: "Excellent! Proactive outreach and support helps ensure all community voices are heard and valued."
      }
    ]
  }
]; 