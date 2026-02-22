export interface PackageOccurrence {
  path: string;
  version: string;
  isDirectDependency: boolean;
  peerDependencies?: Record<string, string>;
}
