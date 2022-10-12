import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postBlog(data : any){
    return this.http.post<any>("http://localhost:3000/blogList/",data);
    
  }
  getBlog(){
    return this.http.get<any>("http://localhost:3000/blogList/");
  }
  putBlog(data : any,id : number){
    return this.http.put<any>("http://localhost:3000/blogList/"+id , data);
  }
  deleteBlog(id:number){
    return this.http.delete<any>("http://localhost:3000/blogList/"+id);
  }
}
