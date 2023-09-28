import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  uploadedImage: File| undefined;
  selectedFile:any;
  postProductRequest: any = {
    ProductID: "",
  };
  productID = '';
  constructor(private productService: ProductService, private router: Router,public formBuilder: FormBuilder,) {

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  ngOnInit(): void {
  }
  // onUpload() {
  //   if (this.selectedFile) {
  //     const imageFile = new FormData();
  //     imageFile.append('imageFile', this.selectedFile);

  //     this.productService.uploadImagev2(imageFile).subscribe(
  //       (response) => {
  //         console.log('File uploaded successfully');
  //         // Xử lý dữ liệu phản hồi từ API nếu cần
  //       },
  //       (error) => {
  //         console.error('Error uploading file:', error);
  //         // Xử lý lỗi nếu cần
  //       }
  //     );
  //   } else {
  //     console.error('No file selected.');
  //   }
  // }
}
