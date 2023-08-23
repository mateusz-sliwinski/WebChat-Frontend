import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BoardService } from '../_services/board.services';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  text!: FormGroup;
  selectedFile!: File;
  posts!: Observable<any[]>;
  postArray: any[] = [];
  likeArray: any[] = [];
  private likeSubject: Subject<string[]> = new Subject<string[]>();

  constructor(
    private boardService: BoardService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.text = new FormGroup({
      image: new FormControl(''),
      body: new FormControl(''),
    });
    this.loadLikes();
    this.loadPosts();

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  get f() {
    return this.text!.controls;
  }

  loadPosts() {
    this.posts! = this.boardService.getPosts().pipe(
      map(posts => {
        return posts.map(post => {
          const formattedTimestamp = this.datePipe.transform(
            post.created,
            'yyyy-MM-dd HH:mm'
          );
          post.like_post.forEach((e:any) => {  
            if(this.likeArray.some(like => like.id.includes(e)))
            {
              post.liked = true;
            }
          });
          return { ...post, formattedTimestamp };
        });
      })
    );
    this.posts.subscribe(posts => {
      this.postArray = posts;
    });
  }


  countLikes(post: any): number {
    return post.like_post.length;
  }

  loadLikes() {
    this.boardService.getLikes().subscribe((data:any) => {
       this.likeArray = data;
    });

  }
  likePost(postId: string) {
    this.boardService.likePost(postId).subscribe(() => {
      const postToUpdate = this.postArray.find(post => post.id === postId);
      if (postToUpdate) {
        console.log('Before update:', postToUpdate.like_post);
        postToUpdate.like_post = [...postToUpdate.like_post, postId];
        console.log('After update:', postToUpdate.like_post);
      }
    });
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('body', this.f['body'].value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
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
