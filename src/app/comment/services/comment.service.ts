import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Comment } from '../model/comment-model';

@Injectable()
export class CommentService {
    public commentListURL = 'mock-data/comment-mock.json';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(public http: Http) { }

    public getCommentList(postId: number): Observable<Comment[]> {
        return this.http.get(this.commentListURL)
            .map((res: Response) => res.json())
    }

    public addCommentList(content: string): Promise<Comment> {
        let params = new URLSearchParams();
        params.set('postId', '1');
        params.set('date', '2016-09-09 12:00:09');
        params.set('username', '少女雨');
        params.set('content', content)
        console.log(params);
        return this.http.post(this.commentListURL, { search: params }, { headers: this.headers })
            .toPromise()
            .then(res => res.json().items)
            .catch((error: any) => Promise.reject(error || 'Server error'));
    }
}