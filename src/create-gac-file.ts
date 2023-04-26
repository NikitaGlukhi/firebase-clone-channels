import { fileSync } from 'tmp';
import { writeSync } from 'fs';

export async function createGacFile(googleApplicationCredentials: string) {
  const tmpFile = fileSync({ postfix: '.json' });
  writeSync(tmpFile.fd, googleApplicationCredentials);
  return tmpFile.name;
}
