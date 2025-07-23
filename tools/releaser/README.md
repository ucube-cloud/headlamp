# Headlamp Releaser Tool

This tool helps manage Headlamp releases by checking release status, managing artifacts, and automating release workflows.

## Commands

### check

Check if a release draft exists with all required artifacts.

```bash
# Check a specific version
node dist/index.js check 0.33.0

# Check the current version from app/package.json
node dist/index.js check LATEST_VERSION

# Get JSON output for automation
node dist/index.js check LATEST_VERSION --json
```

#### JSON Output

When using the `--json` flag, the command outputs structured data:

```json
{
  "version": "0.33.0",
  "success": true,
  "timestamp": "2024-07-23T12:00:00.000Z",
  "releaseFound": true,
  "allArtifactsPresent": true,
  "foundAssets": {
    "Headlamp-0.33.0-mac-x64.dmg": true,
    "Headlamp-0.33.0-mac-arm64.dmg": true,
    "Headlamp-0.33.0-linux-arm64.AppImage": true,
    // ... other artifacts
  },
  "unknownAssets": [],
  "error": null
}
```

## Release Status Page

The repository automatically publishes a release status page to GitHub Pages that shows the current status of release artifacts. This page is updated nightly at 2:00 AM UTC and can be manually triggered.

The status page shows:
- Current release version
- Whether a release draft exists
- Status of all required artifacts (Mac, Linux, Windows binaries)
- Visual indicators for missing artifacts
- Last update timestamp

### Manual Trigger

You can manually trigger the release status check by going to the Actions tab in GitHub and running the "Release Status Check" workflow.

## Development

```bash
# Install dependencies
npm install

# Build the tool
npm run build

# Run commands
node dist/index.js <command>
```

## Environment Variables

- `GITHUB_TOKEN`: Required for GitHub API access when checking releases