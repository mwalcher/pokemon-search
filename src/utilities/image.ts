import type { IsMergedVersionData } from '@/types/versions';

export const getImageUrl = (baseUrl: string, path: string) => {
  return new URL(`../assets/${path}.png`, baseUrl).href;
};

export const getVersionPath = (version: IsMergedVersionData) => {
  return `versions/${version.version_group.name}/${version.name}`;
};
