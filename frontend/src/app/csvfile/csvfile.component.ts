import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-csvfile',
  templateUrl: './csvfile.component.html',
  styleUrls: ['./csvfile.component.css']
})
export class CsvfileComponent implements OnInit {
  selectedFile!: File;
  isDisabled:boolean = true;
  constructor(private api:ApiService, private router : Router,
    private dialogRef : MatDialogRef<CsvfileComponent>,
   ) {
          
    }


  ngOnInit(): void {
  }
   // getting selected file and check whether csv or not
   onSelectedFile(event: any){
    this.selectedFile = <File>event.target.files[0];
    if(this.selectedFile.name.endsWith(".csv")){
      this.isDisabled = false;
    }else{
      this.isDisabled = true;
    }     
 }

// upload csv
uploadCSV(){
  const formData = new FormData();
  formData.append('csv', this.selectedFile, this.selectedFile.name);
  this.dialogRef.close(formData);    
}

//close dialogue form
close() {
  this.dialogRef.close();    
}
}
