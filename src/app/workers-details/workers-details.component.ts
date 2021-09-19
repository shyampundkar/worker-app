import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { WorkerService } from '../services/worker-service.service';

@Component({
  selector: 'workers-details',
  templateUrl: './workers-details.component.html',
  styleUrls: ['./workers-details.component.scss']
})
export class WorkersDetailsComponent implements OnInit {
  character: any;
  characterDetails:any;
  constructor(private apollo: Apollo, private workerService: WorkerService) { }

  ngOnInit(): void {
    this.workerService.mySubject.subscribe((character: any) => {
      if(character === undefined)
      {
        return;
      }
      this.character = { ...character };
      

      this.apollo
        .watchQuery({
          query: gql`
        {
          charactersByIds(ids:${this.character.id}) {                    
           
            origin{
              name,
              type,
              dimension
            },
            location{
              name,
              type,
              dimension
            },
            episode{
              id, name, air_date
            }             
          }
        }
        `,
        })
        .valueChanges.subscribe((result: any) => {
          this.characterDetails = result.data.charactersByIds[0];
        });
    })

  }
}
