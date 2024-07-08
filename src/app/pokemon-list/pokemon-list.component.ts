import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  pokemons: any[] = [];
  page = 1;
  totalPokemons: number | undefined;
  constructor(
    private dataService: DataService
  ) {
  }
  ngOnInit() {
    this.getPokemons();
  }
  // getPokemon(*limit: number*, *offset: number*)
  // parameter = limit is the amount of pokemon to be pulled
  // parameter = offset is the amount to be offset when the limit param is pull
  // example: on page 1 pokemon pulled was 18 then the next page when clicked in pagination
  // it will offset another 18 meaning it will pull 18 different pokemons
  getPokemons(){
    const offset = (this.page - 1) * 18;
    console.log(this.page);

    this.dataService.getPokemons(18, offset)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;
        this.pokemons = [];
        // <!-- *pokemons = []* is used to clear out the existing pokemon on the page then get new pokemon to-->
        // <!-- populate the data this is to avoid appending the result to the existing data-->
        // console.log(this.totalPokemons);
        // console.log();
        // console.log();

        response.results.forEach((result: any) => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              // console.log(uniqResponse.types.length);

              this.sortPokemon();
              console.log(uniqResponse);
            });
        });
      });
  }

  sortPokemon(){
  //this is how to sort the number by ascending the numbers
  this.pokemons.sort((a, b) => a.id - b.id);
  }

}
