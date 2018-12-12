import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as marked from 'marked';

@Injectable()
export class ChangelogService {
    private readonly url = 'https://raw.githubusercontent.com/bertrandg/angular-split/master/CHANGELOG.md';
    // else 'https://rawgit.com/bertrandg/angular-split/master/CHANGELOG.md';
    private cachedHtml: string = ''

    constructor(private http: HttpClient) {
        marked.setOptions({});
    }

    getHtml(): Observable<string> {
        if(this.cachedHtml !== '') {
            return of(this.cachedHtml);
        }

        return merge(
            of('Loading..'),
            this.http.get(this.url, {responseType: 'text'}).pipe(
                map(md => {
                    this.cachedHtml = marked(md);
                    return this.cachedHtml;
                }),
                catchError(error => of(`Error:<br>Unable to retrieve CHANGELOG.md from github..<br>Please go to <a href="${ this.url }">${ this.url }</a> to view it.`))
            )
        );
    }

}