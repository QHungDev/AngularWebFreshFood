import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ErrorResponse } from '../responses/error-response';
import { TokenService } from '../services/token.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-registerclient',
  templateUrl: './registerclient.component.html',
  styleUrls: ['./registerclient.component.css']
})
export class RegisterclientComponent implements OnInit {
  form: FormGroup;
  postRegisterClientRequest: any = {
    ClientID: "",
    Email: "",
    Password: "",
    FullName: "",
    Mobile: "",
    Address: "",
    Status: true,
    CreateTime: new Date(),
    ClientCategoryID: "",
  };
  clientID = '';
  constructor( public formBuilder: FormBuilder, private http: HttpClient,
    private clientService: ClientService, private tokenService: TokenService, private router: Router) {
      this.form = this.formBuilder.group({
        clientCategoryID: [''],
        email: [''],
        password: [''],
        fullName: [''],
        mobile: [''],
        address: [''],
        status: [true],
        createTime: [''],
      });
    }
    ngOnInit(): void {

    }
    submitForm() {
      var clientCategoryID = this.form.get('clientCategoryID')?.value;
      var clientID = this.form.get('clientID')?.value;
      var email = this.form.get('email')?.value;
      var password = this.form.get('password')?.value;
      var fullName = this.form.get('fullName')?.value;
      var mobile = this.form.get('mobile')?.value;
      var address = this.form.get('address')?.value;
      var createTime = this.form.get('createTime')?.value;

      this.postRegisterClientRequest.Email = email;
      this.postRegisterClientRequest.ClientID = clientID;
      this.postRegisterClientRequest.Password = password;
      this.postRegisterClientRequest.FullName = fullName;
      this.postRegisterClientRequest.Mobile = mobile;
      this.postRegisterClientRequest.Address = address;
      this.postRegisterClientRequest.CreateTime = new Date();
      this.postRegisterClientRequest.ClientCategoryID = 1;
      if (this.postRegisterClientRequest.ClientCategoryID && this.postRegisterClientRequest.ClientCategoryID !== "" && this.postRegisterClientRequest.ClientCategoryID !== undefined) {
        this.clientService.addClient(this.postRegisterClientRequest).subscribe({
          next: (data => {
            this.router.navigate(['/login']);

          }),
          error: ((error: ErrorResponse) => {
            alert(error.Error);
          })
        });
      }
    }
  }

