import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BoardService } from '../_services/board.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  text!: FormGroup;
  selectedFile!: File;

  constructor(private boardService: BoardService, private router: Router) {}

  ngOnInit(): void {
    this.text = new FormGroup({
      image: new FormControl(''),
      body: new FormControl(''),
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  get f() {
    return this.text!.controls;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('body',this.f['body'].value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    console.log(formData)
    this.boardService.inputBoard(formData).subscribe(
      response => {
        console.log('Post created successfully:', response);
      },
      error => {
        console.error('Error creating post:', error);
      }
    );
  }
}
