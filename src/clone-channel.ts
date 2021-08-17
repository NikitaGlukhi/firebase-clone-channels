import { exec } from "@actions/exec";

interface CloneParams {
  projectId: string;
  channelId: string;
  targetProjectId: string;
  targetChannelId: string;
}

export async function cloneChannel(gacFilename: string, params: CloneParams) {
  const { projectId, channelId, targetProjectId, targetChannelId } = params;

  try {
    await exec(
      "npx firebase-tools",
      [
        'hosting:clone',
        ...[projectId, ':', channelId],
        ...[targetProjectId, ':', targetChannelId],
        '--json',
      ],
      {
        env: {
          ...process.env,
          FIREBASE_DEPLOY_AGENT: "action-hosting-deploy",
          GOOGLE_APPLICATION_CREDENTIALS: gacFilename,
        },
      }
    );
  } catch (err) {
    console.log(err.message);
  }
}
