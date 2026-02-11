import fs from 'fs';
import { resolve } from 'pathe';
import logSymbols from 'log-symbols';
import chalk from 'chalk';
import { mkdirp } from 'mkdirp';
import { moduleOptionStore } from '../config';
import { formatOutputWithPrettier } from './prettierFormat';

type ProcessPathAndWriteFileArgs = {
  fileName: string;
  content: string;
  outDir?: string;
};

export async function processPathAndWriteFile({
  content,
  fileName,
  outDir,
}: ProcessPathAndWriteFileArgs): Promise<void> {
  try {
    const { buildDir, disablePrettier } = moduleOptionStore;

    const processedOutDir = outDir ?? resolve(buildDir, 'typed-router');
    const outputFile = resolve(processedOutDir, fileName);
    const formatedContent = disablePrettier ? content : await formatOutputWithPrettier(content);

    if (fs.existsSync(outputFile)) {
      await writeFile(outputFile, formatedContent);
    } else {
      let dirList = outputFile.split('/');
      dirList.pop();
      const dirPath = dirList.join('/');
      await mkdirp(dirPath);
      await writeFile(outputFile, formatedContent);
    }
  } catch (e) {
    return Promise.reject(e);
  }
}

async function writeFile(path: string, content: string): Promise<void> {
  try {
    await fs.writeFileSync(path, content);
  } catch (e) {
    /* oxlint-disable-next-line no-console */
    console.log(logSymbols.error, chalk.red(`Error while saving file at ${path}`, e));
    return Promise.reject(e);
  }
}
