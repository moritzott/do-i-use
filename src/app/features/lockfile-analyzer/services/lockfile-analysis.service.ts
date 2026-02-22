import { Injectable } from "@angular/core";
import { PackageSearchQuery } from "../../../core/models/package-search-query.model";
import { AnalysisResult } from "../../../core/models/analysis-result.model";
import { PackageLock } from "../../../core/models/package-lock.model";
import { PackageOccurrence } from "../../../core/models/package-occurence.model";

@Injectable({ providedIn: 'root' })
export class LockfileAnalysisService {

  analyze(
    lockfile: PackageLock,
    query: PackageSearchQuery
  ): AnalysisResult {

    const occurrences: PackageOccurrence[] = [];

    const rootDependencies =
      lockfile.packages?.['']?.dependencies ?? {};

    for (const path in lockfile.packages) {
      const pkg = lockfile.packages[path];

      if (!pkg.version) continue;

      const name = this.extractName(path);

      if (name === query.name && pkg.version === query.version) {

        occurrences.push({
          path,
          version: pkg.version,
          isDirectDependency: !!rootDependencies[name],
          peerDependencies: pkg.peerDependencies
        });
      }
    }

    return {
      found: occurrences.length > 0,
      occurrences
    };
  }

  private extractName(path: string): string {
    if (!path.startsWith('node_modules/')) return '';
    return path.replace('node_modules/', '');
  }
}
