import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Post } from '../../model/post-model';

@Injectable()
export class PostlistService {
  public postListURL = 'mock-data/postlist-mock.json';
  public postListSearchURL = 'mock-data/postlist-search-mock.json';

  constructor(public http: Http) { }

  public getPostList(searchText: string, page: number = 1): Observable<Post[]> {
    let url = this.postListURL;
    // URLSearchParams  处理url参数的串
    let params = new URLSearchParams();
    /**
     * 验证输入框中是否有值
     */
    if (searchText) {
      params.set('searchText', searchText);
      url = this.postListSearchURL;
      //console.log(`searchText=${searchText}`);
    }
    params.set('page', String(page));

    return this.http
      .get(url, { search: params })
      .map((res: Response) => {
        let result = res.json();
        console.log(params);
        return result;
      })
      /**  错误操作处理  还有这个Promise.reject(error.message || error)*/
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public getPostNumber(): number {
    return 0;
  }

  public addPost(user: any) {

  }

  public search() {

  }
}
