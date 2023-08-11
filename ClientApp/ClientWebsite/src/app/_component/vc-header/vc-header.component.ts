import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-vc-header',
  templateUrl: './vc-header.component.html',
  styleUrls: ['./vc-header.component.css']
})
export class VcHeaderComponent implements OnInit {

  constructor(private router: Router,
    private activeRoute: ActivatedRoute) { }
  ClientLogin(e: Event) {
    e.preventDefault();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
  }
}
