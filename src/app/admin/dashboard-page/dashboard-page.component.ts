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
  postSubscription!: Subscription;
  deleteSubscription!: Subscription;
  searchStr: string = '';

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postSubscription = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string | undefined) {
    if (id === undefined) return;

    this.deleteSubscription = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== id);
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }

    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}
