import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  public mySubject = new BehaviorSubject({});

  constructor() { }
}
