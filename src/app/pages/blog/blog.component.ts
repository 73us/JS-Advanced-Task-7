import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog/blog.interface';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public userBlogs: IBlog[] = [];

  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getAll().subscribe((data) => {
      this.userBlogs = data;
    });
  }
}
