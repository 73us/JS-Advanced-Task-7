import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog/blog.interface';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
})
export class AdminBlogComponent implements OnInit {
  public adminBlogs: IBlog[] = [];
  public imagesURL = [
    'https://media.istockphoto.com/id/1198931639/photo/writing-a-blog-blogger-influencer-reading-text-on-screen.jpg?b=1&s=612x612&w=0&k=20&c=_C4iNvLOzKbbfbeTMsJ4mQf8OGQwYWJ8GWKLKRglrF8=',
    'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?cs=srgb&dl=pexels-pixabay-262508.jpg&fm=jpg',
    'https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg',
    'https://plus.unsplash.com/premium_photo-1666107278222-862cd7890c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60',
    'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3695297/pexels-photo-3695297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/10272688/pexels-photo-10272688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/17827708/pexels-photo-17827708/free-photo-of-ijsland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/17727610/pexels-photo-17727610/free-photo-of-a-pay-phone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getAll().subscribe((data) => {
      this.adminBlogs = data;
    });
  }

  // ADD BLOG START
  public blogTitle!: string;
  public blogText!: string;
  public blogAuthor!: string;

  addBlog() {
    const newBlog = {
      title: this.blogTitle,
      text: this.blogText,
      author: this.blogAuthor,
      imageURL: this.imagesURL[Math.floor(Math.random() * 9)],
    };
    this.blogService.create(newBlog).subscribe(() => {
      this.getBlogs();
      this.cleanFields();
    });
  }
  // ADD BLOG END

  // EDIT BLOG START
  public editStatus = false;
  public editId!: number;
  public editBlogImageURL!: string;

  editBlog(blog: IBlog): void {
    this.blogTitle = blog.title;
    this.blogText = blog.text;
    this.blogAuthor = blog.author;
    this.editBlogImageURL = blog.imageURL;
    this.editStatus = true;
    this.editId = blog.id;
  }

  saveBlog(): void {
    const updateBlog = {
      title: this.blogTitle,
      text: this.blogText,
      author: this.blogAuthor,
      imageURL: this.editBlogImageURL,
    };
    this.blogService.update(updateBlog, this.editId).subscribe(() => {
      this.getBlogs();
      this.cleanFields();
    });
  }
  // EDIT BLOG END

  // DELETE BLOG START
  deleteBlog(blog: IBlog): void {
    if (confirm(`Are you sure you want to delete #${blog.id} blog w/title: "${blog.title}"?`)) {
      this.blogService.delete(blog.id).subscribe(() => {
        this.getBlogs();
      });
    }
  }
  // DELETE BLOG END

  // FORM CLEANER START
  private cleanFields(): void {
    this.blogTitle = '';
    this.blogText = '';
    this.blogAuthor = '';
    this.editBlogImageURL = '';
    this.editStatus = false;
  }
  // FORM CLEANER END
}
