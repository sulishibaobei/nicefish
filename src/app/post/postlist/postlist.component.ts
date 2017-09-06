import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PostlistService } from './services/postlist.service';
import { Post } from '../model/post-model';
@Component({
	selector: 'app-postlist',
	templateUrl: './postlist.component.html',
	styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {
	public itemsPerPage: number = 5;  //每页显示条数
	public totalRecords: number;  //总记录应该获取
	public currentPage: number = 1;   //当前页数
	public offset: number = 0;   //应该显示的数据初始值
	public end: number = 0;  //应该显示的数据结束值
	public searchText: string;
	public searchTextStream: Subject<string> = new Subject<string>();   //订阅输入框是否有值输入

	public postList: Array<Post>;
	public a = [];
	constructor(
		public router: Router,
		public activeRoute: ActivatedRoute,
		public postService: PostlistService) {
	}
	ngOnInit() {
		//从路由里面获取URL参数
		this.activeRoute.params.subscribe(params => {
			//console.log(params);  //获取page 也就是当前页码
			this.currentPage = params.page;
			this.loadData(this.searchText);
		});
		this.searchTextStream
			.debounceTime(500)
			.distinctUntilChanged()
			.subscribe(searchText => {
				//	console.log(this.searchText);  // 输入框的值
				this.loadData(this.searchText)
			});
	}
	public loadData(searchText: string) {
		this.offset = (this.currentPage - 1) * this.itemsPerPage;
		this.end = (this.currentPage) * this.itemsPerPage;
		return this.postService.getPostList(searchText, this.currentPage).subscribe(
			res => {
				this.totalRecords = res['items'].length;
				this.postList = res['items'].slice(this.offset, this.end > this.totalRecords ? this.totalRecords : this.end);
				this.a = [];
				if (searchText) {
					for (let i = 0; i < this.postList.length; i++) {
						if (this.postList[i].title.indexOf(searchText) >= 0) {
							this.a.push(this.postList[i]);
						}
					}
					this.postList = this.a
				}
			},
			error => { console.log(error) },
			() => { }
		);
	}
	//分页
	public pageChanged(event: any): void {
		console.log(event);
		let temp = parseInt(event.page) + 1;
		this.router.navigateByUrl("posts/page/" + temp);
	}
	//搜索框改变
	public searchChanged($event): void {
		this.searchTextStream.next(this.searchText);
	}
	//写作
	public gotoWrite(): void {
		//TODO：如果没有登录，跳转到登录页，如果已登录，跳往写作页
		this.router.navigateByUrl("user/write");
	}
}
