import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Comment } from '../model/comment-model';

@Injectable()
export class CommentService {
    private commentListURL = '/file/comment-mock.json';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) { }
    getCommentList(postId: number): Observable<Comment[]> {
        return this.http.get(this.commentListURL)
            .map(this.extractData).catch(this.handleError);
    }
    public addCommentList(content: string): Observable<Comment> {
        let params = new URLSearchParams();
        params.set('postId', '1');
        params.set('date', '2016-09-09 12:00:09');
        params.set('username', '少女雨');
        params.set('content', content);
        return this.http.post(this.commentListURL, { search: params }, { headers: this.headers })
            .map(res => res.json().items as Comment).catch(this.handleError);
    }
    /**
 *
 * @param res 处理数据的方法  返回res object
 */
    private extractData(res: Response) {
        let body = res.json();
        return body.items || {};
    }
    /**
     * 
     * @param error 处理错误的方法
     */
    private handleError(error: Response | any) {
        return Promise.reject(error || 'Server error');
    }

}