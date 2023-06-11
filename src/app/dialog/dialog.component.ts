import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
    
    taskForm !: FormGroup;

    constructor(private formBuilder: FormBuilder, private dialogref : MatDialogRef<DialogComponent>){
    }

    ngOnInit(): void{
      this.taskForm = this.formBuilder.group({
          titulo: ['', Validators.required],
          responsavel: ['', Validators.required],
          descricao: ['', Validators.required], 
          prioridade: ['', Validators.required], 
          deadline: ['', Validators.required], 
      });
    }

    addTask(){
      console.log(this.taskForm.value);
        this.taskForm.reset();
        this.dialogref.close('save');
    }
} 
