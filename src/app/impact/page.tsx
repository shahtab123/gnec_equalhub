"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Users, UserCheck, Building2, ChevronRight, Clock, Target, Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GridBackground } from "@/components/ui/grid-background";

export default function ImpactMode() {
  const [name, setName] = useState("");
  const [totalPeople, setTotalPeople] = useState("");
  const [womenCount, setWomenCount] = useState("");
  const [marginalizedCount, setMarginalizedCount] = useState("");
  const [totalLeaders, setTotalLeaders] = useState("");
  const [womenLeaders, setWomenLeaders] = useState("");
  const [marginalizedLeaders, setMarginalizedLeaders] = useState("");
  const [hasTraining, setHasTraining] = useState(false);
  const [hasMentorship, setHasMentorship] = useState(false);
  const [hasEqualPay, setHasEqualPay] = useState(false);
  const [communityActions, setCommunityActions] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResultsModal(true);
    setShowAssessmentModal(false);
  };

  const calculateScores = () => {
    // Gender Balance Score (30 points max)
    // Optimal gender balance is considered around 40-60% representation
    const womenRatio = Number(womenCount) / Number(totalPeople);
    let genderScore = 0;
    
    if (womenRatio >= 0.4 && womenRatio <= 0.6) {
      // Full points for balanced representation (40-60%)
      genderScore = 30;
    } else if (womenRatio > 0.6) {
      // Reduce score for over-representation
      genderScore = 30 - ((womenRatio - 0.6) * 100);
    } else {
      // Reduce score for under-representation
      genderScore = (womenRatio / 0.4) * 30;
    }
    genderScore = Math.max(0, Math.min(30, genderScore)); // Cap between 0-30

    // Leadership Diversity Score (30 points max)
    const womenLeadershipRatio = Number(womenLeaders) / Number(totalLeaders);
    let leadershipScore = 0;
    
    if (womenLeadershipRatio >= 0.4 && womenLeadershipRatio <= 0.6) {
      // Full points for balanced leadership (40-60%)
      leadershipScore = 30;
    } else if (womenLeadershipRatio > 0.6) {
      // Reduce score for over-representation
      leadershipScore = 30 - ((womenLeadershipRatio - 0.6) * 100);
    } else {
      // Reduce score for under-representation
      leadershipScore = (womenLeadershipRatio / 0.4) * 30;
    }
    leadershipScore = Math.max(0, Math.min(30, leadershipScore)); // Cap between 0-30

    // Inclusion Score (20 points max)
    // Marginalized groups representation should be proportional but not over-represented
    const marginalizedRatio = Number(marginalizedCount) / Number(totalPeople);
    let inclusionScore = 0;
    
    if (marginalizedRatio >= 0.15 && marginalizedRatio <= 0.35) {
      // Full points for healthy representation (15-35%)
      inclusionScore = 20;
    } else if (marginalizedRatio > 0.35) {
      // Reduce score for over-representation
      inclusionScore = 20 - ((marginalizedRatio - 0.35) * 50);
    } else {
      // Reduce score for under-representation
      inclusionScore = (marginalizedRatio / 0.15) * 20;
    }
    inclusionScore = Math.max(0, Math.min(20, inclusionScore)); // Cap between 0-20

    // Support Systems Score (20 points max)
    const supportScore = (hasTraining ? 7 : 0) + (hasMentorship ? 7 : 0) + (hasEqualPay ? 6 : 0);

    // Calculate subscores as percentages
    const genderPercentage = (genderScore / 30) * 100;
    const leadershipPercentage = (leadershipScore / 30) * 100;
    const inclusionPercentage = (inclusionScore / 20) * 100;
    const supportPercentage = (supportScore / 20) * 100;

    // Total score
    const totalScore = Math.round(genderScore + leadershipScore + inclusionScore + supportScore);

    return {
      total: totalScore,
      gender: Math.round(genderPercentage),
      leadership: Math.round(leadershipPercentage),
      inclusion: Math.round(inclusionPercentage),
      support: Math.round(supportPercentage),
      details: {
        womenRatio,
        womenLeadershipRatio,
        marginalizedRatio,
        supportSystems: {
          training: hasTraining,
          mentorship: hasMentorship,
          equalPay: hasEqualPay
        }
      }
    };
  };

  const getRecommendations = (scores: ReturnType<typeof calculateScores>) => {
    const recommendations = [];

    // Gender Balance Recommendations
    if (scores.details.womenRatio > 0.6) {
      recommendations.push({
        category: "Gender Balance",
        text: "Consider improving gender diversity by increasing representation of other genders. Current women representation is above 60%.",
        priority: "High",
        sdg: "SDG 5"
      });
    } else if (scores.details.womenRatio < 0.4) {
      recommendations.push({
        category: "Gender Balance",
        text: "Implement targeted recruitment strategies to improve women representation to reach 40-60% balance.",
        priority: "High",
        sdg: "SDG 5"
      });
    }

    // Leadership Recommendations
    if (scores.details.womenLeadershipRatio > 0.6) {
      recommendations.push({
        category: "Leadership",
        text: "Consider balancing leadership roles among all genders. Current women leadership is above 60%.",
        priority: "Medium",
        sdg: "SDG 5"
      });
    } else if (scores.details.womenLeadershipRatio < 0.4) {
      recommendations.push({
        category: "Leadership",
        text: "Develop leadership training programs to achieve 40-60% women representation in leadership.",
        priority: "High",
        sdg: "SDG 5"
      });
    }

    // Inclusion Recommendations
    if (scores.details.marginalizedRatio > 0.35) {
      recommendations.push({
        category: "Inclusion",
        text: "While inclusion is important, consider maintaining a balanced representation across all groups.",
        priority: "Medium",
        sdg: "SDG 10"
      });
    } else if (scores.details.marginalizedRatio < 0.15) {
      recommendations.push({
        category: "Inclusion",
        text: "Create outreach programs to improve representation of marginalized groups (target: 15-35%).",
        priority: "High",
        sdg: "SDG 10"
      });
    }

    // Support Systems Recommendations
    if (!scores.details.supportSystems.training) {
      recommendations.push({
        category: "Support Systems",
        text: "Implement regular DEI training programs",
        priority: "Medium",
        sdg: "SDG 5 & 10"
      });
    }
    if (!scores.details.supportSystems.mentorship) {
      recommendations.push({
        category: "Support Systems",
        text: "Establish a formal mentorship program",
        priority: "Medium",
        sdg: "SDG 5 & 10"
      });
    }
    if (!scores.details.supportSystems.equalPay) {
      recommendations.push({
        category: "Support Systems",
        text: "Implement and communicate clear equal pay policies",
        priority: "High",
        sdg: "SDG 10"
      });
    }

    return recommendations;
  };

  const communityProjects = [
    {
      title: "Mentor Women in Tech",
      description: "Local Coding Club partnership with GNEC subsidiaries",
      impact: "15 women mentored",
      sdg: "SDG 5",
      icon: Users,
    },
    {
      title: "Build Rural Access",
      description: "Community Fundraiser for rural infrastructure",
      impact: "3 communities reached",
      sdg: "SDG 10",
      icon: Building2,
    },
    {
      title: "Inclusive Workplace Workshop",
      description: "Training sessions for corporate partners",
      impact: "200+ participants",
      sdg: "SDG 5 & 10",
      icon: UserCheck,
    }
  ];

  const volunteerOpportunities = [
    {
      title: "Tech Skills Workshop",
      location: "Women's Shelter",
      duration: "2 hours/week",
      impact: "Direct SDG 5 contribution"
    },
    {
      title: "Inclusion Workshop",
      location: "Community Center",
      duration: "3 hours/month",
      impact: "Direct SDG 10 contribution"
    },
    {
      title: "Rural Education Program",
      location: "Remote Villages",
      duration: "Weekend program",
      impact: "SDG 5 & 10 alignment"
    }
  ];

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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Impact Mode
            </h1>
            <div className="space-y-2">
              <div className="relative max-w-3xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl" />
                <p className="relative text-lg md:text-xl text-foreground/80 backdrop-blur-md bg-transparent rounded-xl p-6 border border-gray-200 dark:border-white/10">
                  Measure and improve your contribution to gender equality (SDG 5) and reduced inequalities (SDG 10).
                  <span className="block mt-2 text-red-500">Demo Version: Assessment and tracking functionality are simulated for demonstration purposes only.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Assessment Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAssessmentModal(true)}
            className="relative backdrop-blur-md bg-transparent rounded-xl p-6 border border-gray-200 dark:border-white/10 cursor-pointer hover:border-red-500/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-foreground">Inclusivity Assessment</h2>
                <p className="text-foreground/70">Evaluate your organization's inclusivity and get personalized recommendations.</p>
              </div>
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-3 rounded-full">
                <Plus className="w-6 h-6 text-foreground" />
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative backdrop-blur-md bg-transparent rounded-xl p-6 border border-gray-200 dark:border-white/10"
            >
              <div className="max-w-6xl mx-auto">
                <div className="relative bg-transparent rounded-xl p-6 border border-gray-200 dark:border-white/10">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-semibold">Results for {name}</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDownloadPopup(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 rounded-lg border border-white/10 hover:border-red-500/50 transition-all duration-300"
                    >
                      <Download size={18} />
                      Save as PDF
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold">{calculateScores().total}%</div>
                        <div className="text-sm opacity-80">Inclusivity Score</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Gender Equality</span>
                          <span>{Math.round((Number(womenCount) / Number(totalPeople)) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(Number(womenCount) / Number(totalPeople)) * 100}%` }}
                            className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Inclusion Score</span>
                          <span>{Number(marginalizedCount) > 0 ? "100%" : "50%"}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: Number(marginalizedCount) > 0 ? "100%" : "50%" }}
                            className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Improvement Tips</h3>
                      <ul className="space-y-2">
                        {Number(womenCount) / Number(totalPeople) < 0.5 && (
                          <li className="flex items-start gap-2">
                            <ChevronRight className="flex-shrink-0 mt-1" size={16} />
                            <span>Consider implementing mentorship programs to attract and retain women in your organization.</span>
                          </li>
                        )}
                        {Number(marginalizedCount) === 0 && (
                          <li className="flex items-start gap-2">
                            <ChevronRight className="flex-shrink-0 mt-1" size={16} />
                            <span>Develop outreach programs to connect with marginalized communities.</span>
                          </li>
                        )}
                        <li className="flex items-start gap-2">
                          <ChevronRight className="flex-shrink-0 mt-1" size={16} />
                          <span>Regular inclusivity training can help create a more welcoming environment.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Community Impact Hub */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-foreground">Make a Real Difference</h2>

            {/* Community Projects */}
            <div className="relative backdrop-blur-md bg-transparent rounded-xl p-6 border border-gray-200 dark:border-white/10">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Community Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {communityProjects.map((project, index) => {
                  const Icon = project.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="relative bg-transparent rounded-lg p-4 border border-gray-200 dark:border-white/10 hover:border-red-500/50 transition-all duration-300"
                    >
                      <Icon className="w-8 h-8 mb-4 text-red-500" />
                      <h4 className="font-semibold mb-2 text-foreground">{project.title}</h4>
                      <p className="text-sm text-foreground/70 mb-4">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-foreground/70">
                          {project.sdg}
                        </span>
                        <span className="text-xs text-foreground/70">{project.impact}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Volunteer Opportunities */}
            <div className="relative backdrop-blur-md bg-transparent rounded-xl p-6 border border-gray-200 dark:border-white/10">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Volunteer Opportunities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {volunteerOpportunities.map((opportunity, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-transparent rounded-lg p-4 border border-gray-200 dark:border-white/10 hover:border-red-500/50 transition-all duration-300"
                  >
                    <h4 className="font-semibold mb-2 text-foreground">{opportunity.title}</h4>
                    <div className="space-y-2 text-sm text-foreground/70">
                      <div className="flex items-center gap-2">
                        <Building2 size={16} />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{opportunity.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target size={16} />
                        <span>{opportunity.impact}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Assessment Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Inclusivity Assessment</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Evaluate your organization's commitment to gender equality (SDG 5) and reduced inequalities (SDG 10).
                </p>
              </div>
              <button
                onClick={() => setShowAssessmentModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Your Name
                      <span className="text-xs text-gray-500 block">The name to tie your results to (e.g., Alex, MyTeam)</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-gray-900"
                      placeholder="Enter your name or team name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Total People
                      <span className="text-xs text-gray-500 block">Total number in your group (e.g., employees, team members)</span>
                    </label>
                    <input
                      type="number"
                      value={totalPeople}
                      onChange={(e) => setTotalPeople(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-gray-900"
                      placeholder="e.g., 10"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Gender Representation */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Gender Representation (SDG 5)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Number of Women
                      <span className="text-xs text-gray-500 block">How many women are in your group (including yourself if applicable)</span>
                    </label>
                    <input
                      type="number"
                      value={womenCount}
                      onChange={(e) => setWomenCount(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-gray-900"
                      placeholder="e.g., 4"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Number from Marginalized Groups
                      <span className="text-xs text-gray-500 block">Count of people from underserved communities (can overlap with women count)</span>
                    </label>
                    <input
                      type="number"
                      value={marginalizedCount}
                      onChange={(e) => setMarginalizedCount(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-gray-900"
                      placeholder="e.g., 2"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Leadership Diversity */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Leadership Diversity</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Total Leadership Roles
                      <span className="text-xs text-gray-500 block">Number of leadership positions</span>
                    </label>
                    <input
                      type="number"
                      value={totalLeaders}
                      onChange={(e) => setTotalLeaders(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-gray-900"
                      placeholder="e.g., 3"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Women in Leadership
                      <span className="text-xs text-gray-500 block">Number of women leaders</span>
                    </label>
                    <input
                      type="number"
                      value={womenLeaders}
                      onChange={(e) => setWomenLeaders(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-gray-900"
                      placeholder="e.g., 1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Marginalized in Leadership
                      <span className="text-xs text-gray-500 block">Leaders from marginalized groups</span>
                    </label>
                    <input
                      type="number"
                      value={marginalizedLeaders}
                      onChange={(e) => setMarginalizedLeaders(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-gray-900"
                      placeholder="e.g., 1"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Support Systems */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Support Systems</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasTraining}
                        onChange={(e) => setHasTraining(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">Training Programs</span>
                    </label>
                    <p className="text-xs text-gray-500 ml-14">Regular skill development and DEI training</p>
                  </div>
                  <div className="space-y-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasMentorship}
                        onChange={(e) => setHasMentorship(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">Mentorship Program</span>
                    </label>
                    <p className="text-xs text-gray-500 ml-14">Structured guidance and support system</p>
                  </div>
                  <div className="space-y-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasEqualPay}
                        onChange={(e) => setHasEqualPay(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">Equal Pay Policy</span>
                    </label>
                    <p className="text-xs text-gray-500 ml-14">Fair compensation regardless of gender or background</p>
                  </div>
                </div>
              </div>

              {/* Community Impact */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Community Impact</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Community Actions Taken
                    <span className="text-xs text-gray-500 block">Number of community initiatives or volunteer activities this year</span>
                  </label>
                  <input
                    type="number"
                    value={communityActions}
                    onChange={(e) => setCommunityActions(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-gray-900"
                    placeholder="e.g., 2"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAssessmentModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-lg text-white font-medium transition-all duration-300"
                >
                  Assess My Impact
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Results Modal */}
      {showResultsModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Assessment Results for {name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Based on your responses, here's a detailed analysis of your organization's inclusivity.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setDownloadPopup(true)}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  aria-label="Download assessment results"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowResultsModal(false)}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {calculateScores().total}%
                  </div>
                  <div className="text-gray-600">Overall Inclusivity Score</div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Gender Balance (30%)</span>
                      <span className="text-gray-900 font-medium">{calculateScores().gender}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateScores().gender}%` }}
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Leadership Diversity (30%)</span>
                      <span className="text-gray-900 font-medium">{calculateScores().leadership}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateScores().leadership}%` }}
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Inclusion (20%)</span>
                      <span className="text-gray-900 font-medium">{calculateScores().inclusion}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateScores().inclusion}%` }}
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Support Systems (20%)</span>
                      <span className="text-gray-900 font-medium">{calculateScores().support}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateScores().support}%` }}
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Key Recommendations</h3>
                <div className="space-y-3">
                  {getRecommendations(calculateScores()).map((rec, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-900">{rec.category}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          rec.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}>
                          {rec.priority} Priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{rec.text}</p>
                      <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                        {rec.sdg}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowResultsModal(false)}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
              >
                Close
              </button>
              <button
                onClick={() => setDownloadPopup(true)}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-lg text-white font-medium transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Download Popup */}
      {downloadPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-xl bg-transparent rounded-xl p-6 border border-black/20 dark:border-white/10 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-semibold mb-4">Demo Notice</h3>
            <p className="mb-6 opacity-80">
              In this demo version, the PDF download feature is simulated. In a full version, this would generate a detailed PDF report of your impact assessment and recommendations.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDownloadPopup(false)}
                className="px-4 py-2 rounded-lg hover:bg-white/5 transition-colors duration-300"
              >
                Close
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDownloadPopup(false)}
                className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 rounded-lg border border-white/10 hover:border-red-500/50 transition-all duration-300"
              >
                Simulate Download
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
} 