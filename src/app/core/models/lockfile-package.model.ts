export interface LockfilePackage {
  version?: string;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}