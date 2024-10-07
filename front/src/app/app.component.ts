import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Импортируем RouterOutlet для standalone компонента
import { SeriesItemComponent } from './components/series-item/series-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SeriesItemComponent], // Добавляем RouterOutlet в imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mySeries = {
    title: 'Stranger Things',
    summary: 'A thrilling series about supernatural forces in a small town.'
  };
}
