import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  taskForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogref: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      id: [],
      titulo: ['', Validators.required],
      responsavel: ['', Validators.required],
      descricao: ['', Validators.required],
      prioridade: ['', Validators.required],
      deadline: ['', Validators.required],
      andamento: true,
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.taskForm.controls['id'].setValue(this.editData.id);
      this.taskForm.controls['titulo'].setValue(this.editData.titulo);
      this.taskForm.controls['responsavel'].setValue(this.editData.responsavel);
      this.taskForm.controls['descricao'].setValue(this.editData.descricao);
      this.taskForm.controls['prioridade'].setValue(this.editData.prioridade);
      this.taskForm.controls['deadline'].setValue(this.editData.deadline);
    }
  }

  addTask(){
    if(!this.editData){
      if(this.taskForm.valid){
        this.api.postTask(this.taskForm.value)
        .subscribe({
          next: (res) =>{
            alert('Task added successfully');
            this.taskForm.reset();
            this.dialogref.close('save');
          },
          error: () =>{
            alert('Error while adding the product');
          }
        })
      }
    }else{
      this.updateTask();
    }
  }

  updateTask() {
    this.api.putTask(this.taskForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Updated task sucessfully!');
        this.taskForm.reset();
        this.dialogref.close('update');
      },
      error: (res) => {
        console.log(res);
        alert('Error updating task!');
      },
    });
  }
}
