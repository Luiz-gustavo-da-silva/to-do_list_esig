import { Component, ViewChild, OnInit  } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {  MatPaginator } from '@angular/material/paginator';
import {  MatTableDataSource  } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'to-do_list_esig';

  taskFilterForm !: FormGroup;

  displayedColumns: string[] = ['titulo', 'responsavel', 'descricao', 'prioridade', 'deadline', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private dialog : MatDialog, private formBuilder: FormBuilder){}

  ngOnInit(): void{
    this.taskFilterForm = this.formBuilder.group({
      numero: ['', Validators.required],
      situacao: ['', Validators.required],
      tituloDescricao: ['', Validators.required], 
      prioridade: ['', Validators.required], 
  });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%',
    })
  }
  
  cleanFilter(){
    this.taskFilterForm.reset();
  }

  researchFiltertask(){
      console.log(this.taskFilterForm.value)
  }
}
