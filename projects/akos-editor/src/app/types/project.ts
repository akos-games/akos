export interface Project {
  name: string;
  version: string;
  engineVersion: string;
  file?: string;
  firstSceneId?: number;
  paths?: {
    project: string;
    assets: string;
  };
  build?: {
    executableName: string;
  }
}
