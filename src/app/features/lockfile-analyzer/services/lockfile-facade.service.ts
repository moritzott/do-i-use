import { Injectable, signal } from '@angular/core';
import { LockfileParserService } from './lockfile-parser.service';
import { LockfileIndexService } from './lockfile-index.service';
import { LockfileAnalysisService } from './lockfile-analysis.service';
import { AnalysisResult } from '../../../core/models/analysis-result.model';
import { PackageLock } from '../../../core/models/package-lock.model';

@Injectable({ providedIn: 'root' })
export class LockfileFacade {
  private _lockfile = signal<PackageLock | null>(null);
  private _index = signal<Map<string, any> | null>(null);
  private _result = signal<AnalysisResult | null>(null);

  readonly result = this._result.asReadonly();

  constructor(
    private parser: LockfileParserService,
    private indexService: LockfileIndexService,
    private analyzer: LockfileAnalysisService,
  ) {}

  load(raw: string) {
    const lockfile = this.parser.parse(raw);
    const index = this.indexService.buildIndex(lockfile);

    this._lockfile.set(lockfile);
    this._index.set(index);
  }

  analyze(name: string, versionRange: string) {
    const index = this._index();

    if (!index) {
      this._result.set({
        found: false,
        occurrences: [],
        error: 'Lockfile not loaded',
      });
      return;
    }

    const result = this.analyzer.analyze(index, name, versionRange);
    this._result.set(result);
  }

  reset() {
    this._lockfile.set(null);
    this._index.set(null);
    this._result.set(null);
  }
}
