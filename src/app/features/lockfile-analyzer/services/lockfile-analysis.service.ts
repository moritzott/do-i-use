import { Injectable } from '@angular/core';
import { satisfies } from 'semver';
import { AnalysisResult } from '../../../core/models/analysis-result.model';
import { IndexedPackage } from '../../../core/models/indexed-package.model';

@Injectable({ providedIn: 'root' })
export class LockfileAnalysisService {
  analyze(
    index: Map<string, IndexedPackage[]>,
    name: string,
    versionRange: string,
  ): AnalysisResult {
    const matches = index.get(name);

    if (!matches || matches.length === 0) {
      return {
        found: false,
        occurrences: [],
      };
    }

    const filtered = matches.filter((pkg) =>
      satisfies(pkg.version, versionRange, { includePrerelease: true }),
    );

    return {
      found: filtered.length > 0,
      occurrences: filtered,
    };
  }
}
