import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.less']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  searchTerm: string;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroes$ = this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(
          (searchTerm: string) => this.heroService.searchHeroes(searchTerm)
        ),
      );
  }

  search() {
    this.searchTerms.next(this.searchTerm);
  }

}
