import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  public selectedWorker = new BehaviorSubject({}); 
  public static PAGE_NO =1;
  public static CHARACTER_NAME =''; 
  public static CHARACTER_ID:number; 
  constructor(private apollo: Apollo,) { }

  public getAllWorkers()
  {
    return this.apollo
    .watchQuery(GET_ALL_WORKER_QUERY);
  }

  public getWorkerDetails(characterId:number)
  {
    WorkerService.CHARACTER_ID = characterId;
    return this.apollo
    .watchQuery({
      query: gql`
    {
      charactersByIds(ids:${WorkerService.CHARACTER_ID}) {                    
       
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
    });
  }

  public searchWorkers(pageNo:any, characterName:any)
  {
    WorkerService.PAGE_NO = pageNo;
    WorkerService.CHARACTER_NAME = characterName;
    return this.apollo
      .watchQuery({
        query: gql` {
          characters(page:${WorkerService.PAGE_NO} ${WorkerService.CHARACTER_NAME})
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
      });
  }  
}

const GET_ALL_WORKER_QUERY = {
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
};