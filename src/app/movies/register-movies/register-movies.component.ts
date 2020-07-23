import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { InputValidateService } from 'src/app/shared/components/inputs/input-validate.service';
import { Movies } from 'src/app/shared/models/movies';
import { MoviesService } from 'src/app/core/movies.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alert } from 'src/app/shared/models/alert';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-movies',
  templateUrl: './register-movies.component.html',
  styleUrls: ['./register-movies.component.scss']
})
export class RegisterMoviesComponent implements OnInit {

  id: number;
  register: FormGroup;
  genders: Array<string>;

  constructor(public validate: InputValidateService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private movieService: MoviesService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _location: Location) { }

  get f() {
    return this.register.controls;
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.movieService.toView(this.id)
        .subscribe((movie: Movies) => this.createForm(movie));
    } else {
      this.createForm(this.createDefaultMovie());
    }

    this.genders = ['Action', 'Romance', 'Adventure', 'Horror', 'Sci-Fi', 'Comedy', 'Adventure', 'Drama'];

  }

  redirect (): void {
    this._location.back();
  }

  submit(): void {
    this.register.markAllAsTouched();
    if (this.register.invalid) {
      return;
    }

    const movie = this.register.getRawValue() as Movies;
    if (this.id) {
      movie.id = this.id;
      this.edit(movie);
    } else {
      this.save(movie);
    }
  }

  resetForm(): void {
    this.register.reset();
  }

  private createForm(movie: Movies): void {
    this.register = this.fb.group({
      title: [movie.title, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      urlPhoto: [movie.urlPhoto, [Validators.minLength(10)]],
      releaseDt: [movie.releaseDt, [Validators.required]],
      description: [movie.description, [Validators.maxLength(140)]],
      rate: [movie.rate, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [movie.urlIMDb, [Validators.minLength(10)]],
      gender: [movie.gender, [Validators.required]]
    });
  }

  private createDefaultMovie(): Movies {
    return {
      id: null,
      title: null,
      releaseDt: null,
      urlPhoto: null,
      description: null,
      rate: null,
      urlIMDb: null,
      gender: null
    } as Movies;
  }

  private save(movie: Movies): void {
    this.movieService.save(movie).subscribe(() => {
      const config = {
        data: {
          btnSuccess: 'Go to listing',
          btnCancel: 'Register a new movie',
          colorBtnCancel: 'primary',
          haveBtnClose: true
        } as Alert
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('movies');
        } else {
          this.resetForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          title: 'Error saving the record!',
          description: 'You were unable to edit your record, please try again later',
          colorBtnSuccess: 'warn',
          btnSuccess: 'Close'
        } as Alert
      };
      this.dialog.open(AlertComponent, config);
    });
  }

  private edit(movie: Movies): void {
    this.movieService.edit(movie).subscribe(() => {
      const config = {
        data: {
          description: 'Your registration has been successfully updated!',
          btnSuccess: 'Go to listing',
        } as Alert
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('movies'));
    },
    () => {
      const config = {
        data: {
          title: 'Error editing the registry!',
          description: 'You were unable to edit your record, please try again later',
          colorBtnSuccess: 'warn',
          btnSuccess: 'Close'
        } as Alert
      };
      this.dialog.open(AlertComponent, config);
    });
  }

}
