import { PackageSearchQuery } from '../../../core/models/package-search-query.model';
import { LockfileAnalysisService } from './lockfile-analysis.service';
import { LockfileParserService } from './lockfile-parser.service';
import { AnalysisResult } from '../../../core/models/analysis-result.model';
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LockfileFacade {
  private _result = signal<AnalysisResult | null>(null);
  public readonly result = this._result.asReadonly();

  constructor(
    private parser: LockfileParserService,
    private analyzer: LockfileAnalysisService,
  ) {}

  analyze(raw: string, query: PackageSearchQuery) {
    try {
      const lockfile = this.parser.parse(raw);
      const result = this.analyzer.analyze(lockfile, query);
      this._result.set(result);
    } catch (e: any) {
      this._result.set({
        found: false,
        occurrences: [],
        error: e.message,
      });
    }
  }
}
