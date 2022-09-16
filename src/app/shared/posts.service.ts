import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FbCrearteResponse, Post} from "./interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCrearteResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
        }));
  }
}
