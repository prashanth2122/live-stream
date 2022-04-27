import { Component, OnInit } from '@angular/core';
import * as Plyr from 'plyr';
import {OmdbService } from '../../../services/omdb.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public player: any;
  movies:any;
  constructor(
    private omdbService: OmdbService,
  ) { }

  async ngOnInit(): Promise<void> {
  let data:any= await this.omdbService.media("movie", 1);
  this.movies=data?.Search

    // this.player = new Plyr('#plyrID', { captions: { active: true } });
  }

}
