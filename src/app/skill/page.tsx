"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GridBackground } from "@/components/ui/grid-background";
import { Navbar } from "@/components/Navbar";
import { Youtube, BookOpen, Users, AlertCircle, X, Download, Mail, Briefcase, Video, FileText, CheckCircle, Clock, Coffee, Linkedin, ExternalLink } from "lucide-react";

// Types
interface SkillPost {
  id: number;
  name: string;
  type: "offer" | "want" | "both";
  skillOffer?: string;
  skillWant?: string;
  profession: string;
  expertise: string;
  contact: string;
  courseContent?: {
    duration: string;
    totalLessons: number;
    chapters: {
      title: string;
      description: string;
      lessons: {
        type: "video" | "document" | "quiz";
        title: string;
        duration?: string;
      }[];
    }[];
  };
}

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  platform: "YouTube" | "Coursera" | "edX" | "TED-Ed" | "Khan Academy";
  sdgAlignment: "SDG 5" | "SDG 10" | "Both";
}

interface ExtendedResource {
  id: number;
  title: string;
  description: string;
  url: string;
  platform: "YouTube" | "Coursera" | "edX" | "TED-Ed" | "Khan Academy" | "FutureLearn" | "Alison" | "Google" | "UN Women" | "OpenLearn" | "Code.org" | "SkillsYouNeed" | "HubSpot" | "MIT";
  category: "YouTube Courses" | "Free Online Platforms" | "Other Free Resources";
  sdgAlignment: "SDG 5" | "SDG 10" | "Both";
  why: string;
}

