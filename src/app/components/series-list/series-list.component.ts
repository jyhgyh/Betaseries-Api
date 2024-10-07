import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/list.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddShowService } from '../../services/add-show.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
})
export class SeriesListComponent implements OnInit {
  series: any[] = [];
  paginatedSeries: any[] = [];
  errorMessage: string = '';

  currentPage: number = 1;
  limit: number = 12;
  totalPages: number = 1;

  constructor(private seriesService: SeriesService, private addshow: AddShowService, private login: AuthService) { }

  ngOnInit() {
    this.loadSeries();
  }

  loadSeries() {
    this.seriesService.getSeries(1, this.limit).subscribe({
      next: (response) => {
        this.series = response.shows;
        this.totalPages = Math.ceil(this.series.length / this.limit);
        this.updatePaginatedSeries();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load series';
        console.error('Error fetching series:', error);
      }
    });
  }

  updatePaginatedSeries() {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.paginatedSeries = this.series.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedSeries();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedSeries();
    }
  }

  getGenres(genres: any): string {
    return Object.values(genres).join(', ');
  }

  addShow(showId: string) {
    const token = this.login.getToken();  // Récupérer dynamiquement le token

    if (token) {
      this.addshow.addShowToAccount(showId, token)
        .subscribe(response => {
          console.log('Série ajoutée avec succès :', response);
        }, error => {
          console.error('Erreur lors de l\'ajout de la série :', error);
        });
    } else {
      console.error('Token manquant. L\'utilisateur doit être authentifié.');
    }
  }
}
