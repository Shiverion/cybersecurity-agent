import { FileUploadProps } from '@/types/security';
import { useRef } from 'react';

/**
 * File upload button component for selecting Python files or directories
 */
export default function FileUpload({
  fileName,
  onFileUpload,
  onAnalyzeCode,
  isAnalyzing,
  hasCode
}: FileUploadProps) {
  const directoryInputRef = useRef<HTMLInputElement>(null);

  const handleDirectoryClick = () => {
    if (directoryInputRef.current) {
      directoryInputRef.current.click();
    }
  };

  return (
    <div className="flex items-center gap-4">
      {fileName && (
        <span className="text-sm font-mono text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent"></span>
          {fileName}
        </span>
      )}

      <input
        type="file"
        accept=".py"
        onChange={onFileUpload}
        className="hidden"
        id="file-upload"
      />

      <input
        type="file"
        // @ts-expect-error webkitdirectory is not standard but supported
        webkitdirectory=""
        directory=""
        onChange={onFileUpload}
        className="hidden"
        ref={directoryInputRef}
      />

      <div className="flex gap-2">
        <label
          htmlFor="file-upload"
          className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-105 font-medium backdrop-blur-sm hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]"
        >
          Upload File
        </label>

        <button
          onClick={handleDirectoryClick}
          className="bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30 px-4 py-2 rounded-lg cursor-pointer transition-all hover:scale-105 font-medium backdrop-blur-sm hover:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
        >
          Upload Directory
        </button>
      </div>

      <button
        onClick={onAnalyzeCode}
        disabled={!hasCode || isAnalyzing}
        className={`
          px-6 py-2 rounded-lg transition-all font-bold shadow-lg flex items-center gap-2
          ${!hasCode || isAnalyzing
            ? 'bg-gray-800 text-gray-600 border border-gray-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary to-blue-600 text-white border border-primary/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:scale-105'
          }
        `}
      >
        {isAnalyzing ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            <span>Analyze Security</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}