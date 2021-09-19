import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  public selectedWorker = new BehaviorSubject({});   
  constructor(private apollo: Apollo,) { }

  public getAllWorkers()
  {
    return this.apollo
    .watchQuery(GET_ALL_WORKER_QUERY);
  }

  public getWorkerDetails(characterId:number)
  {    
    return this.apollo
    .watchQuery({
      query: gql`
    {
      charactersByIds(ids:${characterId}) {                    
       
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

  public searchWorkers(pageNo:any, filterCriteria:any)
  {    
    return this.apollo
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