import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, File as FileIcon, X, BrainCircuit, Mic } from 'lucide-react';
import { DriveFile } from '../types';

export const CrossReference: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Initial file passed from navigation
    const initialFile = location.state?.file as DriveFile | undefined;

    const [selectedFiles, setSelectedFiles] = useState<DriveFile[]>(() => {
        const saved = localStorage.getItem('crossRefFiles');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (initialFile) {
            setSelectedFiles(prev => {
                if (prev.some(f => f.id === initialFile.id)) return prev;
                return [...prev, initialFile];
            });
        }
    }, [initialFile?.id]);

    useEffect(() => {
        localStorage.setItem('crossRefFiles', JSON.stringify(selectedFiles));
    }, [selectedFiles]);

    const [isProcessing, setIsProcessing] = useState(false);

    const removeFile = (id: string) => {
        setSelectedFiles(selectedFiles.filter(f => f.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/drive')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
                >
                    <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                        <ArrowLeft className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Back to Drive</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-white/50">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-200">
                                    <BrainCircuit className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">AI Cross Reference</h1>
                                    <p className="text-gray-500">Analyze and connect data across your documents</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                                    Selected Documents
                                </h3>

                                {selectedFiles.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                        <FileIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 font-medium">No files selected</p>
                                        <p className="text-sm text-gray-400">Go back to Drive to select files</p>
                                        <button
                                            onClick={() => navigate('/drive')}
                                            className="mt-4 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-medium hover:bg-gray-50"
                                        >
                                            Select Files
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {selectedFiles.map(file => (
                                            <div key={file.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 shadow-sm rounded-xl group hover:border-blue-200 transition-all">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <FileIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-gray-900 truncate">{file.name}</p>
                                                        <p className="text-xs text-gray-500 truncate">{file.mimeType}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeFile(file.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {selectedFiles.length > 0 && (
                            <div className="bg-white rounded-3xl shadow-xl p-8 border border-white/50">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
                                        Voice Instructions
                                    </h3>
                                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-lg">Beta</span>
                                </div>

                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 text-center">
                                    <div className="h-16 w-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-105 transition-transform">
                                        <Mic className="h-8 w-8 text-indigo-600" />
                                    </div>
                                    <p className="text-gray-600 font-medium mb-1">Tap to speak</p>
                                    <p className="text-sm text-gray-400">"Compare the budget in file A with the report in file B"</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Processing Status */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl shadow-2xl p-8 text-white h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <h2 className="text-xl font-bold mb-2">Agent AI</h2>
                                    <p className="text-indigo-200 text-sm mb-8">Ready to process your documents</p>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <Sparkles className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium">Context extraction</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <BrainCircuit className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium">Semantic analysis</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <FileIcon className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium">Cross-referencing</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    disabled={selectedFiles.length === 0 || isProcessing}
                                    className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${selectedFiles.length === 0
                                        ? 'bg-white/10 text-white/50 cursor-not-allowed'
                                        : 'bg-white text-indigo-900 hover:bg-indigo-50'
                                        }`}
                                >
                                    {isProcessing ? 'Processing...' : 'Run Analysis'}
                                    {!isProcessing && <Sparkles className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
