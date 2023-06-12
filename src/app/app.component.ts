import { Component, ViewChild, OnInit  } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {  MatPaginator } from '@angular/material/paginator';
import {  MatTableDataSource  } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';

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



  constructor(private dialog : MatDialog, private formBuilder: FormBuilder, private api: ApiService){}

  ngOnInit(): void{
    this.taskFilterForm = this.formBuilder.group({
      numero: ['', Validators.required],
      situacao: ['', Validators.required],
      tituloDescricao: ['', Validators.required], 
      prioridade: ['', Validators.required], 
  });

    this.getAllTask();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%',
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllTask();
      }
    });
  }
  
  cleanFilter(){
    this.taskFilterForm.reset();
  }

  researchFiltertask(){
    console.log(this.taskFilterForm.value)
  }

  getAllTask() {
    this.api.getTask().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert('Error while fetchig the Records');
      },
    });
  }

  deleteTask(id : number){
    this.api.deleteTask(id)
    .subscribe({
      next: (res) =>{
        alert('delete Product sucessfully!');
        this.getAllTask();
      },
      error:()=>{
        alert('error delet product!');
      }
    })
  }

  editTask(row:any){
    this.dialog.open(DialogComponent,{
      width: '40%',
      data:row,
    }).afterClosed().subscribe(val => {
        if(val === "update"){
          this.getAllTask();
        }
    })
  }

}
