'use client'

import { useState } from 'react';
import { AnalysisResponse } from '@/types/security';
import CodeInput from '@/components/CodeInput';
import AnalysisResults from '@/components/AnalysisResults';

// Force relative URLs in production builds
// Only use localhost when explicitly running in development mode
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && window.location?.hostname === 'localhost'
    ? 'http://localhost:8000'
    : '');


/**
 * Main application page for cybersecurity code analysis
 */
export default function Home() {
  const [codeContent, setCodeContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      setAnalysisResults(null);
      setError(null);

      if (files.length === 1) {
        const file = files[0];
        setFileName(file.name);
        if (file.name.endsWith('.py')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setCodeContent(e.target?.result as string);
          };
          reader.readAsText(file);
        } else {
          setCodeContent('Selected file is not a Python file.');
        }
      } else {
        setFileName(`${files.length} files selected`);
        // Filter for python files to show preview or just list them
        const pyFiles = Array.from(files).filter(f => f.name.endsWith('.py'));
        setCodeContent(`Selected directory contains ${files.length} files (${pyFiles.length} Python files).\n\nReady to analyze.`);
      }
    }
  };

  const handleAnalyzeCode = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('Please upload files first');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch(`${API_BASE_URL}/api/analyze-files`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const results: AnalysisResponse = await response.json();
      setAnalysisResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-10 text-center">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">Security Audit Protocol v1.0</span>
          </div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary mb-4 drop-shadow-sm tracking-tight">
            Cybersecurity Analyst
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Advanced AI-powered security assessment for your Python codebase.
            <span className="text-primary/80"> Upload</span>, <span className="text-secondary/80">Scan</span>, and <span className="text-accent/80">Secure</span> your applications.
          </p>
        </header>

        <div className="grid grid-rows-[1fr_auto] lg:grid-rows-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)] min-h-[600px]">
          <CodeInput
            codeContent={codeContent}
            fileName={fileName}
            onFileUpload={handleFileUpload}
            onAnalyzeCode={handleAnalyzeCode}
            isAnalyzing={isAnalyzing}
          />

          <AnalysisResults
            analysisResults={analysisResults}
            isAnalyzing={isAnalyzing}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}