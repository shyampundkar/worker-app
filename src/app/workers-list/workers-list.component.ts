import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { WorkerService } from '../services/worker-service.service';
import {} from '@angular/material';

@Component({
  selector: 'workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit {
  public characters: any[] = [];
  @Output() workerSelected = new EventEmitter<any>();

  constructor(private apollo: Apollo, private workerService: WorkerService) { }

  ngOnInit() {
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
                name
              }             
            }
          }
        }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.characters = result.data.characters.results;
      });
  }

  public onWorkerSelected(character: any) {
    this.workerService.mySubject.next(character);    
  }
}