// Sample Data
const samplePosts: SkillPost[] = [
  {
    id: 1,
    name: "Maya",
    type: "both",
    skillOffer: "Basic HTML and Web Development",
    skillWant: "Public Speaking Skills",
    profession: "Web Developer",
    expertise: "5 years of experience in frontend development",
    contact: "maya@example.com",
    courseContent: {
      duration: "6 hours",
      totalLessons: 12,
      chapters: [
        {
          title: "Introduction to HTML",
          description: "Learn the basics of HTML structure and elements",
          lessons: [
            {
              type: "video",
              title: "Welcome to HTML Basics",
              duration: "10:00"
            },
            {
              type: "document",
              title: "HTML Structure Guide"
            },
            {
              type: "video",
              title: "Creating Your First HTML Page",
              duration: "15:00"
            }
          ]
        },
        {
          title: "CSS Fundamentals",
          description: "Style your web pages with CSS",
          lessons: [
            {
              type: "video",
              title: "CSS Basics Overview",
              duration: "12:00"
            },
            {
              type: "document",
              title: "CSS Cheat Sheet"
            },
            {
              type: "quiz",
              title: "Test Your CSS Knowledge"
            }
          ]
        },
        {
          title: "JavaScript Basics",
          description: "Add interactivity to your websites",
          lessons: [
            {
              type: "video",
              title: "Introduction to JavaScript",
              duration: "20:00"
            },
            {
              type: "document",
              title: "JavaScript Best Practices"
            },
            {
              type: "quiz",
              title: "JavaScript Fundamentals Quiz"
            }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    name: "Sam",
    type: "want",
    skillWant: "Public Speaking Skills",
    profession: "Student",
    expertise: "Beginner public speaker",
    contact: "sam@example.com"
  },
  {
    id: 3,
    name: "Lee",
    type: "both",
    skillOffer: "Leadership for Women",
    skillWant: "Digital Marketing",
    profession: "Team Lead",
    expertise: "3 years leadership experience",
    contact: "lee@example.com",
    courseContent: {
      duration: "6 hours",
      totalLessons: 12,
      chapters: [
        {
          title: "Introduction to Leadership",
          description: "Learn the fundamentals of effective leadership",
          lessons: [
            {
              type: "video",
              title: "Welcome to Leadership Basics",
              duration: "10:00"
            },
            {
              type: "document",
              title: "Leadership Framework Guide"
            },
            {
              type: "video",
              title: "Understanding Your Leadership Style",
              duration: "15:00"
            }
          ]
        },
        {
          title: "Team Management",
          description: "Master essential team management skills",
          lessons: [
            {
              type: "video",
              title: "Team Dynamics Overview",
              duration: "12:00"
            },
            {
              type: "document",
              title: "Team Management Cheat Sheet"
            },
            {
              type: "quiz",
              title: "Test Your Management Knowledge"
            }
          ]
        },
        {
          title: "Communication Skills",
          description: "Develop effective communication strategies",
          lessons: [
            {
              type: "video",
              title: "Introduction to Business Communication",
              duration: "20:00"
            },
            {
              type: "document",
              title: "Communication Best Practices"
            },
            {
              type: "quiz",
              title: "Communication Skills Assessment"
            }
          ]
        }
      ]
    }
  },
  {
    id: 4,
    name: "Alex",
    type: "want",
    skillWant: "Digital Marketing",
    profession: "Marketing Assistant",
    expertise: "1 year marketing experience",
    contact: "alex@example.com"
  },
  {
    id: 5,
    name: "Jordan",
    type: "offer",
    skillOffer: "Financial Literacy Workshop",
    profession: "Financial Advisor",
    expertise: "7 years in financial planning",
    contact: "jordan@example.com",
    courseContent: {
      duration: "6 hours",
      totalLessons: 12,
      chapters: [
        {
          title: "Introduction to Finance",
          description: "Learn the basics of personal finance",
          lessons: [
            {
              type: "video",
              title: "Welcome to Financial Literacy",
              duration: "10:00"
            },
            {
              type: "document",
              title: "Financial Planning Guide"
            },
            {
              type: "video",
              title: "Understanding Money Basics",
              duration: "15:00"
            }
          ]
        },
        {
          title: "Budgeting Fundamentals",
          description: "Master essential budgeting techniques",
          lessons: [
            {
              type: "video",
              title: "Budgeting Overview",
              duration: "12:00"
            },
            {
              type: "document",
              title: "Budgeting Templates"
            },
            {
              type: "quiz",
              title: "Test Your Budgeting Knowledge"
            }
          ]
        },
        {
          title: "Investment Basics",
          description: "Learn about investment opportunities",
          lessons: [
            {
              type: "video",
              title: "Introduction to Investments",
              duration: "20:00"
            },
            {
              type: "document",
              title: "Investment Best Practices"
            },
            {
              type: "quiz",
              title: "Investment Knowledge Check"
            }
          ]
        }
      ]
    }
  }
];

const resources: Resource[] = [
  {
    id: 1,
    title: "HTML Fundamentals for Beginners",
    description: "Learn the basics of web development with this comprehensive HTML course. Perfect for women entering tech.",
    url: "https://www.youtube.com/watch?v=kUMe1FH4CHE",
    platform: "YouTube",
    sdgAlignment: "SDG 5"
  },
  {
    id: 2,
    title: "Public Speaking Mastery",
    description: "Build confidence and master the art of public speaking with expert tips and techniques.",
    url: "https://www.ted.com/talks",
    platform: "TED-Ed",
    sdgAlignment: "SDG 10"
  },
  {
    id: 3,
    title: "Women in Leadership",
    description: "Develop essential leadership skills and strategies for women in management roles.",
    url: "https://www.coursera.org/learn/women-in-leadership",
    platform: "Coursera",
    sdgAlignment: "SDG 5"
  },
  {
    id: 4,
    title: "Digital Literacy Fundamentals",
    description: "Master basic digital skills to reduce technological gaps and enhance inclusivity.",
    url: "https://www.khanacademy.org/computing",
    platform: "Khan Academy",
    sdgAlignment: "SDG 10"
  },
  {
    id: 5,
    title: "Inclusive Leadership",
    description: "Learn how to lead diverse teams and create inclusive workplaces.",
    url: "https://www.edx.org/learn/leadership",
    platform: "edX",
    sdgAlignment: "Both"
  }
];

const extendedResources: ExtendedResource[] = [
  // YouTube Courses
  {
    id: 1,
    title: "HTML Basics for Beginners",
    description: "learn how to create a simple web page using HTML",
    url: "https://youtu.be/FQdaUv95mR8?si=J1_1pu0OUAtEj4jU",
    platform: "YouTube",
    category: "YouTube Courses",
    sdgAlignment: "SDG 5",
    why: "Teaches coding basics, empowering women in tech"
  },
  {
    id: 2,
    title: "Public Speaking for Beginners",
    description: "Public speaking for beginners. FREE 7 Instant Tips for Confident & Composed Public Speaking",
    url: "https://youtu.be/i5mYphUoOCs?si=QabGVG_uqTJrWOY-",
    platform: "YouTube",
    category: "YouTube Courses",
    sdgAlignment: "SDG 10",
    why: "Builds confidence for all, especially underrepresented voices"
  },
  {
    id: 3,
    title: "The Science of Women's Leadership",
    description: "Why are there so few women leaders?",
    url: "https://youtu.be/FVzHBWoIGEw?si=QeVMFN-ICFXJxzZZ",
    platform: "YouTube",
    category: "YouTube Courses",
    sdgAlignment: "SDG 5",
    why: "Empowers women to lead"
  },
  {
    id: 4,
    title: "How to Start a Speech",
    description: "How to Start a Speech: The Best (and Worst) Speech Openers",
    url: "https://youtu.be/7tzentBmmUc?si=hAz5n2W2wNhKIO3t",
    platform: "YouTube",
    category: "YouTube Courses",
    sdgAlignment: "SDG 5",
    why: "Helps close gender pay gaps"
  },
  {
    id: 5,
    title: "Digital Literacy Basics",
    description: "Digital Literacy Skills to Succeed in Learning and Beyond | Yimin Yang",
    url: "https://youtu.be/GgEGbMPJcAo?si=a7n-nNc8NCXjoqRO",
    platform: "YouTube",
    category: "YouTube Courses",
    sdgAlignment: "SDG 10",
    why: "Bridges tech access for marginalized groups"
  },
  {
    id: 6,
    title: "3 ways to be more inclusive ",
    description: "Aduke Onafowokan is gender equality, diversity and inclusion advocate.",
    url: "https://www.youtube.com/watch?v=jtJkIjUQHtE&ab_channel=TEDxTalks",
    platform: "YouTube",
    category: "YouTube Courses",
    sdgAlignment: "SDG 10",
    why: "Teaches inclusion skills for workplaces"
  },
  {
    id: 7,
    title: "Write an Incredible Resume",
    description: "Practical resume writing tips following each one of Austin's findings",
    url: "https://www.youtube.com/watch?v=Tt08KmFfIYQ&ab_channel=JeffSu",
    platform: "YouTube",
    category: "YouTube Courses",
    sdgAlignment: "SDG 10",
    why: "Helps underserved groups land jobs"
  },

  // Free Online Platforms
  {
    id: 8,
    title: "Intro to HTML/CSS",
    description: "comprehensive web development course",
    url: "https://www.khanacademy.org/computing/computer-programming/html-css",
    platform: "Khan Academy",
    category: "Free Online Platforms",
    sdgAlignment: "SDG 5",
    why: "Free coding skills for women in tech"
  },
  {
    id: 9,
    title: "Women in Leadership",
    description: "Coursera's leadership course (Audit Free)",
    url: "https://www.coursera.org/learn/women-in-leadership",
    platform: "Coursera",
    category: "Free Online Platforms",
    sdgAlignment: "SDG 5",
    why: "Audit mode offers free leadership training"
  },
  {
    id: 10,
    title: "Inclusive Leadership",
    description: "edX's course on inclusive leadership (Audit Free)",
    url: "https://www.edx.org/certificates/professional-certificate/harvardx-leadership-and-communication?index=product&queryId=91411a0a09e699825da0b3f540260df2&position=1",
    platform: "edX",
    category: "Free Online Platforms",
    sdgAlignment: "SDG 10",
    why: "Free audit teaches inclusion skills"
  },
  {
    id: 11,
    title: "Open Online Course on Gender and Environment",
    description: "FutureLearn's introduction to gender equality",
    url: "https://unccelearn.org/course/view.php?id=39&page=overview&lang=en",
    platform: "unccelearn",
    category: "Free Online Platforms",
    sdgAlignment: "SDG 5",
    why: "Free access to gender equality concepts"
  },
  {
    id: 12,
    title: "Gender Discrimination in the Workplace",
    description: "Investigate the origins and causes of gender-based",
    url: "https://alison.com/course/gender-discrimination-in-the-workplace",
    platform: "Alison",
    category: "Free Online Platforms",
    sdgAlignment: "SDG 10",
    why: "Free course on fostering inclusion"
  },
  {
    id: 13,
    title: "Fundamentals of Digital Marketing",
    description: "Google Digital Garage's marketing course",
    url: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing",
    platform: "Google",
    category: "Free Online Platforms",
    sdgAlignment: "Both",
    why: "Free skills for economic empowerment"
  },
  {
    id: 14,
    title: "How to Speak So People Want to Listen",
    description: "TED-Ed's guide to effective speaking",
    url: "https://www.youtube.com/watch?v=eIho2S0ZahI",
    platform: "TED-Ed",
    category: "Free Online Platforms",
    sdgAlignment: "SDG 10",
    why: "Free public speaking tips"
  },

  // Other Free Resources
  {
    id: 15,
    title: "I Know Gender",
    description: "UN Women Training Centre's gender course",
    url: "https://portal.trainingcentre.unwomen.org/product/i-know-gender-1-2-3-gender-concepts-to-get-started-international-frameworks-for-gender-equality-and-promoting-gender-equality-throughout-the-un-system/",
    platform: "UN Women",
    category: "Other Free Resources",
    sdgAlignment: "SDG 5",
    why: "Free gender equality intro"
  },
  {
    id: 16,
    title: "Understanding Diversity and Inclusion",
    description: "open edu comprehensive D&I guide",
    url: "https://www.open.edu/openlearn/money-business/diversity-and-inclusion-the-workplace/content-section-overview?active-tab=description-tab",
    platform: "open edu",
    category: "Other Free Resources",
    sdgAlignment: "SDG 10",
    why: "Free course on inclusion basics"
  },
  {
    id: 17,
    title: "Hour of Code",
    description: "Code.org's introduction to coding",
    url: "https://code.org/learn",
    platform: "Code.org",
    category: "Other Free Resources",
    sdgAlignment: "SDG 5",
    why: "Free coding intro for all, especially women"
  },

  {
    id: 18,
    title: "Social Media Marketing",
    description: "HubSpot Academy's marketing course",
    url: "https://academy.hubspot.com/courses/social-media",
    platform: "HubSpot",
    category: "Other Free Resources",
    sdgAlignment: "SDG 10",
    why: "Free skills for economic inclusion"
  },
  {
    id: 29,
    title: "Entrepreneurship 101",
    description: "MIT OpenCourseWare's business basics",
    url: "https://ocw.mit.edu/courses/15-s21-nuts-and-bolts-of-business-plans-january-iap-2014/",
    platform: "MIT",
    category: "Other Free Resources",
    sdgAlignment: "Both",
    why: "Free business skills for women and underserved groups"
  }
];

export default function SkillPage() {
  const [name, setName] = useState("");
  const [skillOffer, setSkillOffer] = useState("");
  const [skillWant, setSkillWant] = useState("");
  const [selectedPost, setSelectedPost] = useState<SkillPost | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showContactConfirmation, setShowContactConfirmation] = useState(false);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showMoreResources, setShowMoreResources] = useState(false);

  // Modal Components
  const UserDetailsModal = ({ post }: { post: SkillPost }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50"
      onClick={() => setShowUserDetails(false)}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/20 max-w-md w-full mx-4 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{post.name}'s Profile</h3>
          <button 
            onClick={() => setShowUserDetails(false)}
            aria-label="Close user details"
            title="Close user details"
            className="hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-400" />
            <p className="text-foreground/70">{post.profession}</p>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <p className="text-foreground/70">{post.expertise}</p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-green-400" />
            <p className="text-foreground/70">{post.contact}</p>
          </div>
          <div className="flex gap-3 mt-6">
            {post.skillOffer && (
              <button
                onClick={() => {
                  setShowUserDetails(false);
                  setShowCourseDetails(true);
                }}
                className="flex-1 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400"
              >
                Want to Learn
              </button>
            )}
            {post.skillWant && (
              <button
                onClick={() => {
                  setShowUserDetails(false);
                  setShowContactConfirmation(true);
                }}
                className="flex-1 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400"
              >
                Want to Teach
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const ContactConfirmationPopup = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50"
      onClick={() => setShowContactConfirmation(false)}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/20 max-w-md w-full mx-4 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center space-y-4">
          <Mail className="w-12 h-12 text-green-400 mx-auto" />
          <h3 className="text-xl font-semibold">Contact Request Sent!</h3>
          <p className="text-foreground/70">Your contact information has been sent to the user.</p>
          <button
            onClick={() => setShowContactConfirmation(false)}
            className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  const CourseDetailsPage = ({ post }: { post: SkillPost }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">{post.skillOffer} Course</h2>
            <div className="flex items-center gap-4 mt-2 text-foreground/70">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{post.courseContent?.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">{post.courseContent?.totalLessons} Lessons</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowCourseDetails(false)}
            aria-label="Close course details"
            title="Close course details"
            className="hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          <div className="bg-transparent dark:bg-black/40 rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-lg backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-4">About the Instructor</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold">
                  {post.name[0]}
                </div>
                <div>
                  <p className="font-medium text-lg">{post.name}</p>
                  <p className="text-foreground/70">{post.profession}</p>
                </div>
              </div>
              <p className="text-foreground/70">{post.expertise}</p>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#FF5E5B]/20 hover:bg-[#FF5E5B]/30 rounded-lg text-[#FF5E5B] transition-colors"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Buy me a coffee</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 rounded-lg text-[#0A66C2] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-transparent dark:bg-black/40 rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-lg backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-6">Course Content</h3>
            <div className="space-y-6">
              {post.courseContent?.chapters.map((chapter, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-lg">Chapter {index + 1}: {chapter.title}</h4>
                    <span className="text-sm text-foreground/50">{chapter.lessons.length} lessons</span>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">{chapter.description}</p>
                  <div className="space-y-2">
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div 
                        key={`${index}-${lessonIndex}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-transparent dark:bg-black/40 border border-gray-200 dark:border-white/10 group backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            lesson.type === 'video' 
                              ? 'bg-blue-500/20 text-blue-400' 
                              : lesson.type === 'document'
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {lesson.type === 'video' && <Video key={`video-${index}-${lessonIndex}`} className="w-4 h-4" />}
                            {lesson.type === 'document' && <FileText key={`doc-${index}-${lessonIndex}`} className="w-4 h-4" />}
                            {lesson.type === 'quiz' && <CheckCircle key={`quiz-${index}-${lessonIndex}`} className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            {lesson.duration && (
                              <p className="text-xs text-foreground/50">{lesson.duration}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowDownloadPopup(true)}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download
          </button>
        </div>
      </div>
    </motion.div>
  );

  const DownloadPopup = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50"
      onClick={() => setShowDownloadPopup(false)}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/20 max-w-md w-full mx-4 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto" />
          <h3 className="text-xl font-semibold">Demo Version</h3>
          <p className="text-foreground/70">As this is a demo version, no content will be downloaded.</p>
          <button
            onClick={() => setShowDownloadPopup(false)}
            className="px-6 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-400"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  const MoreResourcesModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50"
      onClick={() => setShowMoreResources(false)}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/20 max-w-6xl w-full mx-4 shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Resources</h2>
          <button 
            onClick={() => setShowMoreResources(false)}
            aria-label="Close resources modal"
            title="Close resources modal"
            className="hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          {["YouTube Courses", "Free Online Platforms", "Other Free Resources"].map((category) => (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-semibold border-b border-white/10 pb-2">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extendedResources
                  .filter(resource => resource.category === category)
                  .map(resource => (
                    <motion.a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      className="block p-4 rounded-lg bg-transparent hover:bg-black/5 dark:bg-black/40 dark:hover:bg-black/60 border border-gray-200 dark:border-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {resource.platform === "YouTube" && <Youtube className="w-5 h-5 text-red-400" />}
                        {resource.platform === "Coursera" && <BookOpen className="w-5 h-5 text-blue-400" />}
                        {resource.platform === "edX" && <BookOpen className="w-5 h-5 text-purple-400" />}
                        {resource.platform === "TED-Ed" && <Video className="w-5 h-5 text-red-400" />}
                        {resource.platform === "Khan Academy" && <BookOpen className="w-5 h-5 text-green-400" />}
                        {resource.platform === "FutureLearn" && <BookOpen className="w-5 h-5 text-pink-400" />}
                        {resource.platform === "Alison" && <BookOpen className="w-5 h-5 text-yellow-400" />}
                        {resource.platform === "Google" && <BookOpen className="w-5 h-5 text-blue-400" />}
                        {resource.platform === "UN Women" && <Users className="w-5 h-5 text-purple-400" />}
                        {resource.platform === "OpenLearn" && <BookOpen className="w-5 h-5 text-orange-400" />}
                        {resource.platform === "Code.org" && <FileText className="w-5 h-5 text-blue-400" />}
                        {resource.platform === "SkillsYouNeed" && <BookOpen className="w-5 h-5 text-green-400" />}
                        {resource.platform === "HubSpot" && <BookOpen className="w-5 h-5 text-orange-400" />}
                        {resource.platform === "MIT" && <BookOpen className="w-5 h-5 text-red-400" />}
                        <span className="font-medium">{resource.title}</span>
                      </div>
                      <p className="text-sm text-foreground/70 mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-purple-400">{resource.sdgAlignment}</span>
                        <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-foreground/50">
                          {resource.platform}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-sm text-foreground/70">
                          <span className="font-medium text-blue-400">Why: </span>
                          {resource.why}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-xs text-foreground/50">
                        <ExternalLink className="w-3 h-3" />
                        <span>Open in new tab</span>
                      </div>
                    </motion.a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0">
        <GridBackground />
      </div>

      <Navbar />

      <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skill Mode
            </h1>
            <div className="space-y-2">
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                Share your skills, learn from others, and access free resources to promote equality and inclusion.
              </p>
              <p className="text-red-400 text-sm font-medium flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Demo Version: Browse Skills and Share Your Skills functionality are simulated for demonstration purposes only
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Post Skills */}
            <div className="lg:col-span-1">
              {/* Posting Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-transparent dark:bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-lg"
              >
                <h2 className="text-xl font-semibold text-foreground mb-4">Share Your Skills</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-500/50"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="skillOffer" className="block text-sm font-medium text-foreground/70 mb-1">
                      I Can Teach
                    </label>
                    <input
                      type="text"
                      id="skillOffer"
                      value={skillOffer}
                      onChange={(e) => setSkillOffer(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-500/50"
                      placeholder="Enter a skill you can teach"
                    />
                  </div>
                  <div>
                    <label htmlFor="skillWant" className="block text-sm font-medium text-foreground/70 mb-1">
                      I Want to Learn
                    </label>
                    <input
                      type="text"
                      id="skillWant"
                      value={skillWant}
                      onChange={(e) => setSkillWant(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-500/50"
                      placeholder="Enter a skill you want to learn"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-white/10 rounded-lg text-foreground font-semibold transition-all duration-300 hover:border-purple-500/50"
                  >
                    Post Skills
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Middle Column - Browse Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 bg-transparent dark:bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-lg flex flex-col min-h-[600px]"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users key="browse-skills-icon" className="w-5 h-5" />
                <span>Browse Skills</span>
              </h2>
              <div className="space-y-4 flex-grow">
                {samplePosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setSelectedPost(post);
                      setShowUserDetails(true);
                    }}
                    className="p-4 rounded-lg bg-transparent hover:bg-black/5 dark:bg-black/40 dark:hover:bg-black/60 border border-gray-200 dark:border-white/10 cursor-pointer transition-all duration-300 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{post.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.type === "offer" 
                          ? "bg-green-500/20 text-green-400" 
                          : post.type === "want"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-purple-500/20 text-purple-400"
                      }`}>
                        {post.type === "offer" ? "Offering" : post.type === "want" ? "Seeking" : "Exchange"}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {post.skillOffer && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Offers</span>
                          <p className="text-foreground/70 text-sm">{post.skillOffer}</p>
                        </div>
                      )}
                      {post.skillWant && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">Seeks</span>
                          <p className="text-foreground/70 text-sm">{post.skillWant}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto pt-6 flex justify-center">
                <button
                  className="px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 rounded-lg text-white font-medium transition-all duration-300"
                >
                  Browse More Skills
                </button>
              </div>
            </motion.div>

            {/* Right Column - Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="bg-transparent dark:bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-lg">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen key="resources-icon" className="w-5 h-5" />
                  <span>Free Resources</span>
                </h2>
                <div className="space-y-4">
                  {resources.map((resource) => (
                    <motion.a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      className="block p-4 rounded-lg bg-transparent hover:bg-black/5 dark:bg-black/40 dark:hover:bg-black/60 border border-gray-200 dark:border-white/10 transition-all duration-300 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {resource.platform === "YouTube" && <Youtube key={`yt-${resource.id}`} className="w-5 h-5 text-red-400" />}
                        {resource.platform === "Coursera" && <BookOpen key={`coursera-${resource.id}`} className="w-5 h-5 text-blue-400" />}
                        {resource.platform === "edX" && <BookOpen key={`edx-${resource.id}`} className="w-5 h-5 text-purple-400" />}
                        {resource.platform === "TED-Ed" && <Youtube key={`ted-${resource.id}`} className="w-5 h-5 text-red-400" />}
                        {resource.platform === "Khan Academy" && <BookOpen key={`khan-${resource.id}`} className="w-5 h-5 text-green-400" />}
                        <span className="font-medium text-foreground">{resource.title}</span>
                      </div>
                      <p className="text-sm text-foreground/70 mb-2">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-purple-400">{resource.sdgAlignment}</span>
                        <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-foreground/50">
                          {resource.platform}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setShowMoreResources(true)}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 rounded-lg text-white font-medium transition-all duration-300"
                  >
                    Browse Resources
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence mode="wait">
        {showUserDetails && selectedPost && (
          <UserDetailsModal key="user-details-modal" post={selectedPost} />
        )}
        {showContactConfirmation && (
          <ContactConfirmationPopup key="contact-confirmation-modal" />
        )}
        {showCourseDetails && selectedPost && (
          <CourseDetailsPage key="course-details-modal" post={selectedPost} />
        )}
        {showDownloadPopup && (
          <DownloadPopup key="download-popup-modal" />
        )}
        {showMoreResources && (
          <MoreResourcesModal key="more-resources-modal" />
        )}
      </AnimatePresence>
    </main>
  );
} 