import { Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { DialogDetailsComponent } from '../../components/dialog-details/dialog-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Task } from 'src/app/models/TaskModel';


@Component({
  selector: 'app-todopage',
  templateUrl: './todopage.component.html',
  styleUrls: ['./todopage.component.scss']
})
export class TodopageComponent implements OnInit {
  panelOpenState = false;

  title = 'to-do_list_esig';

  taskFilterForm!: FormGroup;

  displayedColumns: string[] = [
    'id',
    'title',
    'responsible',
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

  /**
   * Inicializa o componente.
   */
  ngOnInit(): void {
    this.taskFilterForm = this.formBuilder.group({
      number: '',
      situation: '',
      titleOrDescription: '',
      responsible: '',
    });

    this.getAllTask();
  }

  /**
   * Abre o modal de detalhes para exibir informações detalhadas sobre uma tarefa.
   * @param row A linha da tabela contendo os dados da tarefa.
   */
  showDetails(row: Task) {
    this.dialog.open(DialogDetailsComponent, {
      width: '60%',
      maxWidth: '80vw',
      data: row,
    });
  }

  /**
   * Abre o modal para adicionar uma nova tarefa.
   */
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '40%',
        maxWidth: '80vw'
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllTask();
        }
      });
  }

  /**
   * Limpa os filtros de pesquisa de tarefas e realiza a exibição de todas as tarefas em andamento.
   */
  cleanFilter() {
    this.taskFilterForm.reset();
    this.getAllTask();
  }

  /**
   * Realiza a pesquisa de tarefas com base nos filtros aplicados.
   */
  researchFiltertask() {
    if (this.taskFilterForm.value) {
      this.api.filterTask(this.taskFilterForm.value).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
        },
        error: (err) => {
          alert('Error no filtro');
          this.getAllTask();
        },
      });
    }
  }

  /**
   * Obtém todas as tarefas que estão em aberto.
   */
  getAllTask() {
    this.api.getTask().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        alert('Error while fetching the Records');
      },
    });
  }

  /**
   * Exclui uma tarefa pelo seu ID.
   * @param id O ID da tarefa a ser excluída.
   */
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

  /**
   * Abre o modal para editar uma tarefa.
   * @param row A linha da tabela contendo os dados da tarefa a ser editada.
   */
  editTask(row: Task) {
    console.log(row);
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

  /**
   * Conclui uma tarefa, marcando sua situação como concluída (false).
   * @param row As informações referentes a linha da tabela contendo os dados da tarefa a ser concluída.
   */
  completeTask(row: Task) {
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
