import React, { useState } from "react";
import {
  BookOpen,
  Play,
  Trophy,
  Star,
  Clock,
  CheckCircle,
  Lock,
  Target,
  Users,
  Award,
  TrendingUp,
  Video,
} from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import WeeklyCalendar from "./WeeklyCalendar";

interface LearningSectionProps {
  user: any;
}

const LearningSection: React.FC<LearningSectionProps> = ({ user }) => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const learningModules = [
    {
      id: "basic-awareness",
      title: "Situational Awareness Basics",
      description:
        "Learn to identify potential threats and stay alert in various environments",
      duration: "15 min",
      difficulty: "Beginner",
      completed: true,
      locked: false,
      lessons: 5,
      points: 100,
      badge: "Observer",
      color: "green",
    },
    {
      id: "self-defense-basics",
      title: "Basic Self-Defense Techniques",
      description:
        "Essential moves and techniques to protect yourself in dangerous situations",
      duration: "25 min",
      difficulty: "Beginner",
      completed: true,
      locked: false,
      lessons: 8,
      points: 150,
      badge: "Defender",
      color: "blue",
    },
    {
      id: "escape-techniques",
      title: "Escape and Evasion",
      description:
        "Learn how to break free from grabs and escape dangerous situations",
      duration: "20 min",
      difficulty: "Intermediate",
      completed: false,
      locked: false,
      lessons: 6,
      points: 200,
      badge: "Escape Artist",
      color: "purple",
    },
    {
      id: "pressure-points",
      title: "Pressure Points & Weak Spots",
      description: "Understanding human anatomy for effective self-defense",
      duration: "18 min",
      difficulty: "Intermediate",
      completed: false,
      locked: false,
      lessons: 7,
      points: 180,
      badge: "Strategist",
      color: "red",
    },
    {
      id: "advanced-combat",
      title: "Advanced Combat Techniques",
      description:
        "Advanced striking and defensive maneuvers for serious situations",
      duration: "30 min",
      difficulty: "Advanced",
      completed: false,
      locked: true,
      lessons: 10,
      points: 300,
      badge: "Warrior",
      color: "orange",
    },
    {
      id: "weapon-defense",
      title: "Weapon Threat Defense",
      description: "How to respond when facing armed attackers safely",
      duration: "35 min",
      difficulty: "Advanced",
      completed: false,
      locked: true,
      lessons: 12,
      points: 350,
      badge: "Guardian",
      color: "indigo",
    },
  ];

  const achievements = [
    {
      name: "First Steps",
      description: "Complete your first lesson",
      earned: true,
    },
    {
      name: "Quick Learner",
      description: "Complete 3 modules in one day",
      earned: true,
    },
    {
      name: "Safety Expert",
      description: "Complete all beginner modules",
      earned: true,
    },
    { name: "Dedication", description: "7-day learning streak", earned: false },
    { name: "Master", description: "Complete all modules", earned: false },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-50 border-green-200 text-green-800",
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      red: "bg-red-50 border-red-200 text-red-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header & Progress */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Learning Hub
          </h1>
          <p className="text-gray-600">
            Build your self-defense skills with interactive training modules
          </p>
        </div>
        <div className="mt-4 lg:mt-0 ">
          <div className="flex gap-5">
            {/* <span>
              2x💰
            </span> */}
            <span className="bg-white p-2 rounded-lg shadow-sm border border-gray-200" >🔥 0</span>
            <span className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">💰 0</span>
            <span className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">🛡️ 0</span>
            <div id="earnedBadgesDisplay"></div>
          </div>
          {/* <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">630</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Badges Unlocked</div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Modules */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Training Modules
            </h2>
            <VideoPlayer />
            {/* <div className="grid gap-4">
              {learningModules.map((module) => (
                <div
                  key={module.id}
                  className={`p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
                    module.locked
                      ? "bg-gray-50 border-gray-200 opacity-60"
                      : module.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() =>
                    !module.locked &&
                    setActiveModule(
                      activeModule === module.id ? null : module.id
                    )
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${getColorClasses(
                            module.color
                          )}`}
                        >
                          {module.locked ? (
                            <Lock className="h-5 w-5" />
                          ) : module.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5" />
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {module.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{module.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{module.lessons} lessons</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>{module.points} pts</span>
                        </div>
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            module.difficulty === "Beginner"
                              ? "bg-green-100 text-green-800"
                              : module.difficulty === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {module.difficulty}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {module.completed && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Trophy className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {module.badge}
                          </span>
                        </div>
                      )}
                      {!module.locked && (
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            module.completed
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          }`}
                        >
                          {module.completed ? "Review" : "Start"}
                        </button>
                      )}
                    </div>
                  </div>
                  {activeModule === module.id && !module.locked && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Module Content
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Array.from({ length: module.lessons }, (_, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <Video className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">
                                Lesson {i + 1}
                              </p>
                              <p className="text-sm text-gray-600">
                                3-4 minutes
                              </p>
                            </div>
                            {i < 2 || module.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div> */}
          </div>
        </div>
        {/*Right - Sidebar */}
        <div className="space-y-6">
          {/* Calendar View Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Overall Completion
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    33%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "33%" }}
                  ></div>
                </div>
              </div>
              
              {/* Weekly Calendar Component */}
              <WeeklyCalendar />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Next Badge</span>
                <span className="text-sm font-semibold text-purple-600">
                  Dedication
                </span>
              </div>
            </div>
          </div>
          {/* Achievements */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Achievements
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    achievement.earned
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-gray-50"
                  }`}
                >
                  <Award
                    className={`h-5 w-5 ${
                      achievement.earned ? "text-yellow-600" : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        achievement.earned ? "text-yellow-900" : "text-gray-600"
                      }`}
                    >
                      {achievement.name}
                    </p>
                    <p
                      className={`text-sm ${
                        achievement.earned ? "text-yellow-700" : "text-gray-500"
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningSection;
