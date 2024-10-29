import { LintResults } from 'markdownlint';
import { ScanResult } from '../../types';
export default function (results: LintResults, quiet?: boolean) {
  const parsedResults: ScanResult[] = [];

  for (const key in results) {
    if (!Object.prototype.hasOwnProperty.call(results, key) || quiet) continue;
    const lintResults = results[key];
    let warningCount = 0;
    let fixableWarningCount = 0;
    const messages = lintResults.map(
      ({ fixInfo, lineNumber, ruleNames, ruleInformation, ruleDescription, errorRange }) => {
        if (fixInfo) {
          fixableWarningCount++;
        }
        warningCount++;
        return {
          line: lineNumber,
          column: Array.isArray(errorRange) ? errorRange[1] : 1,
          rule: ruleNames[0],
          url: ruleInformation,
          message: ruleDescription,
          errored: false,
        };
      },
    );
    parsedResults.push({
      filePath: key,
      messages,
      errorCount: 0,
      fixableErrorCount: 0,
      warningCount,
      fixableWarningCount,
    });
  }

  return parsedResults;
}
