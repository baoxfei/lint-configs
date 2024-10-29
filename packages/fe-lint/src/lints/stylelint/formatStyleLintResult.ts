import { ScanResult } from './../../types';
import { LintResult } from 'stylelint';
import { getStylelintRuleDocUrl } from './getStylelintDocUrl';

export default function (results: LintResult[], quiet: boolean): ScanResult[] {
  return results.map(({ source, warnings }) => {
    let errorCount = 0;
    let warningCount = 0;
    // 当quiet 为true 且
    const messages = warnings
      .filter((item) => !quiet || item.severity === 'error')
      .map(({ severity, column, text, rule, line }) => {
        if (severity === 'error') {
          errorCount += 1;
        } else {
          warningCount += 1;
        }

        return {
          line,
          column,
          rule,
          url: getStylelintRuleDocUrl(rule),
          message: text,
          errored: severity === 'error',
        };
      });
    return {
      filePath: source,
      errorCount,
      warningCount,
      messages,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
    };
  });
}
