import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../services/worker-service.service';

@Component({
  selector: 'workers-details',
  templateUrl: './workers-details.component.html',
  styleUrls: ['./workers-details.component.scss']
})
export class WorkersDetailsComponent implements OnInit {
  character: any;
  characterDetails: any;
  constructor(private workerService: WorkerService) { }

  ngOnInit(): void {
    this.workerService.selectedWorker.subscribe((character: any) => {
      if (character === undefined) {
        return;
      }
      this.character = { ...character };

      this.workerService.getWorkerDetails(this.character.id)
        .valueChanges.subscribe((result: any) => {
          if (result.data.charactersByIds && result.data.charactersByIds[0]) {
            this.characterDetails = result.data.charactersByIds[0];
          }
        });
    })
  }
}
