import path from 'path';
import tsd from 'tsd';

export async function runTypesDiagnostics(dirName: string, fileName: string) {
  const diagnostic = await tsd({
    cwd: dirName,
    testFiles: [path.basename(fileName)],
    typingsFile: `./${path.basename(fileName)}`,
  });

  if (diagnostic.length) {
    console.error(
      diagnostic.map(
        (m) => `Error in file ${m.fileName}:${m.line}:${m.column}:
    ${m.message}`
      )
    );
  }

  return diagnostic;
}
