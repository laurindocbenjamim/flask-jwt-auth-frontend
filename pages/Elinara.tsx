import React from 'react';
import { Sparkles, Heart, Star, Moon, Sun } from 'lucide-react';

export const Elinara: React.FC = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute top-10 left-10 animate-pulse text-indigo-300 opacity-20">
                <Star size={120} />
            </div>
            <div className="absolute bottom-10 right-10 animate-bounce text-pink-300 opacity-20">
                <Heart size={100} />
            </div>
            <div className="absolute top-1/4 right-1/4 animate-spin-slow text-yellow-200 opacity-10">
                <Sparkles size={150} />
            </div>

            <div className="max-w-4xl w-full space-y-8 animate-fade-in relative z-10 text-center">
                {/* Glass morphism card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <div className="relative h-24 w-24 bg-slate-900 rounded-full flex items-center justify-center border-2 border-white/30">
                                <Sparkles className="h-12 w-12 text-indigo-400 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 mb-6 tracking-tight">
                        Elinara
                    </h1>

                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-8"></div>

                    <p className="text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl mx-auto">
                        Discover a place of wonder and serenity. This page is a sanctuary for all who wander,
                        designed to inspire and evoke the beauty of the unknown.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="h-10 w-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Moon className="h-6 w-6 text-indigo-300" />
                            </div>
                            <h3 className="text-white font-semibold">Dreamscape</h3>
                            <p className="text-gray-400 text-sm mt-2">Explore the depths of imagination.</p>
                        </div>

                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Star className="h-6 w-6 text-purple-300" />
                            </div>
                            <h3 className="text-white font-semibold">Stardust</h3>
                            <p className="text-gray-400 text-sm mt-2">Connect with the cosmos around us.</p>
                        </div>

                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="h-10 w-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Sun className="h-6 w-6 text-yellow-300" />
                            </div>
                            <h3 className="text-white font-semibold">Radiance</h3>
                            <p className="text-gray-400 text-sm mt-2">Find lightness in every moment.</p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-full hover:bg-indigo-50 transition-all duration-300 shadow-xl hover:shadow-indigo-500/20 transform hover:-translate-y-1">
                            Explore Now
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes tilt {
          0%, 50%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(0.5deg); }
          75% { transform: rotate(-0.5deg); }
        }
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
        .animate-spin-slow {
          animation: spin 30s infinite linear;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};
