import { Component, OnInit } from '@angular/core';

import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {
  heroName: string;
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add() {
    if (!this.heroName.trim()) return;

    this.heroService.addHero({ name: this.heroName } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.clearInput();
      });
  }

  delete(id: number) {
    this.heroes = this.heroes.filter(hero => hero.id !== id);
    this.heroService.deleteHero(id).subscribe();
  }

  clearInput() {
    this.heroName = '';
  }

}
