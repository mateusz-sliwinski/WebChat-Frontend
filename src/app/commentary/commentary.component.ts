import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../_services/board.services';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.css']
})
export class CommentaryComponent implements OnInit {
  postId!: string;
  postDetails: any;
  comments: any[];

  constructor(private route: ActivatedRoute, private boardService: BoardService) {
    this.comments = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['postId'];
      this.loadCommentsForPost(this.postId);
      this.loadPost()
    });
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


}