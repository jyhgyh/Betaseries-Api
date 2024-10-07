import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddShowService } from '../../services/add-show.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [
    CommonModule,
    RouterLink
  ],
  standalone: true,
})
export class ProfileComponent implements OnInit {
  profile: any;
  shows: any[] = [];

  constructor(private profileService: ProfileService, private router: Router, private deleteShow: AddShowService, private token: AuthService) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getUserProfile().subscribe(
      data => {
        this.profile = data;
       
        this.loadUserShows(this.profile.member.id);
      },
      error => {
        console.error('Erreur lors du chargement du profil', error);
      }
    );
  }

  loadUserShows(userId: number) {
    this.profileService.getUserShows(userId).subscribe(
      data => {
        this.shows = data.shows; 
      },
      error => {
        console.error('Erreur lors du chargement des séries', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('access_token'); // Supprime le token
    this.router.navigate(['/login']); // Redirige vers la page de login
  }
  delete_Show(showId: string) {
    const token = this.token.getToken();  // Récupérer dynamiquement le token

    if (token) {
      this.deleteShow.deleteShowFromAccount(showId, token)
        .subscribe(response => {
          console.log('Série supprimé avec succès :', response);
          window.location.reload();
        }, error => {
          console.error('Erreur lors de la suppression de la série :', error);
        });
    } else {
      console.error('Token manquant. L\'utilisateur doit être authentifié.');
    }
  }
}
