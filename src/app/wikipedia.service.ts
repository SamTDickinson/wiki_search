import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

interface WikipediaResponse {
  query: {
    search: {
      pageid: number,
      title: string,
      snippet: string
    }[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  url = "https://en.wikipedia.org/w/api.php?";

  constructor(private httpClient: HttpClient) {
  }

  search(term: string) {
    return this.httpClient.get<WikipediaResponse>(this.url, {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      }
    }).pipe(
      // pluck('query', 'search')
      map(x => x.query?.search)
    )
  }
}
