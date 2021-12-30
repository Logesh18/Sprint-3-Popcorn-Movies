import { Component, OnInit } from '@angular/core';
import { Details,select} from '../movies';
import { CinemaService } from '../services/cinema.service';
import { HttpClient } from '@angular/common/http';
import { retry,catchError, map } from 'rxjs';
import { faCaretDown,faTv,faEye,faHeart } from '@fortawesome/free-solid-svg-icons';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.css']
})
export class MyHomeComponent implements OnInit {
 
  caret=faCaretDown; tv=faTv; eye=faEye; heart=faHeart;
  i=0; handleError:any; movies:Details[]=[];j=0;initial:number=0;
  selectedvalue:select[]=[];
  constructor(private cinema:CinemaService, private http:HttpClient) { 
    
  }
  getMovie(id:number):any{
    return this.http.get<Details>("https://api.themoviedb.org/3/movie/"+id+"?api_key=88c54b4c436e531f2f1b43a7dea9add7&language=en-US&append_to_response=credits")
    .pipe(retry(3), catchError(this.handleError)).pipe(
      map((res:any)=>{
        console.log(res);
        return res;
      })
    );
  }
  ngOnInit(): void {
    this.selectedvalue=[
      {
         id:0,
         value:"Popularity"
      },
      {
         id:1,
         value:"Upcoming",
      },
      {
         id:2,
         value:"Rating"
      }
    ];
    this.initial=0;
    console.log(this.selectedvalue[this.initial].value.toString());
    this.getData(this.initial);
  }
  getData(initial:number){
    this.cinema.getMovies(this.selectedvalue[initial].value.toString()).subscribe((res:any)=>{
      for(this.i=0;this.i<res.results.length;this.i++){
          this.getMovie(res.results[this.i].id).subscribe((obj:any)=>{ 
              this.movies.push({
                  id:this.j,
                  title:obj.original_title,
                  poster:"http://image.tmdb.org/t/p/w500"+obj.poster_path,
                  year:obj.release_date,
                  watched:obj.popularity,
                  likes:obj.vote_count,
                  link:"/movie/"+obj.id
              }); 
              this.j++;
          });
      } 
    });
  }
  onChange(v:number){
     this.initial=v;
     this.movies=[];
     this.getData(this.initial);
     console.log(this.initial);
  }
}
