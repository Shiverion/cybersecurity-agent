import { CodeInputProps } from '@/types/security';
import FileUpload from './FileUpload';

/**
 * Code input section with file upload and code display
 */
export default function CodeInput({
  codeContent,
  fileName,
  onFileUpload,
  onAnalyzeCode,
  isAnalyzing
}: CodeInputProps) {
  return (
    <div className="glass rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 border border-white/5">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <label htmlFor="code-input" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Source Code
        </label>

        <FileUpload
          fileName={fileName}
          onFileUpload={onFileUpload}
          onAnalyzeCode={onAnalyzeCode}
          isAnalyzing={isAnalyzing}
          hasCode={!!codeContent || !!fileName}
        />
      </div>

      <div className="relative flex-1 group">
        {/* Subtle gradient border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
        <textarea
          id="code-input"
          value={codeContent}
          readOnly
          placeholder="Select a Python file or directory to analyze..."
          className="relative w-full h-full resize-none bg-input-bg/60 backdrop-blur-md border border-white/10 rounded-lg p-4 font-mono text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder-gray-600"
        />
      </div>
    </div>
  );
}