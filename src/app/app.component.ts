import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular-Crud';

  displayedColumns: string[] = ['Id', 'Tittle', 'Content', 'date', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllBlogs();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      
    }).afterClosed().subscribe(val=>{
      if(val == 'save'){
        this.getAllBlogs();

      }
    })
}
getAllBlogs(){
  this.api.getBlog()
  .subscribe({
    next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    },
    error:(err)=>{
      console.log("Error while fetching the records");
    }

  })

}
deleteBlog(id:number){
  this.api.deleteBlog(id)
  .subscribe({
    next:(res)=>{
      alert("Blog Deleted Successfully")
      this.getAllBlogs();
    },
    error:()=> {
      alert("Error While Deleting Blog")
    },

  })

}

editBlog(row : any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val == 'update'){
      this.getAllBlogs();
    }
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
