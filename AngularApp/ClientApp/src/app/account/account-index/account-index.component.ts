import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { ErrorResponse } from '../../responses/error-response';


@Component({
  selector: 'app-account-index',
  templateUrl: './account-index.component.html',
  styleUrls: ['./account-index.component.css']
})
export class AccountIndexComponent implements OnInit {
  accounts: any[] = [];
  keywords = '';

  constructor(private accountService: AccountService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.keywords = params.username;

      if (!this.keywords) {
        const accountsObservable = this.accountService.getAccounts();
        accountsObservable.subscribe((accountsData: any[]) => {
          this.accounts = accountsData;
        });
      }
      else {
        const accountsObservable = this.accountService.searchAccounts(this.keywords);
        accountsObservable.subscribe((accountsData: any[]) => {
          this.accounts = accountsData;
        });
      }
    });
  }

  searchAccount(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/account/index'], { queryParams: { username: this.keywords } });
  }

  addAccount(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/account/detail']);
  }

  editAccount(e: Event, account: any) {
    e.preventDefault();
    this.router.navigate(['/account/detail'], { queryParams: { username: account.username } });
  }

  deleteAccount(e: Event, username: string) {
    e.preventDefault();

    var result = confirm("Bạn có chắc muốn xóa không?");
    if (result == true) {
      this.accountService.deleteAccount(username).subscribe({
        next: (data => {
          window.location.reload();
        }),
        error: ((error: ErrorResponse) => {
          alert(error.Error);
        })
      });
    }
  }
}
