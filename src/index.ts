import { getInput, startGroup, endGroup, setFailed } from '@actions/core';
import { createGacFile } from './create-gac-file';
import { cloneChannel } from './clone-channel';
import { installFirebaseTools } from './install-firebase-tools';

const projectId = getInput('project_id', { required: true });
const channelId = getInput('channel_id', { required: true });
const targetProjectId = getInput('target_project_id', { required: true });
const targetChannelId = getInput('target_channel_id', { required: true });
const googleApplicationCredentials = getInput('firebase_service_account', {
  required: true,
});
const firebaseToolsVersion = getInput('firebase_tools_version', { required: false });

async function run() {
  try {
    startGroup('Setting CLI credentials');
    const gacFilename = await createGacFile(googleApplicationCredentials);
    console.log(
      'Created a temporary file with Application Default Credentials.'
    );
    endGroup();

    startGroup('Install firebase-tools');
    await installFirebaseTools(firebaseToolsVersion);
    endGroup();

    startGroup(
      `Cloning ${projectId}:${channelId} to ${targetProjectId}:${targetChannelId}`
    );
    await cloneChannel(gacFilename, {
      projectId,
      channelId,
      targetProjectId,
      targetChannelId,
    });
    endGroup();
  } catch (err) {
    setFailed(err.message);
  }
}

run();
