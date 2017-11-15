import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import * as marked from 'marked'

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
            return Observable.of(this.cachedHtml);
        }

        return Observable.merge(
            Observable.of('Loading..'),
            this.http.get(this.url, {responseType: 'text'})
                .map(md => {
                    this.cachedHtml = marked(md);
                    return this.cachedHtml;
                })
                .catch(error => Observable.of(`Error:<br>Unable to retrieve CHANGELOG.md from github..<br>Please go to <a href="${ this.url }">${ this.url }</a> to view it.`))
        );
    }

}