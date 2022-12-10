import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { CsvfileComponent } from 'src/app/csvfile/csvfile.component';


@Component({
  selector: 'app-addstudents',
  templateUrl: './addstudents.component.html',
  styleUrls: ['./addstudents.component.css']
})
export class AddstudentsComponent implements OnInit {

  students:any=[]
  constructor(private apiService:ApiService, private router : Router,
    private dialogRef : MatDialogRef<CsvfileComponent>) {
          
    }
    studentsdata={
      student_name:'',
      contact_number:'',
      email_id:'',
      contact_address:'',
      course:'',
      batch:'',
      program:'',
      training_head:'',
      placement_officer:'',
      employment_status:'',
      course_status:''
      }
  

  ngOnInit(): void {
   
  }

  onSubmit(){
    this.apiService.addstudent(this.studentsdata).subscribe(res=>{
      this.students=res
      alert('successfully added');
      this.router.navigate(['/studentslist'])
    })
  }  
  
  // pass the dialogue form values to parent where this popup is called
  save() {
    this.dialogRef.close(this.studentsdata);
    this.dialogRef.close(this.learnerForm.value);
  }

  //close dialogue form
  close() {
    this.dialogRef.close();    
  }
}