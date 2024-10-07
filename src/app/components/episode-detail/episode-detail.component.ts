import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from '../../services/episode.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EpisodeDetailComponent implements OnInit {
  episodeId!: number;
  episodeDetail: any;
  comments: any;
  showAllActors: boolean = false;
  commentForm!: FormGroup;
  commentText: string = '';
  serieTitle: any;
  watched: boolean = false; 
  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.episodeId = +params['episodeId'];
      this.getEpisodeDetail();
      this.getCommentsOfEpisode();
    });

    this.commentForm = this.fb.group({
      commentText: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  getEpisodeDetail(): void {
    this.episodeService.getEpisodeDetail(this.episodeId).subscribe(
      data => {
        this.episodeDetail = data.episode;
        this.serieTitle = data.episode.show.title;
        this.watched = data.episode.watched;
      },
      error => {
        console.error('Erreur lors de la récupération des détails de l\'épisode:', error);
      }
    );
  }

  getCommentsOfEpisode(): void {
    this.episodeService.getComments(this.episodeId).subscribe(
      data => {
        this.comments = data.comments;
      },
      error => {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    );
  }

  toggleShowAllActors(): void {
    this.showAllActors = !this.showAllActors;
  }
  onSubmitComment(): void {
    const commentText = this.commentForm.value.commentText; // Récupérer le texte du formulaire
    const reference = `episode.${this.serieTitle.toLowerCase().replace(/\s+/g, '-')}.s${this.episodeDetail.season.toString().padStart(2, '0')}e${this.episodeDetail.episode.toString().padStart(2, '0')}`;

    this.episodeService.postComment(this.episodeId, commentText, reference).subscribe(
      response => {
        console.log('Commentaire publié avec succès:', response);
        this.getCommentsOfEpisode(); // Réactualiser les commentaires après publication
        this.commentForm.reset(); // Réinitialiser le formulaire après soumission
      },
      error => {
        console.error('Erreur lors de la publication du commentaire:', error);
      }
    );
  }
  toggleWatchedStatus(episodeId: number): void {
    if (this.watched) {
      this.episodeService.unmarkWatched(episodeId).subscribe(
        response => {
          console.log('Épisode marqué comme non regardé:', response);
          this.watched = false; // Met à jour l'état après avoir dé-marquée l'épisode
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'épisode:', error);
        }
      );
    } else {
      this.episodeService.asWatched(episodeId).subscribe(
        response => {
          console.log('Épisode marqué comme regardé:', response);
          this.watched = true; // Met à jour l'état après avoir marqué l'épisode
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'épisode:', error);
        }
      );
    }
  }
}
