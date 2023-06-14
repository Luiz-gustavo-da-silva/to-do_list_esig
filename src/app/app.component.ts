import { Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { DialogDetailsComponent } from './dialog-details/dialog-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'to-do_list_esig';

  taskFilterForm!: FormGroup;

  displayedColumns: string[] = [
    'id',
    'title',
    'responsible',
    // 'description',
    'priority',
    'deadline',
    'action',
    'detalhes'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.taskFilterForm = this.formBuilder.group({
      number: '',
      situation: '',
      titleOrDescription: '',
      responsible: '',
    });

    this.getAllTask();
  }

  showDetails(row: any){
    this.dialog.open(DialogDetailsComponent,{
      width:'60%',
      maxWidth:'80vw',
      data: row,
    })
  }
  
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width:'40%',
        maxWidth:'80vw'
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllTask();
        }
      });
  }

  cleanFilter() {
    this.taskFilterForm.reset();
    this.getAllTask();
  }

  researchFiltertask() {
    if (this.taskFilterForm.value) {
      this.api.filterTask(this.taskFilterForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
        },
        error: (err) => {
          alert('Error no filtro');
          this.getAllTask();
        },
      });
    }
  }

  getAllTask() {
    this.api.getTask().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        alert('Error while fetchig the Records');
      },
    });
  }

  deleteTask(id: number) {
    this.api.deleteTask(id).subscribe({
      next: (res) => {
        alert('delete task sucessfully!');
        this.getAllTask();
      },
      error: () => {
        alert('error delet task!');
      },
    });
  }

  editTask(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '40%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllTask();
        }
      });
  }

  completeTask(row: any) {
    this.api.concludeTask(row, row.id).subscribe({
      next: (res) => {
        alert('Conclusão task sucessfully!');
        this.getAllTask();
      },
      error: () => {
        alert('error delet task!');
      },
    });
  }
}
