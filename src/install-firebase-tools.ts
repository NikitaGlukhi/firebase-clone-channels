import { exec } from '@actions/exec';

export async function installFirebaseTools() {
    await exec('npm i -g firebase-tools');
}
