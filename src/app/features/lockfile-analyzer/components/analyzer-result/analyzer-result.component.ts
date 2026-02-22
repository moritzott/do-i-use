import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AnalysisResult } from '../../../../core/models/analysis-result.model';

@Component({
  selector: 'app-analyzer-result',
  templateUrl: 'analyzer-result.component.html',
  standalone: true,
  styleUrl: 'analyzer-result.component.scss',
  imports: [NgIf, NgFor, JsonPipe],
})
export class AnalyzerResult {
  @Input() result: AnalysisResult | null = null;

  trackByPath(index: number, item: any): string {
    return item.path;
  }
}
