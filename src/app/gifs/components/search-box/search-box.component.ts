import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

// Opción de input con el keyup. Si indicamos keypu.enter, solo se dispara con el enter.
// <input type="text" class="form-control" placeholder="Buscar gifs..." (keyup.enter)="searchTag(txtTagInput.value)" #txtTagInput>
@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" class="form-control" placeholder="Buscar gifs..." (keyup.enter)="searchTag()" #txtTagInput>
  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService) {}

  searchTag() {
    const vcInput = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(vcInput);
    this.tagInput.nativeElement.value = '';
  }
}
