"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, X, Download, Coffee, Linkedin, Video, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { samplePosts, Chapter, SkillPost } from "./data";

type SearchParams = { id: string };

interface CourseProps {
  searchParams: SearchParams;
}

export default function CoursePage({ searchParams }: CourseProps) {
  const router = useRouter();
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  // Get course data based on ID
  const courseData = samplePosts.find((post: SkillPost) => post.id === parseInt(searchParams.id));

  if (!courseData || !courseData.courseContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/70">Course not found</p>
      </div>
    );
  }

  const DownloadPopup = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setShowDownloadPopup(false)}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-transparent dark:bg-black/80 p-6 rounded-xl border border-gray-200 dark:border-white/10 max-w-md w-full mx-4 shadow-lg backdrop-blur-md"
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">{courseData.skillOffer} Course</h2>
            <div className="flex items-center gap-4 mt-2 text-foreground/70">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{courseData.courseContent.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">{courseData.courseContent.totalLessons} Lessons</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => router.back()}
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
                  {courseData.name[0]}
                </div>
                <div>
                  <p className="font-medium text-lg">{courseData.name}</p>
                  <p className="text-foreground/70">{courseData.profession}</p>
                </div>
              </div>
              <p className="text-foreground/70">{courseData.expertise}</p>
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
              {courseData.courseContent.chapters.map((chapter: Chapter, index: number) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-lg">Chapter {index + 1}: {chapter.title}</h4>
                    <span className="text-sm text-foreground/50">{chapter.lessons.length} lessons</span>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">{chapter.description}</p>
                  <div className="space-y-2">
                    {chapter.lessons.map((lesson: { type: "video" | "document" | "quiz"; title: string; duration?: string }, lessonIndex: number) => (
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
                            {lesson.type === 'video' && <Video className="w-4 h-4" />}
                            {lesson.type === 'document' && <FileText className="w-4 h-4" />}
                            {lesson.type === 'quiz' && <CheckCircle className="w-4 h-4" />}
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

      {/* Download Popup */}
      <AnimatePresence>
        {showDownloadPopup && <DownloadPopup />}
      </AnimatePresence>
    </main>
  );
} 