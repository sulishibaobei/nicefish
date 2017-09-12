import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from './news';
import { Jsonp, URLSearchParams, Http } from '@angular/http'
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  new: News[];
  constructor(private http: Http, private jsonp: Jsonp) { }

  ngOnInit() {
    this.http.get('/toutiao/index?type=top&key=3c6870f135609597aa7bc03e21f8dc20')
      .subscribe(data => {
        this.new = data['result'];
        console.log(this.new)
      })
  }
}
