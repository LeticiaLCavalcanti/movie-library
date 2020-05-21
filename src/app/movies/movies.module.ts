import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { RegisterMoviesComponent } from './register-movies/register-movies.component';
import { MaterialModule } from '../shared/material/material.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { InputModule } from '../shared/components/inputs/input.module';
import { ViewMoviesComponent } from './view-movies/view-movies.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    InputModule,
    InfiniteScrollModule
  ],
  declarations: [RegisterMoviesComponent, MoviesListComponent, ViewMoviesComponent]
})
export class MoviesModule { }
