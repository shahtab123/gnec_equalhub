export interface Chapter {
  title: string;
  description: string;
  lessons: {
    type: "video" | "document" | "quiz";
    title: string;
    duration?: string;
  }[];
}

export interface CourseContent {
  duration: string;
  totalLessons: number;
  chapters: Chapter[];
}

export interface SkillPost {
  id: number;
  name: string;
  type: "offer" | "want" | "both";
  skillOffer?: string;
  skillWant?: string;
  profession: string;
  expertise: string;
  contact: string;
  courseContent?: CourseContent;
}

export const samplePosts: SkillPost[] = [
  {
    id: 1,
    name: "Maya",
    type: "both",
    skillOffer: "HTML and Web Development",
    skillWant: "Project Management",
    profession: "Web Developer",
    expertise: "Frontend Development",
    contact: "linkedin.com/maya",
    courseContent: {
      duration: "6 hours",
      totalLessons: 12,
      chapters: [
        {
          title: "HTML Fundamentals",
          description: "Learn the basics of HTML structure and elements",
          lessons: [
            { type: "video", title: "Introduction to HTML", duration: "15 min" },
            { type: "document", title: "HTML Elements Reference" },
            { type: "quiz", title: "HTML Basics Quiz" }
          ]
        },
        {
          title: "CSS Styling",
          description: "Master CSS styling and layouts",
          lessons: [
            { type: "video", title: "CSS Selectors", duration: "20 min" },
            { type: "document", title: "CSS Properties Guide" },
            { type: "quiz", title: "CSS Styling Quiz" }
          ]
        },
        {
          title: "Responsive Design",
          description: "Create responsive web layouts",
          lessons: [
            { type: "video", title: "Media Queries", duration: "25 min" },
            { type: "document", title: "Responsive Design Patterns" },
            { type: "quiz", title: "Responsive Design Quiz" }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    name: "Lee",
    type: "both",
    skillOffer: "Leadership for Women",
    skillWant: "Data Analysis",
    profession: "Team Lead",
    expertise: "Leadership Development",
    contact: "linkedin.com/lee",
    courseContent: {
      duration: "6 hours",
      totalLessons: 12,
      chapters: [
        {
          title: "Introduction to Leadership",
          description: "Understanding leadership fundamentals",
          lessons: [
            { type: "video", title: "Leadership Styles", duration: "15 min" },
            { type: "document", title: "Leadership Framework" },
            { type: "quiz", title: "Leadership Basics Quiz" }
          ]
        },
        {
          title: "Team Management",
          description: "Effective team management strategies",
          lessons: [
            { type: "video", title: "Team Dynamics", duration: "20 min" },
            { type: "document", title: "Team Building Guide" },
            { type: "quiz", title: "Team Management Quiz" }
          ]
        },
        {
          title: "Communication Skills",
          description: "Developing effective communication",
          lessons: [
            { type: "video", title: "Communication Styles", duration: "25 min" },
            { type: "document", title: "Communication Best Practices" },
            { type: "quiz", title: "Communication Skills Quiz" }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    name: "Jordan",
    type: "offer",
    skillOffer: "Financial Literacy Workshop",
    profession: "Financial Advisor",
    expertise: "Personal Finance",
    contact: "linkedin.com/jordan",
    courseContent: {
      duration: "6 hours",
      totalLessons: 12,
      chapters: [
        {
          title: "Introduction to Finance",
          description: "Understanding financial basics",
          lessons: [
            { type: "video", title: "Financial Terms", duration: "15 min" },
            { type: "document", title: "Financial Concepts Guide" },
            { type: "quiz", title: "Finance Basics Quiz" }
          ]
        },
        {
          title: "Budgeting Fundamentals",
          description: "Creating and managing budgets",
          lessons: [
            { type: "video", title: "Budget Planning", duration: "20 min" },
            { type: "document", title: "Budgeting Templates" },
            { type: "quiz", title: "Budgeting Quiz" }
          ]
        },
        {
          title: "Investment Basics",
          description: "Introduction to investments",
          lessons: [
            { type: "video", title: "Investment Types", duration: "25 min" },
            { type: "document", title: "Investment Strategies" },
            { type: "quiz", title: "Investment Quiz" }
          ]
        }
      ]
    }
  },
  {
    id: 4,
    name: "Sam",
    type: "want",
    skillWant: "Digital Marketing",
    profession: "Content Creator",
    expertise: "Content Writing",
    contact: "linkedin.com/sam"
  },
  {
    id: 5,
    name: "Alex",
    type: "want",
    skillWant: "UX Design",
    profession: "Product Manager",
    expertise: "Product Strategy",
    contact: "linkedin.com/alex"
  }
]; 