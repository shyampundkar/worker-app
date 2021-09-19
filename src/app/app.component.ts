import { Component, HostListener } from '@angular/core';
import { WorkerService } from './services/worker-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'worker-app';
  public hideWorkerDetails = true;

  constructor(public workerService: WorkerService) {
    this.workerService.selectedWorker.subscribe((worker) => {
      this.hideWorkerDetails = Object.keys(worker).length === 0;
    })
  }

  @HostListener("window:onbeforeunload", ["$event"])
  clearLocalStorage(event: any) {
    localStorage.clear();
  }
}
