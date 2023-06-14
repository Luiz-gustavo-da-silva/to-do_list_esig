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
  actionBtn: string = 'Adicionar tarefa';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogref: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      responsible: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      deadline: ['', Validators.required],
      situation: true,
    });

    if (this.editData) {
      this.actionBtn = 'Atualizar';
      this.taskForm.controls['id'].setValue(this.editData.id);
      this.taskForm.controls['title'].setValue(this.editData.title);
      this.taskForm.controls['responsible'].setValue(this.editData.responsible);
      this.taskForm.controls['description'].setValue(this.editData.description);
      this.taskForm.controls['priority'].setValue(this.editData.priority);
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
