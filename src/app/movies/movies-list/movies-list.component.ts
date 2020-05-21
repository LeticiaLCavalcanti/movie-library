import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { MoviesService } from 'src/app/core/movies.service';
import { Movies } from 'src/app/shared/models/movies';
import { ConfigParams } from 'src/app/shared/models/config-params';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  readonly withoutPhoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  config: ConfigParams = {
    page: 0,
    limit: 4
  };
  movies: Movies[] = [];
  queryList: FormGroup;
  genders: Array<string>;

  constructor(private moviesService: MoviesService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.queryList = this.fb.group({
      text: [''],
      gender: ['']
    });

    this.queryList.get('text').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.search = val;
      this.resetQuery();
    });

    this.queryList.get('gender').valueChanges.subscribe((val: string) => {
      this.config.input = {type: 'gender', value: val};
      this.resetQuery();
    });

    this.genders = ['Action', 'Romance', 'Adventure', 'Horror', 'Sci-Fi', 'Comedy', 'Adventure', 'Drama'];

    this.listMovies();
  }

  onScroll(): void {
    this.listMovies();
  }

  open(id: number): void {
    this.router.navigateByUrl('/movies/' + id);
  }

  private listMovies(): void {
    this.config.page++;
    this.moviesService.list(this.config)
      .subscribe((movies: Movies[]) => this.movies.push(...movies));
  }

  private resetQuery(): void {
    this.config.page = 0;
    this.movies = [];
    this.listMovies();
  }
}
