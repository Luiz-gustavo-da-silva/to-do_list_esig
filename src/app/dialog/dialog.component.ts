import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  taskForm!: FormGroup;
  actionBtn: string = 'save';

  constructor(
    private formBuilder: FormBuilder,
    private dialogref: MatDialogRef<DialogComponent>,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      responsavel: ['', Validators.required],
      descricao: ['', Validators.required],
      prioridade: ['', Validators.required],
      deadline: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.taskForm.controls['titulo'].setValue(this.editData.titulo);
      this.taskForm.controls['responsavel'].setValue(this.editData.responsavel);
      this.taskForm.controls['descricao'].setValue(this.editData.descricao);
      this.taskForm.controls['prioridade'].setValue(this.editData.prioridade);
      this.taskForm.controls['deadline'].setValue(this.editData.deadline);
    }
  }

  addTask() {
    if (!this.editData) {
      if (this.taskForm.valid) {
        this.api.postTask(this.taskForm.value).subscribe({
          next: (res) => {
            alert('Product added successfully');
            this.taskForm.reset();
            this.dialogref.close('save');
          },
          error: () => {
            alert('Error while adding the product');
          },
        });
      }
    } else {
      this.updateTask();
    }
  }

  updateTask() {
    this.api.putTask(this.taskForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Updated Product sucessfully!');
        this.taskForm.reset();
        this.dialogref.close('update');
      },
      error: () => {
        alert('Error updating product!');
      },
    });
  }
}
