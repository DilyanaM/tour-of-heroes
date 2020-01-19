import { Component, OnInit } from '@angular/core';

import { HEROES } from 'src/app/mock-heroes';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  heroes: Array<Hero> = HEROES;

  constructor() { }

  ngOnInit() { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
