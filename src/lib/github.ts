import { Octokit } from "@octokit/rest";
import type { Activity } from "@/types";
import { DATA_FILE_PATH, PHOTOS_DIR } from "@/constants";
import { encodeBase64Unicode, decodeBase64Unicode } from "@/lib/utils";

export function createOctokitClient(pat: string): Octokit {
  return new Octokit({ auth: pat, userAgent: "bff-activity-tracker/1.0" });
}

export async function testConnection(octokit: Octokit, owner: string, repo: string): Promise<boolean> {
  try {
    await octokit.repos.get({ owner, repo });
    return true;
  } catch {
    return false;
  }
}

export async function fetchActivities(
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<{ activities: Activity[]; sha: string }> {
  const response = await octokit.repos.getContent({ owner, repo, path: DATA_FILE_PATH });
  const data = response.data as { content: string; sha: string };
  const content = decodeBase64Unicode(data.content);
  return { activities: JSON.parse(content) as Activity[], sha: data.sha };
}

export async function saveActivities(
  octokit: Octokit,
  owner: string,
  repo: string,
  activities: Activity[],
  sha: string,
  commitMsg: string
): Promise<string> {
  const content = encodeBase64Unicode(JSON.stringify(activities, null, 2));
  const response = await octokit.repos.createOrUpdateFileContents({
    owner, repo, path: DATA_FILE_PATH,
    message: commitMsg, content, sha,
  });
  const resp = response.data as { content: { sha: string } };
  return resp.content.sha;
}

export async function initializeRepo(
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<string> {
  const content = encodeBase64Unicode(JSON.stringify([], null, 2));
  const response = await octokit.repos.createOrUpdateFileContents({
    owner, repo, path: DATA_FILE_PATH,
    message: "init: create BFF activity tracker data store",
    content,
  });
  const resp = response.data as { content: { sha: string } };
  return resp.content.sha;
}

export async function dataFileExists(
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<boolean> {
  try {
    await octokit.repos.getContent({ owner, repo, path: DATA_FILE_PATH });
    return true;
  } catch {
    return false;
  }
}

export async function uploadPhoto(
  octokit: Octokit,
  owner: string,
  repo: string,
  activityId: string,
  filename: string,
  base64Content: string
): Promise<string> {
  const path = `${PHOTOS_DIR}/${activityId}/${filename}`;
  await octokit.repos.createOrUpdateFileContents({
    owner, repo, path,
    message: `photo: add ${filename}`,
    content: base64Content,
  });
  return path;
}

export async function fetchPhotoAsBlob(
  octokit: Octokit,
  owner: string,
  repo: string,
  path: string
): Promise<string> {
  const response = await octokit.repos.getContent({ owner, repo, path });
  const data = response.data as { content: string };
  const binary = atob(data.content.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const blob = new Blob([bytes], { type: "image/jpeg" });
  return URL.createObjectURL(blob);
}

export async function deletePhoto(
  octokit: Octokit,
  owner: string,
  repo: string,
  path: string
): Promise<void> {
  const response = await octokit.repos.getContent({ owner, repo, path });
  const data = response.data as { sha: string };
  await octokit.repos.deleteFile({
    owner, repo, path,
    message: `photo: remove ${path.split("/").pop()}`,
    sha: data.sha,
  });
}
