import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { marked } from 'marked'
import { merge, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class ChangelogService {
  private readonly url = 'https://raw.githubusercontent.com/angular-split/angular-split/main/CHANGELOG.md'
  private cachedHtml = ''

  constructor(private http: HttpClient) {
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
        catchError((error) =>
          of(
            `Error:<br>Unable to retrieve CHANGELOG.md from github..<br>Please go to <a href="${this.url}">${this.url}</a> to view it.`,
          ),
        ),
      ),
    )
  }
}
