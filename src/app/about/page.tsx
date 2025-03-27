"use client";

import { motion } from "framer-motion";
import { GridBackground } from "@/components/ui/grid-background";
import { Navbar } from "@/components/Navbar";
import { Globe, Users, Target, Award, BookOpen, Gamepad2, ChartBar, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0">
        <GridBackground />
      </div>

      <Navbar />

      <div className="relative pt-24 px-4 pb-24">
        <div className="max-w-7xl mx-auto space-y-16 mb-16">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold"
            >
              <span className="text-foreground">About </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">EqualHub</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground/80 max-w-3xl mx-auto"
            >
              A comprehensive platform developed for the GNEC Hackathon, focusing on SDG 5 (Gender Equality) and SDG 10 (Reduced Inequalities) through interactive learning and community engagement.
            </motion.p>
          </section>

          {/* Mission Section */}
          <section className="relative backdrop-blur-md bg-transparent rounded-xl p-8 border border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-foreground/80">
                  EqualHub was created as part of the GNEC Hackathon, connecting with GNEC's global network of 1,600 subsidiaries. Our platform serves as a bridge between technology and social impact, offering innovative solutions for promoting equality and inclusion.
                </p>
                <p className="text-foreground/80">
                  Through our four distinct modes, we provide comprehensive tools and resources aligned with UN Sustainable Development Goals 5 and 10, empowering users to learn, engage, and make a real difference in their communities.
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">Why EqualHub?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-red-400" />
                    <span className="text-foreground/80">Connected to GNEC's global NGO network</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-orange-400" />
                    <span className="text-foreground/80">Community-driven learning and impact</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-red-400" />
                    <span className="text-foreground/80">Focus on SDG 5 and SDG 10</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-orange-400" />
                    <span className="text-foreground/80">Interactive and engaging approach</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-foreground">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quest Mode */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative backdrop-blur-md bg-transparent rounded-xl p-6 border border-gray-200 dark:border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <BookOpen className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-semibold text-foreground">Quest Mode</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-foreground/80">
                    Embark on an enlightening journey through our Quest Mode - a meticulously crafted learning experience that directly addresses UN Sustainable Development Goals 5 and 10. This comprehensive challenge system transforms complex equality concepts into engaging, actionable knowledge.
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Five Dynamic Challenge Types:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold">1.</span>
                        <div>
                          <span className="font-semibold">Knowledge Check MCQs:</span> Carefully curated multiple-choice questions that test understanding of gender equality principles, discrimination forms, and inclusion strategies. Each question includes detailed explanations and real-world examples.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold">2.</span>
                        <div>
                          <span className="font-semibold">Scenario Analysis:</span> True/false scenarios based on real-world situations, helping users identify subtle forms of discrimination and bias. These scenarios are drawn from workplace, educational, and social contexts.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold">3.</span>
                        <div>
                          <span className="font-semibold">Interactive Fact Matching:</span> Engaging exercises that connect statistics with real-world impacts, helping users understand the current state of gender equality and social inclusion globally.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold">4.</span>
                        <div>
                          <span className="font-semibold">Personal Action Pledges:</span> Users commit to specific actions promoting equality in their communities. Each pledge is tracked and rewarded, creating accountability and measuring real-world impact.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold">5.</span>
                        <div>
                          <span className="font-semibold">Micro-Advocacy Challenges:</span> Practical tasks that encourage users to become advocates for equality, from sharing educational content to organizing local awareness events.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20 mt-4">
                    <h4 className="font-semibold text-foreground mb-2">SDG Alignment</h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>SDG 5:</strong> Challenges focus on gender wage gaps, leadership representation, and eliminating discriminatory practices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>SDG 10:</strong> Questions address income inequality, social inclusion policies, and equal opportunity initiatives</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-foreground/80">
                    Progress through our adaptive learning system that adjusts difficulty based on performance, ensuring an optimal learning experience for everyone from beginners to equality advocates. Earn badges, track your progress, and receive personalized recommendations for further learning and action.
                  </p>
                </div>
              </motion.div>

              {/* Play Mode */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative backdrop-blur-md bg-transparent rounded-xl p-6 border border-gray-200 dark:border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Gamepad2 className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-semibold text-foreground">Play Mode</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-foreground/80">
                    Transform learning about equality and inclusion into an engaging, interactive experience through our Play Mode. We've crafted a suite of educational games and team activities that make complex concepts accessible and memorable while fostering meaningful discussions and insights.
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Featured Interactive Games:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 font-semibold">1.</span>
                        <div>
                          <span className="font-semibold">Path to Parity:</span> A strategic board game where players navigate through various challenges and opportunities, making decisions that impact gender equality in different sectors. Features multiple scenarios including workplace advancement, educational access, and leadership opportunities.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 font-semibold">2.</span>
                        <div>
                          <span className="font-semibold">Balance Scales:</span> An interactive simulation where players balance resources and opportunities across different social groups, highlighting the importance of equitable distribution and policy-making. Includes real-world statistics and scenarios.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Team Building Activities:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 font-semibold">1.</span>
                        <div>
                          <span className="font-semibold">Inclusion Icebreakers:</span> Quick, engaging activities designed to start conversations about equality and inclusion in a comfortable, non-threatening way. Perfect for workshops and team meetings.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 font-semibold">2.</span>
                        <div>
                          <span className="font-semibold">Collaborative Challenges:</span> Group exercises that require diverse perspectives and inclusive decision-making to succeed. Helps teams practice inclusive behaviors while having fun.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20 mt-4">
                    <h4 className="font-semibold text-foreground mb-2">Learning Objectives</h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span><strong>SDG 5:</strong> Games highlight gender biases, promote equal opportunities, and challenge stereotypes through interactive scenarios</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span><strong>SDG 10:</strong> Activities demonstrate the impact of inequality and teach strategies for promoting inclusion across different social groups</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-foreground/80">
                    Each game and activity includes detailed facilitation guides, discussion prompts, and reflection questions to maximize learning impact. Track team progress, unlock new scenarios, and celebrate achievements through our gamified reward system.
                  </p>
                </div>
              </motion.div>

              {/* Skill Mode */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative backdrop-blur-md bg-transparent rounded-xl p-6 border border-gray-200 dark:border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <ChartBar className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-semibold text-foreground">Skill Mode</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-foreground/80">
                    Elevate your expertise in equality and inclusion through our comprehensive Skill Mode platform. We combine structured learning paths, expert mentorship, and practical resources to help you develop the skills needed to drive meaningful change in your organization and community.
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Learning Resources:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold">1.</span>
                        <div>
                          <span className="font-semibold">Structured Video Courses:</span> Expert-led video lessons covering topics like inclusive leadership, bias recognition and mitigation, gender-responsive policy making, and creating inclusive workplace cultures. Each course includes practical exercises and assessments.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold">2.</span>
                        <div>
                          <span className="font-semibold">Interactive Workshops:</span> Live and recorded workshop sessions focusing on practical skills development. Topics include inclusive communication, conflict resolution, advocacy techniques, and measuring equality initiatives' impact.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold">3.</span>
                        <div>
                          <span className="font-semibold">Resource Library:</span> Comprehensive collection of templates, toolkits, research papers, and case studies from leading organizations and experts in gender equality and social inclusion.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Mentorship Platform:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold">1.</span>
                        <div>
                          <span className="font-semibold">Expert Matching:</span> Connect with experienced mentors from our global network who specialize in various aspects of equality and inclusion. Our AI-powered matching system ensures meaningful mentor-mentee relationships.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold">2.</span>
                        <div>
                          <span className="font-semibold">Peer Learning Circles:</span> Join small groups of like-minded individuals working towards similar goals. Share experiences, challenges, and best practices in a supportive environment.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-semibold">3.</span>
                        <div>
                          <span className="font-semibold">Progress Tracking:</span> Set personal development goals, track your learning journey, and receive personalized recommendations for skill enhancement based on your interests and objectives.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20 mt-4">
                    <h4 className="font-semibold text-foreground mb-2">SDG Integration</h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>SDG 5:</strong> Focused training on gender mainstreaming, women's leadership development, and creating gender-responsive organizations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>SDG 10:</strong> Specialized courses on inclusive policy development, reducing institutional inequalities, and promoting equal opportunities</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-foreground/80">
                    Our platform leverages GNEC's global network to provide access to world-class expertise and resources. Earn certifications, build your professional network, and develop the skills needed to become an effective advocate for equality and inclusion.
                  </p>
                </div>
              </motion.div>

              {/* Impact Mode */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative backdrop-blur-md bg-transparent rounded-xl p-6 border border-gray-200 dark:border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Heart className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-semibold text-foreground">Impact Mode</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-foreground/80">
                    Transform your organization's approach to equality and inclusion through our powerful Impact Mode. This comprehensive assessment and analytics platform helps you measure, understand, and enhance your organization's inclusivity metrics while providing actionable insights for improvement.
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Assessment Tools:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 font-semibold">1.</span>
                        <div>
                          <span className="font-semibold">Inclusivity Assessment:</span> A detailed evaluation tool that measures key metrics including gender balance, leadership diversity, pay equity, and inclusion practices. Features customizable parameters to match your organization's context and goals.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 font-semibold">2.</span>
                        <div>
                          <span className="font-semibold">Policy Analysis:</span> Evaluate your organization's policies and procedures through an equality lens. Identifies gaps, potential biases, and areas for improvement in recruitment, promotion, and workplace practices.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 font-semibold">3.</span>
                        <div>
                          <span className="font-semibold">Culture Survey:</span> Anonymous feedback collection tool to understand employee experiences and perceptions of inclusion. Provides insights into workplace culture and identifies areas needing attention.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Analytics & Insights:</h4>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 font-semibold">1.</span>
                        <div>
                          <span className="font-semibold">Interactive Dashboards:</span> Real-time visualization of key metrics through customizable dashboards. Track progress over time, compare departments, and identify trends in your equality initiatives.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 font-semibold">2.</span>
                        <div>
                          <span className="font-semibold">Benchmarking Tools:</span> Compare your organization's performance against industry standards and best practices. Access anonymized data from similar organizations to set realistic goals.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 font-semibold">3.</span>
                        <div>
                          <span className="font-semibold">AI-Powered Recommendations:</span> Receive tailored suggestions for improvement based on your assessment results. Get specific action items prioritized by impact and feasibility.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20 mt-4">
                    <h4 className="font-semibold text-foreground mb-2">SDG Alignment & Reporting</h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span><strong>SDG 5:</strong> Track progress on gender equality metrics including representation, pay equity, and leadership opportunities. Generate reports aligned with global gender equality standards.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span><strong>SDG 10:</strong> Measure and report on broader inclusion metrics, socioeconomic diversity, and equal opportunity initiatives. Monitor progress towards reducing inequalities within your organization.</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-foreground/80">
                    Our Impact Mode goes beyond simple metrics to help you create lasting change. Generate comprehensive reports for stakeholders, track your progress towards SDG targets, and join a community of organizations committed to building a more equitable world.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* GNEC Connection Section */}
          <section className="relative backdrop-blur-md bg-transparent rounded-xl p-8 border border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-semibold text-foreground mb-6">GNEC Hackathon Connection</h2>
            <div className="space-y-4">
              <p className="text-foreground/80">
                EqualHub was developed as part of the fourth GNEC Hackathon, focusing specifically on UN SDGs 5 and 10. The platform leverages GNEC's connection to the UN and its global network of NGOs to create meaningful impact in gender equality and reduced inequalities.
              </p>
              <p className="text-foreground/80">
                Our platform demonstrates how technology can be used to address social challenges while providing educational resources and practical tools for organizations and individuals committed to creating a more equitable world.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
                  <h4 className="font-semibold text-foreground mb-2">Global Network</h4>
                  <p className="text-sm text-foreground/80">Connected to GNEC's 1,600 subsidiaries worldwide</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20">
                  <h4 className="font-semibold text-foreground mb-2">UN Alignment</h4>
                  <p className="text-sm text-foreground/80">Direct focus on UN SDGs 5 and 10</p>
                </div>
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
                  <h4 className="font-semibold text-foreground mb-2">Tech Innovation</h4>
                  <p className="text-sm text-foreground/80">Combining technology with social impact</p>
                </div>
              </div>
            </div>
          </section>

          {/* Future Plans Section */}
          <section className="relative backdrop-blur-md bg-transparent rounded-xl p-8 border border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Future Plans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Red */}
              <div className="space-y-4 bg-gradient-to-br from-red-500/5 via-pink-500/5 to-red-500/5 rounded-xl p-6 border border-red-500/10 hover:border-red-500/20 transition-colors">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">1.</span>
                  Administrative Features
                </h3>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Basic dashboard for adding and editing quiz questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Simple analytics to track user progress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Resource upload system for educational materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>User management and roles</span>
                  </li>
                </ul>
              </div>

              {/* Orange */}
              <div className="space-y-4 bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-orange-500/5 rounded-xl p-6 border border-orange-500/10 hover:border-orange-500/20 transition-colors">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">2.</span>
                  Quest Mode Improvements
                </h3>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Additional quiz questions and scenarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Basic progress tracking system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Downloadable certificates for completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>More real-world examples and case studies</span>
                  </li>
                </ul>
              </div>

              {/* Yellow-Green */}
              <div className="space-y-4 bg-gradient-to-br from-yellow-500/5 via-lime-500/5 to-green-500/5 rounded-xl p-6 border border-yellow-500/10 hover:border-yellow-500/20 transition-colors">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-lime-400">3.</span>
                  Play Mode Additions
                </h3>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>More scenarios for existing games</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Simple matching and sorting games</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Team discussion prompts and activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span>Basic achievement system</span>
                  </li>
                </ul>
              </div>

              {/* Blue */}
              <div className="space-y-4 bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-blue-500/5 rounded-xl p-6 border border-blue-500/10 hover:border-blue-500/20 transition-colors">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">4.</span>
                  Skill Mode Updates
                </h3>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Expanded resource library with downloadable materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Basic mentor-mentee matching system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Discussion forums for knowledge sharing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Simple progress tracking tools</span>
                  </li>
                </ul>
              </div>

              {/* Indigo-Purple */}
              <div className="space-y-4 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-indigo-500/5 rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/20 transition-colors">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">5.</span>
                  Impact Mode Enhancements
                </h3>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <span>Improved assessment questionnaires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <span>Basic data visualization for results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <span>Downloadable report templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <span>Simple recommendation system</span>
                  </li>
                </ul>
              </div>

              {/* Violet-Pink */}
              <div className="space-y-4 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-violet-500/5 rounded-xl p-6 border border-violet-500/10 hover:border-violet-500/20 transition-colors">
                <h3 className="text-lg font-semibold text-foreground">General Platform Improvements</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    <span>Mobile-responsive design improvements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    <span>Basic accessibility enhancements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    <span>Support for multiple languages (starting with English and one additional language)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    <span>Simple progress tracking and achievements system</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-foreground/80 italic mt-6">
              Note: We are focusing on implementing these core features effectively before expanding to more advanced functionality. Our goal is to provide a stable, user-friendly platform that delivers real value to our users.
            </p>
          </section>

          {/* Meet the Team Section */}
          <section className="relative backdrop-blur-md bg-transparent rounded-xl p-8 border border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Meet the Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Shahtab's Card */}
              <div className="group">
                <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-red-500/10 via-rose-500/5 to-red-400/10 rounded-2xl p-8 border border-red-200/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-white/40 rounded-2xl"></div>
                  <div className="relative flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-2 ring-red-200/30 ring-offset-2 ring-offset-white/10">
                      <img 
                        src="https://avatars.githubusercontent.com/u/35170216" 
                        alt="Shahtab Mohtasin"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">Shahtab Mohtasin</h3>
                    <p className="text-sm text-foreground/70 mb-4 font-medium">Lead Developer</p>
                    
                    <div className="flex gap-3 mb-6">
                      <a 
                        href="https://www.linkedin.com/in/shahtab-mohtasin/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 backdrop-blur-lg bg-white/30 rounded-full hover:bg-white/50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://devpost.com/smohtasin" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 backdrop-blur-lg bg-white/30 rounded-full hover:bg-white/50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-foreground/70" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c0-2.311-1.216-3.853-3.862-3.853z"/>
                        </svg>
                      </a>
                    </div>

                    <div className="space-y-4 text-center">
                      <p className="text-foreground/70 text-sm italic">
                        "Master's graduate in IT Management, AI enthusiast, and tech innovator."
                      </p>
                      <div className="pt-4 border-t border-red-200/20">
                        <p className="font-semibold text-foreground mb-2">Contribution to EqualHub:</p>
                        <div className="text-sm text-foreground/70 space-y-1">
                          <p>• Led full-stack development</p>
                          <p>• Designed UI/UX architecture</p>
                          <p>• Implemented core features</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Future Member 1 */}
              <div className="group">
                <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-red-500/10 via-rose-500/5 to-red-400/10 rounded-2xl p-8 border border-red-200/20 shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-white/40 rounded-2xl"></div>
                  <div className="relative flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-2 ring-red-200/30 ring-offset-2 ring-offset-white/10 bg-gradient-to-br from-red-100 to-white/80 flex items-center justify-center">
                      <span className="text-4xl text-red-300">?</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">Coming Soon</h3>
                    <p className="text-sm text-foreground/70 mb-6 font-medium">Future Team Member</p>
                    <p className="text-foreground/70 text-sm text-center">
                      Position open for a passionate developer interested in social impact through technology
                    </p>
                  </div>
                </div>
              </div>

              {/* Future Member 2 */}
              <div className="group">
                <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-red-500/10 via-rose-500/5 to-red-400/10 rounded-2xl p-8 border border-red-200/20 shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-white/40 rounded-2xl"></div>
                  <div className="relative flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-2 ring-red-200/30 ring-offset-2 ring-offset-white/10 bg-gradient-to-br from-red-100 to-white/80 flex items-center justify-center">
                      <span className="text-4xl text-red-300">?</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">Coming Soon</h3>
                    <p className="text-sm text-foreground/70 mb-6 font-medium">Future Team Member</p>
                    <p className="text-foreground/70 text-sm text-center">
                      Position open for an equality advocate with technical expertise
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 