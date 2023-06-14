import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.scss']
})
export class DialogDetailsComponent implements OnInit{
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public showData: any,
    public dialogRef: MatDialogRef<DialogDetailsComponent>
  ) {}

  ngOnInit(): void {
  }

  closeModal(){
    this.dialogRef.close();
  }
}
