import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MoviesService } from 'src/app/core/movies.service';
import { Movies } from 'src/app/shared/models/movies';
import { Alert } from 'src/app/shared/models/alert';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent implements OnInit {
  readonly withoutPhoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  movie: Movies;
  id: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private moviesService: MoviesService,
              private _location: Location) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.toView();
  }

  redirect (): void {
    this._location.back();
  }

  edit(): void {
    this.router.navigateByUrl('/movies/register/' + this.id);
  }

  delete(): void {
    const config = {
      data: {
        title: 'Are you sure you want to delete?',
        description: 'If you are sure you want to delete, click the OK button',
        colorBtnCancel: 'primary',
        colorBtnSuccess: 'warn',
        haveBtnClose: true
      } as Alert
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.moviesService.delete(this.id)
        .subscribe(() => this.router.navigateByUrl('/movies'));
      }
    });
  }

  private toView(): void {
    this.moviesService.toView(this.id).subscribe((movie: Movies) => this.movie = movie);
  }

}
