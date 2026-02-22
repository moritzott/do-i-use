import { Injectable } from "@angular/core";
import { PackageLock } from "../../../core/models/package-lock.model";

@Injectable({ providedIn: 'root' })
export class LockfileParserService {

  parse(raw: string): PackageLock {
    const parsed = JSON.parse(raw);

    if (!parsed.packages) {
      throw new Error('Unsupported lockfile format (npm v7+ required)');
    }

    return parsed as PackageLock;
  }
}
