import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(() => this.log(`fetched hero with id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(() => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero with id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(() => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  deleteHero(id: number): Observable<Hero> {
    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  searchHeroes(searchParam: string): Observable<Hero[]> {
    if (!searchParam.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${searchParam}`)
      .pipe(
        tap(() => this.log(`found heroes matching "${searchParam}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
