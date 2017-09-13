import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { CommentService } from '../services/comment.service';
import { Comment } from '../model/comment-model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  public comments: Comment[];


  constructor(
    public commentService: CommentService,
    public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => this.getCommentList(params['postId'])
    );
  }

  getCommentList(postId: number) {
    this.commentService.getCommentList(postId)
      .subscribe(
      data => {
        this.comments = data;
      },
      error => console.error(error)
      )
  }
  addhero: Comment;
  addComment(content: string) {
    this.commentService.addCommentList(content).subscribe(
      hero => {
        this.addhero = hero;
        this.comments.push(this.addhero[0]);
      }
    )

  }


}