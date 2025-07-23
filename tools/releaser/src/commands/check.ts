import chalk from 'chalk';
import { getRelease, checkArtifactsForRelease, checkReleaseDetailed } from '../utils/github';
import { sanitizeVersion, getLatestVersion } from '../utils/version';

interface CheckOptions {
  json?: boolean;
}

export async function checkRelease(releaseVersion: string, options: CheckOptions = {}): Promise<void> {
  let version: string;
  
  if (releaseVersion.toUpperCase() === 'LATEST_VERSION') {
    version = getLatestVersion();
    if (!options.json) {
      console.log(chalk.blue(`Using latest version: ${version}`));
    }
  } else {
    version = sanitizeVersion(releaseVersion);
  }

  if (options.json) {
    // JSON output mode
    const result = await checkReleaseDetailed(version);
    console.log(JSON.stringify(result, null, 2));
    if (!result.success) {
      process.exit(1);
    }
    return;
  }

  // Normal console output mode
  console.log(chalk.blue(`Checking release draft for version ${version}...`));

  try {
    const releaseDraft = await getRelease(version);

    if (!releaseDraft) {
      console.error(chalk.red(`Error: No release draft found for version ${version}`));
      process.exit(1);
    }

    console.log(chalk.green(`✅ Release draft found for v${version}`));

    const artifactsComplete = await checkArtifactsForRelease(releaseDraft);

    if (artifactsComplete) {
      console.log(chalk.green('✅ All required artifacts (Mac, Linux, Windows) are uploaded'));
    } else {
      console.error(chalk.red('❌ Some required artifacts are missing from the release draft'));
      process.exit(1);
    }

    console.log(chalk.green(`\nRelease draft for v${version} is ready to be published!`));
  } catch (error) {
    console.error(chalk.red('Error checking release draft:'));
    console.error(error);
    process.exit(1);
  }
}
