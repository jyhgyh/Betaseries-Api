import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SeriesListComponent } from './components/series-list/series-list.component';
import { ProfileComponent } from "./components/profile/profile.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth.guard";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { EpisodeDetailComponent } from "./components/episode-detail/episode-detail.component";

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'list', component: SeriesListComponent },
    { path: 'movie/:id', component: MovieDetailComponent },
    { path: 'movie/:id/:episodeId', component: EpisodeDetailComponent },

    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
