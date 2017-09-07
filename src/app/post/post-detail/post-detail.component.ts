import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Post } from '../model/post-model';
import { PostDetailService } from './services/post-detail.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  public post: Post;

  constructor(public postDetailService: PostDetailService,
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        this.getPost(params["postId"]);
      }
    );
  }

  public getPost(id: number) {
    this.postDetailService
      .getPost(id)
      .subscribe(
      data => {
        for (let i = 0; i < data['items'].length; i++) {
          if (data['items'][i].postId == id) {
            this.post = data['items'][i].info[0];

          }
        }
      },
      error => console.error(error)
      );
  }
}
