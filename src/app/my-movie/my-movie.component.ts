import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movies } from '../movies';
import { CinemaService } from '../services/cinema.service';
import { HttpClient } from '@angular/common/http';
import { retry,catchError, map } from 'rxjs';
import { faTv,faBackward} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-my-movie',
  templateUrl: './my-movie.component.html',
  styleUrls: ['./my-movie.component.css'],
})
export class MyMovieComponent implements OnInit {
  tv=faTv;  back=faBackward;
  id=''; key=''; trailer='' ;
  i=0; handleError:any; 
  days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  movies:Movies[]=[];
  constructor(private route:ActivatedRoute,private cinema:CinemaService, private http:HttpClient,private router:Router) {
      this.id=this.route.snapshot.params['id']; 

      this.getTrailer(Number(this.id)).subscribe((obj:any)=>{ 
          this.key=obj.videos.results[0].key;
          this.trailer="https://www.youtube.com/embed/"+this.key,
          console.log(this.trailer);
      });
      this.getMovie(Number(this.id)).subscribe((obj:any)=>{ 
          this.movies.push({
              id:obj.id,
              title:obj.original_title,
              poster:"http://image.tmdb.org/t/p/w500"+obj.poster_path,
              synopsis:obj.overview,
              genres:this.genre(obj.genres),
              year:obj.release_date,
              director:this.findDirector(obj.credits.crew),
              actor:this.findActors(obj.credits.cast),
              hours:this.timing(),
              room:Math.floor((Math.random() * 5) + 1),
              watched:obj.popularity,
              likes:obj.vote_count, 
          }); 
      }); 
  } 

  ngOnInit(): void {}  
  getMovie(id:number):any{
    return this.http.get<Movies>("https://api.themoviedb.org/3/movie/"+id+"?api_key=88c54b4c436e531f2f1b43a7dea9add7&language=en-US&append_to_response=credits")
    .pipe(retry(3), catchError(this.handleError)).pipe(
      map((res:any)=>{
        return res;
      })
    );
  }
  
  getTrailer(id:number):any{
    return this.http.get<Movies>("https://api.themoviedb.org/3/movie/"+id+"?api_key=88c54b4c436e531f2f1b43a7dea9add7&append_to_response=videos")
    .pipe(retry(3), catchError(this.handleError)).pipe(
      map((res:any)=>{
        return res;
      })
    );
  }
  genre(g:any):string[]{
    let gen:string[]=new Array;
    for(let j=0;j<g.length;j++){
      gen[j]=g[j].name;
    }
    return gen;
  }
  findActors(cast:any){
    let a:string[]=new Array;
    let c=0;
    for(let j=0;j<cast.length;j++){
       if(cast[j].known_for_department==='Acting'){
          a[c]=cast[j].original_name;
          c++;
       }
       if(c===5){
         a[c]="etc.,"
         break;
       }
    }
    return a;
  }
  findDirector(crew:any):string{
      let d="";
      for(let j=0;j<crew.length;j++){
         if(crew[j].department==='Directing'){
            d+=crew[j].original_name;
            break;
         }
      }
      return d;
  }
  timing():string[]{
      let t:string[]=new Array;
      let m=['00','30'];
      for(let j=0;j<2;j++){
        t[j]=String(Math.floor((Math.random() * 23) + 1))+':'+m[Math.floor(Math.random() * m.length)];
      }
      return t;
  }
  previousPage(){
    this.router.navigate(['/home']);
  }

  
}




