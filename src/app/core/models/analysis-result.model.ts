import { PackageOccurrence } from "./package-occurence.model";

export interface AnalysisResult {
  found: boolean;
  occurrences: PackageOccurrence[];
  error?: string;
}