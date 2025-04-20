/* eslint-disable no-console */

const fs = require('fs/promises');
const path = require('path');

const [sourceFilePath, destinationInputPath] = process.argv.slice(2);

async function moveFile(sourcePath, destinationPath) {
  try {
    const destinationStats = await fs.stat(destinationPath).catch(() => null);

    const destinationIsDirectory =
      destinationStats && destinationStats.isDirectory();

    const finalDestinationPath = destinationIsDirectory
      ? path.join(destinationPath, path.basename(sourcePath))
      : destinationPath;

    await fs.rename(sourcePath, finalDestinationPath);
  } catch (error) {
    console.error('Failed to move file:', error.message);
  }
}

moveFile(sourceFilePath, destinationInputPath);
