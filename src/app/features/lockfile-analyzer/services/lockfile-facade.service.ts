import { BehaviorSubject } from "rxjs";
import { PackageSearchQuery } from "../../../core/models/package-search-query.model";
import { LockfileAnalysisService } from "./lockfile-analysis.service";
import { LockfileParserService } from "./lockfile-parser.service";
import { AnalysisResult } from "../../../core/models/analysis-result.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LockfileFacade {

  private resultSubject = new BehaviorSubject<AnalysisResult | null>(null);
  result$ = this.resultSubject.asObservable();

  constructor(
    private parser: LockfileParserService,
    private analyzer: LockfileAnalysisService
  ) {}

  analyze(raw: string, query: PackageSearchQuery) {
    try {
      const lockfile = this.parser.parse(raw);
      const result = this.analyzer.analyze(lockfile, query);
      this.resultSubject.next(result);

    } catch (e: any) {
      this.resultSubject.next({
        found: false,
        occurrences: [],
        error: e.message
      });
    }
  }
}
