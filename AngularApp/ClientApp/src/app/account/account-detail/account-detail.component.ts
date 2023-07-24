import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ErrorResponse } from '../../responses/error-response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  accountCategories: any[] = [];
  form: FormGroup;
  changeName: string = "";
  signupRequest: any = {
    Username: "",
    Password: "",
    Address: "",
    Avatar: "",
    Thumb: "",
    CreateTime: new Date(),
    Email: "",
    FullName: "",
    Mobile: "",
    Status: true,
    AccountCategoryID: ""
  };
  username = '';

  constructor(private accountService: AccountService, private router: Router,
    public formBuilder: FormBuilder, private http: HttpClient, private activeRoute: ActivatedRoute) {
    this.form = this.formBuilder.group({
      accountCategoryID: [''],
      username: [''],
      password: [''],
      repassword: [''],
      fullname: [''],
      avatar: [''],
      email: [''],
      mobile: [''],
      address: [''],
      status: [true]
    });
  }

  ngOnInit(): void {
    const accountsObservable = this.accountService.getAccountCategories();
    accountsObservable.subscribe((accountsData: any[]) => {
      this.accountCategories = accountsData;

      this.activeRoute.queryParams.subscribe(params => {
        this.username = params.username;
        
        if (this.username && this.username !== "") {
          const accountsObservable = this.accountService.getAccount(this.username);
          accountsObservable.subscribe((accountsData: any) => {
            this.signupRequest = accountsData;
          });
        }
      });
    });
  }

  backToList(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/account']);
  }

  saveAccount(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/account']);
  }

  uploadFile(e: Event) {
    //Xử lý upload file
  }

  submitForm() {
    var accountCategoryID = this.form.get('accountCategoryID')?.value;
    var username = this.form.get('username')?.value;
    var password = this.form.get('password')?.value;
    var fullname = this.form.get('fullname')?.value;
    var avatar = this.form.get('avatar')?.value;
    var email = this.form.get('email')?.value;
    var mobile = this.form.get('mobile')?.value;
    var address = this.form.get('address')?.value;
    var status = this.form.get('status')?.value;

    this.signupRequest.Username = username;
    this.signupRequest.Password = password;
    this.signupRequest.FullName = fullname;
    this.signupRequest.Avatar = "/assets/img/user/user1.jpg";
    this.signupRequest.Email = email;
    this.signupRequest.Mobile = mobile;
    this.signupRequest.Address = address;
    this.signupRequest.Status = status;
    this.signupRequest.AccountCategoryID = accountCategoryID;

    if (this.username && this.username !== "") {
      //Update
      this.accountService.updateAccount(this.username, this.signupRequest).subscribe({
        next: (data => {
          this.router.navigate(['/account']);
        }),
        error: ((error: ErrorResponse) => {
          alert(error.Error);
        })
      });
    }
    else {
      //Add new
      this.accountService.addAccount(this.signupRequest).subscribe({
        next: (data => {
          this.router.navigate(['/account']);
        }),
        error: ((error: ErrorResponse) => {
          alert(error.Error);
        })
      });
    }
  }
}
