import { AnalysisResultsProps } from '@/types/security';

/**
 * Get color classes for severity badges
 */
function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical': return 'text-red-100 bg-red-900/60 border-red-500/60';
    case 'high': return 'text-orange-100 bg-orange-900/60 border-orange-500/60';
    case 'medium': return 'text-yellow-100 bg-yellow-900/60 border-yellow-500/60';
    case 'low': return 'text-blue-100 bg-blue-900/60 border-blue-500/60';
    default: return 'text-gray-200 bg-gray-800/60 border-gray-500/60';
  }
}

/**
 * Analysis results display component with summary and issues table
 */
export default function AnalysisResults({
  analysisResults,
  isAnalyzing,
  error
}: AnalysisResultsProps) {
  return (
    <div className="glass rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/5 border border-white/5">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-6 flex-shrink-0">
        Analysis Report
      </h2>

      <div className="flex-1 overflow-auto custom-scrollbar pr-2">
        {error && (
          <div className="bg-red-950/40 border border-red-500/40 rounded-lg p-4 text-red-200 backdrop-blur-sm animate-pulse">
            <strong className="block mb-1 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Error Encountered
            </strong>
            {error}
          </div>
        )}

        {!analysisResults && !error && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/5 rounded-xl bg-white/[0.02]">
            <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-50"></div>
              <svg className="w-10 h-10 text-white/40 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 max-w-sm text-lg font-light">
              {isAnalyzing
                ? 'Scanning codebase for vulnerabilities...'
                : 'Upload a file or directory to generate a comprehensive security report.'}
            </p>
          </div>
        )}

        {analysisResults && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Summary */}
            <div className="bg-gradient-to-br from-blue-950/40 to-slate-900/40 border border-blue-500/20 rounded-xl p-5 backdrop-blur-sm shadow-lg">
              <h3 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Executive Summary
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{analysisResults.summary}</p>
            </div>

            {/* Issues Table */}
            {analysisResults.issues.length > 0 ? (
              <div className="border border-white/10 rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm shadow-xl">
                <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-200">
                    Vulnerabilities Detected
                  </h3>
                  <span className="bg-red-500/10 text-red-300 text-xs px-3 py-1 rounded-full border border-red-500/20 font-medium">
                    {analysisResults.issues.length} Issues
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider bg-white/[0.02]">
                        <th className="px-4 py-3 font-medium">Issue</th>
                        <th className="px-4 py-3 font-medium">Severity</th>
                        <th className="px-4 py-3 font-medium">CVSS</th>
                        <th className="px-4 py-3 font-medium">Description</th>
                        <th className="px-4 py-3 font-medium">Vulnerable Code</th>
                        <th className="px-4 py-3 font-medium">Fix</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-white/5">
                      {analysisResults.issues.map((issue, index) => (
                        <tr key={index} className="hover:bg-white/[0.03] transition-colors group">
                          <td className="px-4 py-4 text-sm font-medium text-gray-200 group-hover:text-primary transition-colors">
                            {issue.title}
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(issue.severity)} shadow-sm`}>
                              {issue.severity.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-400 font-mono">
                            {issue.cvss_score}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-400 max-w-xs">
                            {issue.description}
                          </td>
                          <td className="px-4 py-4 text-sm font-mono bg-red-950/20 text-red-200/80 max-w-xs overflow-hidden border-l-2 border-red-500/30 rounded-r-md">
                            <pre className="whitespace-pre-wrap break-words p-2">{issue.code}</pre>
                          </td>
                          <td className="px-4 py-4 text-sm font-mono bg-green-950/20 text-green-200/80 max-w-xs overflow-hidden border-l-2 border-green-500/30 rounded-r-md">
                            <pre className="whitespace-pre-wrap break-words p-2">{issue.fix}</pre>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 bg-green-950/20 border border-green-500/20 rounded-xl backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 mb-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-green-400 font-medium text-lg">No Vulnerabilities Found</h3>
                <p className="text-green-400/60 text-sm mt-1">Your code appears to be secure based on our analysis.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}