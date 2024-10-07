import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-series-item',
  standalone: true,
  templateUrl: './series-item.component.html',
  styleUrls: ['./series-item.component.css']
})
export class SeriesItemComponent {
  @Input() series!: { title: string; summary: string };  // Используем "!" чтобы указать, что значение будет присвоено позже
}
