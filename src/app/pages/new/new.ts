import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SeriesService } from '../../services/series';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new.html',
  styleUrl: './new.css',
})
export class NewComponent {
  form: FormGroup;
  submitting = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private seriesService: SeriesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      channel: ['', [Validators.required]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.submitting = true;
    this.message = '';

    const payload = {
      title: this.form.value.title,
      channel: this.form.value.channel,
      rating: Number(this.form.value.rating),
    };

    this.seriesService.create(payload as any).subscribe({
      next: (resp: any) => {
        const id = resp?.id ?? resp?.data?.id ?? 'desconocido';
        this.message = `POST correcto. ID devuelto: ${id}`;
        setTimeout(() => this.router.navigate(['/home']), 1000);
      },
      error: () => {
        this.message = 'Error al crear la serie.';
        this.submitting = false;
      },
      complete: () => {
        this.submitting = false;
      },
    });
  }
}