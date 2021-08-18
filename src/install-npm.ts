import { exec } from "@actions/exec";

export async function installNpm() {
  await exec("npm i -g npm@7.19.1");
}
