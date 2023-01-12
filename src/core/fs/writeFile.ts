import fs from 'fs';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'pathe';
import logSymbols from 'log-symbols';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import { formatOutputWithPrettier } from './prettierFormat';

// @ts-ignore
export const __dirname = dirname(fileURLToPath(import.meta.url));

type ProcessPathAndWriteFileArgs = {
  srcDir: string;
  fileName: string;
  content: string;
};

export async function processPathAndWriteFile({
  content,
  fileName,
  srcDir,
}: ProcessPathAndWriteFileArgs): Promise<void> {
  try {
    const outDir = `.nuxt/typed-router`;
    const processedOutDir = resolve(srcDir, outDir);
    const outputFile = resolve(process.cwd(), `${processedOutDir}/${fileName}`);
    const formatedContent = await formatOutputWithPrettier(content);
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
    console.log(logSymbols.error, chalk.red(`Error while saving file at ${path}`, e));
    return Promise.reject(e);
  }
}
