import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { marked } from 'marked'
import { merge, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class ChangelogService {
  private http = inject(HttpClient)

  private readonly url =
    'https://raw.githubusercontent.com/angular-split/angular-split/refs/heads/main/projects/angular-split/CHANGELOG.md'
  private cachedHtml = ''

  constructor() {
    marked.setOptions({})
  }

  getHtml(): Observable<string> {
    if (this.cachedHtml !== '') {
      return of(this.cachedHtml)
    }

    return merge(
      of('Loading..'),
      this.http.get(this.url, { responseType: 'text' }).pipe(
        map((md) => {
          this.cachedHtml = marked(md)
          return this.cachedHtml
        }),
        catchError(() =>
          of(
            `Error:<br>Unable to retrieve CHANGELOG.md from github..<br>Please go to <a href="${this.url}">${this.url}</a> to view it.`,
          ),
        ),
      ),
    )
  }
}
