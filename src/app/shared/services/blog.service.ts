import { Injectable } from '@angular/core';
import { IBlogRequest, IBlogResponse } from '../interfaces/blog/blog.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private url = environment.BACKEND_URL;
  private api = { discounts: `${this.url}/blogs` };

  constructor(private http: HttpClient) {}

  getAll(): Observable<IBlogResponse[]> {
    return this.http.get<IBlogResponse[]>(this.api.discounts);
  }

  create(discount: IBlogRequest): Observable<IBlogResponse> {
    return this.http.post<IBlogResponse>(this.api.discounts, discount);
  }

  update(discount: IBlogRequest, id: number): Observable<IBlogResponse> {
    return this.http.patch<IBlogResponse>(
      `${this.api.discounts}/${id}`,
      discount
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.discounts}/${id}`);
  }
}
