import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent
// implements OnInit
{

  // PageTitle!: string;
  // userInfo: any;


  // constructor(
  //   private route: ActivatedRoute
  // ) { }

  // ngOnInit(): void {
  //   this.updatePageTitle();
  // }

  // updatePageTitle() {
  //   this.route.url.pipe(
  //     map(segments => segments.map(segment => segment.path).join('/'))
  //   ).subscribe(currentRoute => {
  //     if (currentRoute.includes("profile")) {
  //       this.PageTitle = "exit";
  //     } else {
  //       this.PageTitle = "profile";
  //     }
  //   });
  // }
}
