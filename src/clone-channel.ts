import { exec } from '@actions/exec';

interface CloneParams {
  projectId: string;
  channelId: string;
  targetProjectId: string;
  targetChannelId: string;
}

export async function cloneChannel(gacFilename: string, params: CloneParams): Promise<void> {
  const { projectId, channelId, targetProjectId, targetChannelId } = params;

  try {
    await exec(
      'firebase',
      [
        'hosting:clone',
        `${projectId}:${channelId}`,
        `${targetProjectId}:${targetChannelId}`,
        '--json',
      ],
      {
        env: {
          ...process.env,
          GOOGLE_APPLICATION_CREDENTIALS: gacFilename,
        },
      }
    );
  } catch (err) {
    console.log(err.message);
  }
}
