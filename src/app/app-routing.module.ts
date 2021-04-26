import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./views/server/server.module').then(m => m.ServerModule)},
  {path: 'client', loadChildren: () => import('./views/client/client.module').then(m => m.ClientModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
