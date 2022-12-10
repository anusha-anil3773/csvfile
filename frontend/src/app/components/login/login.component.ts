import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router,private auth:AuthService) { }

  ngOnInit(): void {
  }
  userform={
    
    'email' : '',
    'password' : ''

    
  }
  
userverify(){
  this.auth.login(this.userform).subscribe(res=>{
    if(res.message){
      alert(res.message)
    }
    else if (res.email == "admin123@gmail.com" && res.password =="Admin123"){
      alert("Admin has successfully logged in")
      this.route.navigate(['/admin'])

    }
    else{
      alert("Faculty has successfully logged in")

      this.route.navigate(['/staff'])

    }
  })
  
}

}
