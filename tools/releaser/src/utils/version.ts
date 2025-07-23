import chalk from 'chalk';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Sanitizes a version string by removing any leading 'v' if present.
 * Warns the user if the input contained a leading 'v'.
 *
 * @param version The version string to sanitize
 * @returns The sanitized version string
 */
export function sanitizeVersion(version: string): string {
  if (version.startsWith('v')) {
    const sanitized = version.substring(1);
    console.log(chalk.yellow(`Warning: Version "${version}" contains a leading 'v'. The 'v' prefix has been removed.`));
    console.log(chalk.yellow(`Using version "${sanitized}" instead.`));
    return sanitized;
  }
  return version;
}

/**
 * Gets the current version from the main app package.json.
 * This represents the latest version being worked on.
 *
 * @returns The current version string
 */
export function getLatestVersion(): string {
  try {
    // Assuming we're in tools/releaser, go back to the root and then to app/package.json
    const packageJsonPath = join(__dirname, '..', '..', '..', '..', 'app', 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.error(chalk.red('Error reading version from app/package.json:'));
    console.error(error);
    throw error;
  }
}
