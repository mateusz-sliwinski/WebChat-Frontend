import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../_services/board.services';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserInformationService } from '../_services/user.services';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.css'],
})
export class CommentaryComponent implements OnInit {
  postId!: string;
  postDetails: any;
  comments: any[];
  commentForm!: FormGroup;
  formData: any = {};

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private dataService: UserInformationService
  ) {
    this.comments = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['postId'];
      this.loadCommentsForPost(this.postId);
      this.loadPost();
    });

    this.commentForm = new FormGroup({
      body: new FormControl(''),
    });

    this.formData = this.dataService.getData() || {};
    console.log(this.formData);
  }

  loadPost() {
    this.boardService.getPostDetails(this.postId).subscribe(
      postDetails => {
        this.postDetails = postDetails;
      },
      error => {
        console.error('Error loading post details:', error);
      }
    );
  }
  loadCommentsForPost(postId: string) {
    this.boardService.getCommentsForPost().subscribe(
      comments => {
        this.comments = comments.filter(comment => comment.post === postId);
      },
      error => {
        console.error('Error loading comments:', error);
      }
    );
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const commentData = {
        body: this.commentForm.value.body,
        post: this.postId, // Przekazanie identyfikatora postu
      };
      this.createComment(commentData);
    }
  }

  createComment(commentData: any) {
    this.boardService.createComment(commentData).subscribe(
      response => {
        console.log('Comment created successfully:', response);
        this.loadCommentsForPost(commentData.post);
        this.commentForm.reset();
      },
      error => {
        console.error('Error creating comment:', error);
      }
    );
  }
}
