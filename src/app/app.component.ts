import { Component } from '@angular/core';
import { WorkerService } from './services/worker-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'worker-app';
  public hideWorkerDetails = true;
 
  constructor(public workerService: WorkerService){
   this.workerService.mySubject.subscribe((worker)=>{
    this.hideWorkerDetails= Object.keys(this.workerService.mySubject.value).length  ===0;     
   })
  }  
}
