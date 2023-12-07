import { exec } from '@actions/exec';

export async function installFirebaseTools(firebaseToolsVersion?: string): Promise<void> {
    const version = firebaseToolsVersion || 'latest';

    await exec(`npm i -g firebase-tools@${version}`);
}
