import { LockfilePackage } from "./lockfile-package.model";

export interface PackageLock {
  name?: string;
  version?: string;
  packages?: Record<string, LockfilePackage>;
}
