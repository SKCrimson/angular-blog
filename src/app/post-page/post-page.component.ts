import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../shared/posts.service";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<Post>;

  constructor(private route: ActivatedRoute, private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.post$ = this.postsService.getById(params['id'])
    });
  }

}
