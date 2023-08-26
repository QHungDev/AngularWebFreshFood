import { Component } from '@angular/core';
@Component({
  selector: 'app-vc-footer',
  templateUrl: './vc-footer.component.html',
  styleUrls: ['./vc-footer.component.css']
})
export class VcFooterComponent {

  backToTop() {
    window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
     });
 }
}
