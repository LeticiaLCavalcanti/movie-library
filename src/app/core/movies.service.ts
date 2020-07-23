import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../shared/models/movies';
import { ConfigParams } from '../shared/models/config-params';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/movies/';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  save(movies: Movies): Observable<Movies> {
    return this.http.post<Movies>(url, movies);
  }

  edit(movies: Movies): Observable<Movies> {
    return this.http.put<Movies>(url + movies.id, movies);
  }

  list(config: ConfigParams): Observable<Movies[]> {
    const configPrams = this.configService.ParamsConfig(config);
    return this.http.get<Movies[]>(url, {params: configPrams});
  }

  toView(id: number): Observable<Movies> {
    return this.http.get<Movies>(url + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
