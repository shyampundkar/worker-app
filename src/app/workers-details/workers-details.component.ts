import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../services/worker-service.service';

@Component({
  selector: 'workers-details',
  templateUrl: './workers-details.component.html',
  styleUrls: ['./workers-details.component.scss']
})
export class WorkersDetailsComponent implements OnInit {

  constructor( private workerService: WorkerService) { }

  ngOnInit(): void {
    this.workerService.mySubject.subscribe()
  }

}
