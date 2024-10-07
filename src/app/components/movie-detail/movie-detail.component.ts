import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoAboutSeriesService } from '../../services/info-about-series.service';
import { NgIf, NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- Import du RouterModule

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterModule
  ],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  series: any;
  seasons: any;
  showId!: number;
  episodes: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private seriesService: InfoAboutSeriesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const seriesId = parseInt(id, 10);
      this.loadSeriesInfo(seriesId);
      this.loadSeasons(seriesId);
    }
  }

  loadSeriesInfo(id: number): void {
    this.seriesService.getSeriesInfo(id).subscribe({
      next: (data) => {
        this.series = data.show;
        this.showId = this.series.id;
      },
      error: (error) => {
        console.error('Error fetching series info:', error);
      }
    });
  }

  loadSeasons(id: number): void {
    this.seriesService.getSeriesSeasons(id).subscribe({
      next: (data) => {
        this.seasons = data.seasons; // Assuming 'seasons' is the structure returned
      },
      error: (error) => {
        console.error('Error fetching seasons:', error);
      }
    });
  }

  loadEpisodes(showId: number, seasonNumber: number): void {
    this.seriesService.getEpisodes(showId, seasonNumber).subscribe((data) => {
      this.episodes = data.episodes; // Adaptez selon la structure de la réponse
    }, (error) => {
      console.error('Erreur lors de la récupération des épisodes', error);
    });
  }

  getGenres(genres: any): string {
    return Object.values(genres).join(', ');
  }
}
