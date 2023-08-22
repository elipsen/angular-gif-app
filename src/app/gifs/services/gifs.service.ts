import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY: string = '2xHMPF7L6w004OxMN0dfk5Y7hwVYwEsB';
const GIPHY_URL: string = 'https://api.giphy.com/v1/gifs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  public gifList: Gif[] = [];

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    // Usamos el operador ... para pasar una copia nueva del objeto, y no la misma. Si devuelvo el mismo se pasa por referencia y puede haber problemas.
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag.toLowerCase() !== tag);
    }

    this._tagsHistory.unshift(tag);

    // Limitamos a 10 de historial
    this._tagsHistory = this._tagsHistory.splice(0, 10);

    // Guardamos en el Local Storage
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  // Opción 1 (como lo hacia JS anteriormente)
  /* async searchTag( tag: string ): Promise<void> {
    if (tag.trim().length === 0) return;

    fetch('https://api.giphy.com/v1/gifs/search?api_key=2xHMPF7L6w004OxMN0dfk5Y7hwVYwEsB&q=valorant&limit=10')
      .then( resp => resp.json() )
      .then( data => console.log(data) );

    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=2xHMPF7L6w004OxMN0dfk5Y7hwVYwEsB&q=valorant&limit=10')
    const data = await resp.json();
    console.log(data);

    this.organizeHistory(tag);
  } */

  // Opción 2 (recomendada con el httpclient de angular que es mas robusto y preparado)
  searchTag( tag: string ): void {
    if (tag.trim().length === 0) return;

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', '10')
      .set('q', tag);

    this.http.get<SearchResponse>(`${GIPHY_URL}/search`, { params })
      .subscribe( resp => {
        this.gifList = resp.data;
      });

    this.organizeHistory(tag);
  }
}
