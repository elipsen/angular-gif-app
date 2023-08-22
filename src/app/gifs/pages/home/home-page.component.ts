import { GifsService } from 'src/app/gifs/services/gifs.service';
import { Component } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  constructor ( private gifService: GifsService) {}

  get gifs(): Gif[] {
    return this.gifService.gifList;
  }
}
