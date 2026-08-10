import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GitHubStats } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private url = 'https://api.github.com/users/Abinayselvam';

  constructor(private http: HttpClient) {}

  getStats(): Observable<GitHubStats> {
    return this.http.get<any>(this.url).pipe(
      map(data => ({
        publicRepos: data.public_repos,
        followers: data.followers,
        following: data.following,
        avatarUrl: data.avatar_url
      }))
    );
  }
}