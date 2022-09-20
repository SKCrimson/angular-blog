import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postSub!: Subscription;
  deleteSub!: Subscription;
  searchStr: string = '';

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string | undefined) {
    if (id === undefined) return;

    this.deleteSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== id);
    });
  }

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
