import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server: string = "http://localhost/test_app/server_api/"; // default

  constructor(public http: HttpClient) {

  }


  register(body) {
    return this.http.post(this.server + 'register.php', JSON.stringify(body))
  }

  login(body) {
    return this.http.post(this.server + 'login.php', JSON.stringify(body))
  }


  getRestaurants() {
    return this.http.get(this.server + 'restaurants.php')
  }

  getReviews(body){
    return this.http.post(this.server + 'reviews.php', JSON.stringify(body))
  }

  addReview(body){
    return this.http.post(this.server + 'reviews_add.php', JSON.stringify(body))
  }

  deleteReview(body){
    return this.http.post(this.server + 'reviews_delete.php', JSON.stringify(body))
  }

  updateReview(body){
    return this.http.post(this.server + 'reviews_update.php', JSON.stringify(body))
  }
 
 
 
  data
  set restaurantsData(v) {
    this.data = v
  }

  get restaurantsData() {
    return this.data
  }
}
