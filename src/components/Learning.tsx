import React, { useState } from 'react';
import { Shield, MapPin, Smartphone, BookOpen, Users, Star, CheckCircle, Play } from 'lucide-react';

const LearningSection = () => {
    return (
        <section id="learning" className="py-20 bg-muted/30" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Empower Yourself with Knowledge
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Interactive self-defense training designed by experts. Learn at your own pace with
                        gamified lessons and practical techniques you can use in real situations.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="text-center p-8 bg-gray-50 rounded-2xl">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Play className="h-8 w-8 text-blue-700" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Video Tutorials</h3>
                        <p className="text-gray-600">Step-by-step self-defense techniques demonstrated by certified instructors</p>
                    </div>

                    <div className="text-center p-8 bg-gray-50 rounded-2xl">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="h-8 w-8 text-green-700" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Gamified Learning</h3>
                        <p className="text-gray-600">Earn points, unlock achievements, and track your progress through interactive challenges</p>
                    </div>

                    <div className="text-center p-8 bg-gray-50 rounded-2xl">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="h-8 w-8 text-purple-700" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Practical Knowledge</h3>
                        <p className="text-gray-600">Learn about body weak points, situational awareness, and escape techniques</p>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default LearningSection;