import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  
  constructor(private http:HttpClient) { }
  
  handleError:any;

  getMovies(q:string):any{
    return this.http.get("https://api.themoviedb.org/3/discover/movie?api_key=apikey&language=en-US&sort_by="+q+".desc&page=1&primary_release_date.gte=2019-01-01&primary_release_date.lte=2021-11-30&vote_average.gte=6");
  }

      
}
