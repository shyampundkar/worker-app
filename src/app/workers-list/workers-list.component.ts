import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { WorkerService } from '../services/worker-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit {
  public characters: any[] = [];
  searchForm = new FormGroup({ searchFormControl: new FormControl() });
  pageInfo: any;
  characterName: String = '';

  formCtrlSub: any;

  constructor(private apollo: Apollo, private workerService: WorkerService) {

  }

  ngOnInit() {


    this.formCtrlSub = this.searchForm.controls.searchFormControl.valueChanges.pipe(
      debounceTime(500))
      .subscribe(characterName => {
        this.characterName = characterName;
        this.callGQEndPoint(characterName, null);
      });

    this.apollo
      .watchQuery({
        query: gql`
        {
          characters{
            info{
              count,
              pages,
              prev,
              next
            },
            results{
              id,
              name,
              status,
              species,
              type,
              gender,             
              image,
              location{
                name,
                type,
                dimension
              }             
            }
          }
        }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.characters = result.data.characters.results;
        this.pageInfo = result.data.characters.info;
        // this.workerService.mySubject.next(this.characters[0]);
      });
  }

  public callGQEndPoint(characterName: any = null, pageNo: any = 1) {
    let filterCriteria = `,filter:{name:"${characterName}"}`;
    if (characterName === null || characterName === '') {
      filterCriteria = ''
    }

    this.apollo
      .watchQuery({
        query: gql` {
          characters(page:${pageNo} ${filterCriteria})
      {          
            info{
              count,
              pages,next,
              prev
            },
      results{
      id,
        name,
        status,
        species,
        type,
        gender,
        image,
        origin {
          name,
          type,
          dimension
        },
        location {
          name,
          type,
          dimension
        },
        episode 
          {
            id,
            name,
            air_date
          }
      }
      }
      
      }          
          
        `
      }).valueChanges.subscribe((result: any) => {
        this.characters = result.data.characters.results;
        this.pageInfo = result.data.characters.info;
      });

  }

  public onWorkerSelected(character: any) {
    this.workerService.mySubject.next(character);    
  }

  public nextPage() {
    this.callGQEndPoint(this.characterName, this.pageInfo.next);
  }
  public prevPage() {
    this.callGQEndPoint(this.characterName, this.pageInfo.prev);
  }
}
