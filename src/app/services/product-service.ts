import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'node:console';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  url = "https://dummyjson.com/products"
  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get(this.url);
  }

}
