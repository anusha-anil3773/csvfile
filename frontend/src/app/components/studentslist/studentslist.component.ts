import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';

import { CsvfileComponent } from 'src/app/csvfile/csvfile.component';


@Component({
  selector: 'app-studentslist',
  templateUrl: './studentslist.component.html',
  styleUrls: ['./studentslist.component.css']
})
export class StudentslistComponent implements OnInit {

  students : any = []
  id:any
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  isTH:boolean = false;
  constructor(private router: Router, 
    private apiService : ApiService, 
    private dialog: MatDialog,
) { }

  ngOnInit(): void {
    this.getstudentData();

  }

  
  getstudentData() {
    this.apiService.getstudentsList().subscribe(res => {
      this.students = res
    })
  }

  updatestudent(_id: any) {
    console.log(_id)
    this.apiService.formupdate = _id;
    this.router.navigate(['/edit-students']);
  }

  deletestudent(id:any){
    this.apiService.deletestudent(id).subscribe(res=>{
      this.getstudentData()
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getstudentData();
  } 
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getstudentData();
  }
 
  // show popup while clicking on Add learner
  showAddLearner(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";

    dialogConfig.data = {
      titlemode: 'Add Learner Details',
      id:''
    };
  
    const dialogRef = this.dialog.open(CsvfileComponent, dialogConfig);
    
    // call below event once the dialog popup closed
    dialogRef.afterClosed().subscribe(
      data => {
        // if save clicked
        if(data){
          this.apiService.addstudent(data).subscribe(res =>{
            alert('Learner added successfully');
            this.getstudentData();
          })
        }
        else { // if close button clicked
          console.log("close without validation on add learner");
        }        
      },
      error => {
        console.log(error);
      }
    ); 
  }

 
  showUploadCSV() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(CsvfileComponent, dialogConfig);
  
    // call below event once the dialog popup closed
    dialogRef.afterClosed().subscribe(
      data => {
        // if save clicked
        if(data){
          this.apiService.uploadCSV(data).subscribe(res => {
         alert(' student uploaded successfully');
            //console.log(res);
            this.getstudentData();
          });          
        }
        else { // if close button clicked
          console.log("close without validation on add student");
        }        
      }
      
    ); 

  }

}
