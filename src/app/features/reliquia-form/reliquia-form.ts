import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Reliquia } from '../../models/reliquia'; 

@Component({
  selector: 'app-reliquia-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './reliquia-form.html',
  styleUrls: ['./reliquia-form.css']
})
export class ReliquiaFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<ReliquiaFormComponent>);
  readonly data = inject<Reliquia>(MAT_DIALOG_DATA);

  form = this.fb.group({
    id: [null as number | null],
    nombre: ['', Validators.required]
  });

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.form.patchValue(this.data);
    }
  }

  guardar(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
