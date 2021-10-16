import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'

interface Coin{
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title: string;

  url: string = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  coins: Coin[] = [];
  filteredCoins: Coin[] = [];
  titles: string[] = [
    '#',
    'Coin',
    'Price',
    'Price Change in 24h',
    'Total Volume'
  ];
  searchText: string = '';

  constructor(private http: HttpClient){
    this.title = 'angular-coingecko-api';
   }
  
  ngOnInit(){
    this.http.get<Coin[]>(this.url)
    .subscribe(
      res => {
        console.log(res);
        this.coins = res;
        this.filteredCoins = res;
      }, 
      err => console.log(err));
  }

  searchCoin(searchText: string){
    this.searchText = searchText.toLowerCase();
    this.filteredCoins = this.coins.filter(coin => 
      coin.name.toLowerCase().includes(this.searchText) ||
      coin.symbol.toLowerCase().includes(this.searchText)
    );
  }
}
