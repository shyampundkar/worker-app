import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WorkersListComponent } from './workers-list/workers-list.component';

const routes: Routes = [ {
  path: '**', component: AppComponent
},
{
  path: '', component: AppComponent
},
{
  path: 'filterWorkers', component: WorkersListComponent
},
{
  path: 'filterWorkers/:workerName', component: WorkersListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
