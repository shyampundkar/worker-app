import { Component, OnInit, QueryList, ViewChildren, } from '@angular/core';
import { WorkerService } from '../services/worker-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit {
  public characters: any[] = [];
  public pageInfo: any;
  public searchForm = new FormGroup({ searchFormControl: new FormControl(null, { validators: [Validators.pattern('^[a-zA-Z]+$')] }) });
  private characterName: String = '';
  public showList = false;
  private destroy$ = new Subject();

  constructor(private workerService: WorkerService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
    });
  }

  ngOnInit() {

    this.searchForm.controls.searchFormControl.valueChanges.pipe(
      debounceTime(300))
      .subscribe(characterName => {
        if (this.searchForm.invalid) {
          return;
        }
        this.characterName = characterName;
        this.searchWorkers(characterName, 1);
      });
    this.workerService.getAllWorkers()
      .valueChanges.pipe(takeUntil(this.destroy$)).subscribe((result: any) => {
        this.characters = result.data.characters.results;
        this.pageInfo = result.data.characters.info;
        this.showList = true;
      });
  }

  public searchWorkers(characterName: any = null, pageNo: any = 1) {
    let filterCriteria = `,filter:{name:"${characterName}"}`;
    if (characterName === null || characterName === '') {
      filterCriteria = ''
    }
    this.workerService.searchWorkers(pageNo, filterCriteria)
      .valueChanges.pipe(takeUntil(this.destroy$)).subscribe((result: any) => {
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
