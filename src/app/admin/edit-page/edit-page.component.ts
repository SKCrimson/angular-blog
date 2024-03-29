import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  post!: Post;

  submitted: boolean = false;
  updateSub!: Subscription;

  constructor(private route: ActivatedRoute, private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      return this.postsService.getById(params['id'])
        .subscribe((post: Post) => {
          this.post = post;
          this.form = new FormGroup({
            title: new FormControl(post.title, Validators.required),
            text: new FormControl(post.text, Validators.required)
          });
        });
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.updateSub = this.postsService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    }).subscribe(() => {
      this.submitted = false;
    });
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
