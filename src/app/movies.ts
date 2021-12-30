export interface Movies{
    id:number;
    title:string;
    poster:string;
    synopsis:string;
    genres:string[];
    year:string;
    director:string;
    actor:string[];
    hours:string[];
    room:number;
    watched:number;
    likes:number,
}
export interface Details{
    id:number;
    title:string;
    poster:string;
    year:string;
    watched:number;
    likes:number;
    link:string
}
export interface select{
    id:number;
    value:string;
}