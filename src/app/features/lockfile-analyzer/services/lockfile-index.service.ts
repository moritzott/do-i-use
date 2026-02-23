import { Injectable } from '@angular/core';
import { PackageLock } from '../../../core/models/package-lock.model';
import { IndexedPackage } from '../../../core/models/indexed-package.model';

/**
 * This service build a performant map.
 */
@Injectable({ providedIn: 'root' })
export class LockfileIndexService {
  buildIndex(lockfile: PackageLock): Map<string, IndexedPackage[]> {
    const index = new Map<string, IndexedPackage[]>();
    const rootDeps = lockfile.packages?.['']?.dependencies ?? {};

    for (const path in lockfile.packages) {
      const pkg = lockfile.packages[path];
      if (!pkg.version) continue;

      const name = this.extractName(path);
      if (!name) continue;

      const entry: IndexedPackage = {
        name,
        version: pkg.version,
        path,
        isDirectDependency: !!rootDeps[name],
        peerDependencies: pkg.peerDependencies,
      };

      if (!index.has(name)) {
        index.set(name, []);
      }

      index.get(name)!.push(entry);
    }

    return index;
  }

  private extractName(path: string): string {
    const parts = path.split('node_modules/');
    const packagePath = parts[parts.length - 1];

    const segments = packagePath.split('/');

    if (segments[0].startsWith('@')) {
      return segments.slice(0, 2).join('/');
    }

    return segments[0];
  }
}
