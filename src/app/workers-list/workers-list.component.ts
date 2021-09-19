import { Component, OnInit, } from '@angular/core';
import { WorkerService } from '../services/worker-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit {
  public characters: any[] = [];
  public pageInfo: any;
  public searchForm = new FormGroup({ searchFormControl: new FormControl()});  
  private characterName: String = '';
 

  constructor(private workerService: WorkerService) { }
  
  ngOnInit() {
    this.searchForm.controls.searchFormControl.valueChanges.pipe(
      debounceTime(500))
      .subscribe(characterName => {
        this.characterName = characterName;
        this.searchWorkers(characterName, 1);
      });
  this.workerService.getAllWorkers()
      .valueChanges.subscribe((result: any) => {
        this.characters = result.data.characters.results;
        this.pageInfo = result.data.characters.info;    
      });
    }

  public searchWorkers(characterName: any = null, pageNo: any = 1) {
    let filterCriteria = `,filter:{name:"${characterName}"}`;
    if (characterName === null || characterName === '') {
      filterCriteria = ''
    }
    this.workerService.searchWorkers(pageNo,filterCriteria)
   .valueChanges.subscribe((result: any) => {
        this.characters = result.data.characters.results;
        this.pageInfo = result.data.characters.info;
      });

  }

  public onWorkerSelected(character: any) {
    this.workerService.selectedWorker.next(character);    
  }

  public nextPage() {
    this.searchWorkers(this.characterName, this.pageInfo.next);
  }

  public prevPage() {
    this.searchWorkers(this.characterName, this.pageInfo.prev);
  }

}
