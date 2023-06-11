import { Component, ViewChild  } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {  MatPaginator } from '@angular/material/paginator';
import {  MatTableDataSource  } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'to-do_list_esig';
  displayedColumns: string[] = ['titulo', 'responsavel', 'descricao', 'prioridade', 'deadline', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog : MatDialog){}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%',
    })
  }

  
}
