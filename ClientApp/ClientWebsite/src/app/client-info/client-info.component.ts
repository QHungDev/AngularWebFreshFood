import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ErrorResponse } from 'src/app/responses/error-response';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
  modalRef?: BsModalRef;
  @ViewChild('template') template? : TemplateRef<any>;

  value_AuthenticCode1 = "";
  value_AuthenticCode2 = "";
  value_AuthenticCode3 = "";
  value_AuthenticCode4 = "";

  readonly_AuthenticCode1 = false;
  readonly_AuthenticCode2 = true;
  readonly_AuthenticCode3 = true;
  readonly_AuthenticCode4 = true;

  time = 120;
  countTime = "02:00"
  showTime = true
  showAuthenticating = false
  disabledResendAuthenticCode = true;
  interval: any;
  authenticCode = "";
  randomAuthenticCode = "";

  disabledButtonUpdate = false;


  clientCategories: any[] = [];
  form: FormGroup;
  clientID= "";
  logined = false;
  getclientRequest: any = {
    ClientID: "",
    Email: "",
    FullName:"",
    Password: "",
    Mobile: "",
    Address: "",
    ClientCategoryID: ""
  };
  postclientRequest: any = {
    ClientID: "",
    Email: "",
    FullName:"",
    Password: "",
    RePassword: "",
    Mobile: "",
    Address: "",
    ClientCategoryID: ""
  };
  emailAuthenticCode: any = {
    to: "",
    subject: "",
    body:"",
    code: "",
  };
  constructor(private clientService: ClientService, private router: Router,private modalService: BsModalService,
    public formBuilder: FormBuilder, private http: HttpClient, private activeRoute: ActivatedRoute, private toastr: ToastrService){
    this.form = this.formBuilder.group({
      clientCategoryID: [''],
      email: [''],
      password: [''],
      repassword: [''],
      fullName: [''],
      mobile: [''],
      address: ['']
    });
  }
  ngOnInit(): void {
    this.postclientRequest.Email = localStorage.getItem('Username') || '';
    if (localStorage.getItem('Username')) {
      this.logined = true;

      this.clientService.getWithEmail(this.postclientRequest.Email).subscribe({
        next: (data => {
          this.getclientRequest = data;
        }),
        error: ((error: ErrorResponse) => {
          alert(error.Error);
        })
      });
    }

    // const clientObservable = this.clientService.clientcateget();
    // clientObservable.subscribe((clientsData: any[]) => {
    //   this.postclientRequest = clientsData;

    //   this.activeRoute.queryParams.subscribe(params => {
    //     this.clientID = params.clientID;

    //     if (this.clientID && this.clientID !== "") {
    //       const clientObservable = this.clientService.clientgets(this.clientID);
    //       clientObservable.subscribe((clientsData: any) => {
    //         this.postclientRequest = clientsData;
    //       });
    //     }
    //   });
    // });
  }

  randomText(){
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
      { length: 4 },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
  }


  countDown() {

    // console.log((3662 % 3600 % 60))
    // console.log(((new Date('2023-09-18T16:00')).getTime() - (new Date('2023-09-18T06:06:40')).getTime())/1000);
    // console.log(((new Date(new Date().setHours(16,0,0,0))).getTime() - (new Date()).getTime())/1000);

    // let time = ((new Date(new Date().setHours(5,28,0,0))).getTime() - (new Date()).getTime())/1000;
    // let time = 120
    this.interval = setInterval(() => {
      this.time--;
      let hours = Math.floor(this.time / 3600);
      let minutes = Math.floor(this.time % 3600 / 60);
      let seconds = Math.floor(this.time % 3600 % 60);
      // console.log(hours + " " + minutes + " " + seconds);
      // this.countTime = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0')
      this.countTime = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0')
      if (this.time <= 0) {
        clearInterval(this.interval);
        this.showTime = false;
        this.showAuthenticating = false;
        this.disabledResendAuthenticCode = true;
        this.randomAuthenticCode = "";
        // window.location.reload();
      }
    }, 1000);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
      animated: true,
      ignoreBackdropClick: true
    });

    // this.showTime = false;
    // this.countTime = "Đã xác thực thành công!"

    this.countDown();
    this.showAlert();
  }

  changeAuthenticCode(event: any, index: number) {
    switch (index) {
        case 1:
          if (event.trim() == "") {
            return;
          } else {
            this.readonly_AuthenticCode1 = true;
            this.readonly_AuthenticCode2 = false;

          }
        break;

        case 2:
          if (event.trim() == "") {
            return;
          } else {
            this.readonly_AuthenticCode2 = true;
            this.readonly_AuthenticCode3 = false;

          }
        break;

        case 3:
          if (event.trim() == "") {
            return;
          } else {
            this.readonly_AuthenticCode3 = true;
            this.readonly_AuthenticCode4 = false;

          }
        break;

        case 4:
          if (event.trim() == "") {
            return;
          } else {
            this.readonly_AuthenticCode4 = true;

            this.showTime = false;
            this.showAuthenticating = true;
            this.disabledResendAuthenticCode = false;
            setTimeout(() => {
              this.incorrectAuthenticCode();

              this.showTime = true;
              if (this.time <= 0) {
                this.showTime = false;
              }
              this.showAuthenticating = false;
              this.disabledResendAuthenticCode = true;
            },3000);
            // console.log("Đã xác thực thành công!", this.value_AuthenticCode1 + this.value_AuthenticCode2 + this.value_AuthenticCode3 + this.value_AuthenticCode4);
          }
        break;

      default:
        break;
    }

  }

  showAlert() {
    this.toastr.success('Mã xác thực đã được gửi đến Email xác nhận của bạn', '', {
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
    });
  }

  resendAuthenticCode() {
    this.randomAuthenticCode = this.randomText();
    this.emailAuthenticCode.to = this.postclientRequest.Email;
    this.emailAuthenticCode.code = this.randomAuthenticCode.toLocaleUpperCase();
    this.clientService.sendEmailAuthenticCode(this.emailAuthenticCode).subscribe({
      next: (data => {
        this.value_AuthenticCode1 = "";
        this.value_AuthenticCode2 = "";
        this.value_AuthenticCode3 = "";
        this.value_AuthenticCode4 = "";

        this.readonly_AuthenticCode1 = false;
        this.readonly_AuthenticCode2 = true;
        this.readonly_AuthenticCode3 = true;
        this.readonly_AuthenticCode4 = true;
        clearInterval(this.interval);
        this.time = 120;
        this.countTime = "02:00";
        this.showTime = true;
        this.countDown();
        this.showAlert();
      }),
      error: ((error: ErrorResponse) => {
        alert(error.Error);
      })
    });
  }


  clearForm() {
    this.form.reset();
  }

  incorrectAuthenticCode() {
    this.authenticCode = this.value_AuthenticCode1 + this.value_AuthenticCode2 + this.value_AuthenticCode3 + this.value_AuthenticCode4;
    if (this.randomAuthenticCode == "") {
      this.toastr.warning('Mã xác thực đã hết hạn', '', {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
      });
    } else if(this.randomAuthenticCode.toLocaleUpperCase() == this.authenticCode.toLocaleUpperCase()) {
      this.clientService.updateClient(this.postclientRequest).subscribe({
        next: (data => {
          window.location.reload();
          this.toastr.success('Cập nhật thành công', '', {
            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
          });
        }),
        error: ((error: ErrorResponse) => {
          alert(error.Error);
        })
      });
    }
    else {
      this.value_AuthenticCode1 = "";
      this.value_AuthenticCode2 = "";
      this.value_AuthenticCode3 = "";
      this.value_AuthenticCode4 = "";

      this.readonly_AuthenticCode1 = false;
      this.readonly_AuthenticCode2 = true;
      this.readonly_AuthenticCode3 = true;
      this.readonly_AuthenticCode4 = true;

      this.toastr.error('Mã xác thực không đúng', '', {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
      });
    }

  }

  // save(){
  //   console.log("re",this.postclientRequest);
  // }

  submitForm() {
    if (this.postclientRequest.FullName && this.postclientRequest.Mobile && this.postclientRequest.Password && this.postclientRequest.RePassword) {
      if (this.getclientRequest.password == this.postclientRequest.RePassword) {
        this.disabledButtonUpdate = true
        this.randomAuthenticCode = this.randomText();
        this.emailAuthenticCode.to = this.postclientRequest.Email;
        this.emailAuthenticCode.code = this.randomAuthenticCode.toLocaleUpperCase();
        this.clientService.sendEmailAuthenticCode(this.emailAuthenticCode).subscribe({
          next: (data => {
            this.openModal(this.template!);
          }),
          error: ((error: ErrorResponse) => {
            alert(error.Error);
          })
        });

      } else {
        alert('Mật khẩu cũ không chính xác!');
      }
    }
    else {
      alert('Vui lòng nhập đầy đủ thông tin cần thay đổi!');
    }
    // console.log(this.postclientRequest.fullName);
    // var clientCategoryID = this.form.get('clientCategoryID')?.value;
    // var email = this.form.get('email')?.value;
    // var password = this.form.get('password')?.value;
    // var fullName = this.form.get('fullName')?.value;
    // var mobile = this.form.get('mobile')?.value;
    // var address = this.form.get('address')?.value;
    // this.postclientRequest.ClientCategoryID = clientCategoryID;
    // this.postclientRequest.FullName = fullName;
    // this.postclientRequest.Email = email;
    // this.postclientRequest.Password = password;
    // this.postclientRequest.Mobile = mobile;
    // this.postclientRequest.Address = address;
    // if (this.clientID && this.clientID !== "") {
    //   //Update
    //   this.clientService.updateClient(this.clientID).subscribe({
    //     next: (data => {
    //       this.router.navigate(['/client-info']);
    //     }),
    //     error: ((error: ErrorResponse) => {
    //       alert(error.Error);
    //     })
    //   });
    // }
  }
}
