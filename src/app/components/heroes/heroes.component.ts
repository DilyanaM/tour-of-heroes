import { Component } from '@angular/core';

import { HEROES } from 'src/app/mock-heroes';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent {

  selectedHero: Hero;
  heroes: Array<Hero> = HEROES;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
