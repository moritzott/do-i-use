import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-analyzer-form',
  templateUrl: 'analyzer-form.component.html',
  standalone: true,
  styleUrl: 'analyzer-form.component.scss',
})
export class AnalyzerFormComponent {
  @Output() submitted = new EventEmitter<{
    raw: string;
    name: string;
    version: string;
  }>();

  raw = '';
  name = '';
  version = '';

  submit() {
    this.submitted.emit({
      raw: this.raw,
      name: this.name,
      version: this.version,
    });
  }
}
