const core = require('@actions/core');
const { exec } = require('@actions/exec');
const { fileSync } = require('tmp');
const { writeSync } = require('fs');

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

    } catch (err) {
        throw new Error(err);
    }
}

run();
