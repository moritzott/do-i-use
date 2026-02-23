export interface IndexedPackage {
  name: string;
  version: string;
  path: string;
  isDirectDependency: boolean;
  peerDependencies?: Record<string, string>;
}
