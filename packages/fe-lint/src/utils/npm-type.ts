import { sync as commandExistsSync } from 'command-exists';

export default new Promise<'pnpm' | 'npm'>((resolve, reject) => {
  if (commandExistsSync('pnpm')) resolve('pnpm');
  resolve('npm');
});
