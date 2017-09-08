import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Comment } from '../model/comment-model';

@Injectable()
export class CommentService {
    public commentListURL = 'http://112.74.180.53/file/comment-mock.json';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(public http: Http, private jsonp: Jsonp) { }

    public getCommentList(postId: number): Observable<Comment[]> {
        let params = new URLSearchParams();
        params.set('callback', 'JSONP_CALLBACK');
        return this.jsonp.get(this.commentListURL, { search: params })
            .map(this.getData);
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
            .then(this.getData)
            .catch((error: any) => Promise.reject(error || 'Server error'));
    }

    private getData(res: Response) {
        let body = res.json();
        console.log(body['items'])
        return body['items'];
    }
}