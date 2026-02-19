import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService, Serie } from '../../services/series';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  series: Serie[] = [];
  loading = true;
  error = '';

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.seriesService.getAll().subscribe({
      next: (data: Serie[]) => {
        this.series = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error cargando series.';
        this.loading = false;
      },
    });
  }

}