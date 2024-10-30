import { ScanResult } from '../../types';
import { ESLint } from 'eslint';

export default function (
  results: ESLint.LintResult[],
  quiet: boolean,
  eslint: ESLint,
): ScanResult[] {
  // todo: getRulesMetaForResults
  const ruleMeta = eslint.getRulesMetaForResults(results);

  return results
    .filter(({ errorCount, warningCount }) => errorCount || warningCount)
    .map(
      ({
        filePath,
        messages,
        errorCount,
        warningCount,
        fixableErrorCount,
        fixableWarningCount,
      }) => {
        return {
          filePath,
          errorCount,
          warningCount: quiet ? 0 : warningCount,
          fixableErrorCount,
          fixableWarningCount: quiet ? 0 : fixableWarningCount,
          messages: messages
            .map(({ line = 0, column = 0, ruleId, message, fatal, severity }) => {
              return {
                line,
                column,
                rule: ruleId,
                message,
                url: ruleMeta[ruleId]?.docs?.url || '',
                errored: fatal || severity === 2,
              };
            })
            .filter(({ errored }) => (quiet ? errored : true)),
        };
      },
    );
}
