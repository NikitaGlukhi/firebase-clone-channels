const core = require('@actions/core');
const { exec } = require('@actions/exec');
const { fileSync } = require('tmp');
const { writeSync, existsSync } = require('fs');

const firebase = {
    entryPoint: core.getInput('entry_point', { required: false }),
    projectId: core.getInput('project_id', { required: true }),
    channelId: core.getInput('channel_id', { required: true }),
    targetProjectId: core.getInput('target_project_id', { required: true }),
    targetChannelId: core.getInput('target_channel_id', { required: true }),
    googleApplicationCredentials: core.getInput('firebase_service_account', { required: true }),
};

async function createGacFile(firebaseServiceAccount) {
    const tmpFile = fileSync({ postfix: '.json' });
    writeSync(tmpFile.fd, firebaseServiceAccount);
    return tmpFile.name;
}

async function run() {
    try {
        core.startGroup('Verifying firebase.json exists');

        if (firebase.entryPoint !== '.') {
            console.log(`Changing to directory: ${firebase.entryPoint}`);

            try {
                process.chdir(firebase.entryPoint);
            } catch (err) {
                throw Error(`Error changing to directory ${firebase.entryPoint}: ${err}`);
            }
        }

        if (existsSync('./firebase.json')) {
            console.log('firebase.json file found. Continuing deploy.');
        } else {
            throw Error("firebase.json file not found. If your firebase.json file is not in the root of your repo, edit the entryPoint option of this GitHub action.");
        }

        core.endGroup();

        core.startGroup("Setting up CLI credentials");
        const gacFilename = await createGacFile(firebase.googleApplicationCredentials);
        console.log("Created a temporary file with Application Default Credentials.");
        core.endGroup();

        await exec(
            `npx firebase-tools hosting:clone ${firebase.projectId}:${firebase.channelId} ${firebase.targetProjectId}:${firebase.targetChannelId}`,
            [],
            {
                env: {
                    GOOGLE_APPLICATION_CREDENTIALS: gacFilename
                }
            }
        )

    } catch (err) {}
}

run();
