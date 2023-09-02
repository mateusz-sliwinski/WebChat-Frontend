import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BoardService } from '../_services/board.services';
import { Observable, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { UserInformationService } from '../_services/user.services';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  isFilled: boolean = false;
  text!: FormGroup;
  selectedFile!: File;
  posts!: Observable<any[]>;
  postArray: any[] = [];
  private likeSubject: Subject<string[]> = new Subject<string[]>();
  formData: any = {};
  likeArray: any[] = [];
  count_likes_array: any = {};

  constructor(
    private boardService: BoardService,
    private dataService: UserInformationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.text = new FormGroup({
      image: new FormControl(''),
      body: new FormControl(''),
    });
    this.loadLikes();
    this.loadPosts();
    this.formData = this.dataService.getData() || {};
  }
  toggleHeartState() {
    this.isFilled = !this.isFilled;
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
          this.count_likes_array[post.id] = [post.like_post.length, 0];
          post.like_post.forEach((e: any) => {
            if (this.likeArray.some(like => like.id.includes(e))) {
              post.liked = true;
              this.count_likes_array[post.id] = [post.like_post.length, 1];
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

  loadLikes() {
    this.boardService.getLikes().subscribe((data: any) => {
      this.likeArray = data;
    });
  }
  likePost(postId: any) {
    postId.liked = !postId.liked;
    this.boardService.likePost(postId.id).subscribe(() => {
      for (const id in this.count_likes_array) {
        if (id === postId.id) {
          if (this.count_likes_array[id][1]===0)
          {
            this.count_likes_array[id][0]+=1;
            this.count_likes_array[id][1]=1;
          }
          else{
            this.count_likes_array[id][0]-=1;
            this.count_likes_array[id][1]=0;

          }
          break;
        }
      }
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('body', this.f['body'].value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.boardService.inputBoard(formData).subscribe();
  }
}
