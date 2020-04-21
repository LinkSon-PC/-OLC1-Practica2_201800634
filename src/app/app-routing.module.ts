import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';

import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: '**', redirectTo:'/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }