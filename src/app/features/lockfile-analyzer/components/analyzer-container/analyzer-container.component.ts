import { Component, inject } from '@angular/core';
import { LockfileFacade } from '../../services/lockfile-facade.service';
import { AnalyzerFormComponent } from '../analyzer-form/analyzer-form.component';
import { AnalyzerResult } from '../analyzer-result/analyzer-result.component';

@Component({
  selector: 'app-analyzer-container',
  standalone: true,
  templateUrl: 'analyzer-container.component.html',
  imports: [AnalyzerFormComponent, AnalyzerResult],
})
export class AnalyzerContainerComponent {
  public readonly lockfileFacade = inject(LockfileFacade);

  onSubmit(data: { raw: string; name: string; version: string }) {
    this.lockfileFacade.analyze(data.raw, {
      name: data.name,
      version: data.version,
    });
  }
}
