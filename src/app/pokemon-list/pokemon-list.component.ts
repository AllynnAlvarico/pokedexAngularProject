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
              uniqResponse.isToggled = false;
              this.pokemons.push(uniqResponse);
              // console.log(uniqResponse.types.length);
              // this.checkPokemonType(uniqResponse.types[0].type.name, uniqResponse.name);
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
  getPokemonTypeClasses(type: any): string {
    return type.type.name;
  }
  toggleSwitch(pokemon: any) {
    console.log("Hello!");
    pokemon.isToggled = !pokemon.isToggled;
  }

  //
  // checkPokemonType(type: string, u: any){
  //   this.resetType();
  //   switch (type) {
  //     case "grass": this.isGrass = true; break;
  //     case "fire": this.isFire = true; break;
  //     case "water": this.isWater = true; break;
  //     case "flying": this.isFlying = true; break;
  //     case "fighting": this.isFighting = true; break;
  //     case "poison": this.isPoison = true; break;
  //     case "electric": this.isElectric = true; break;
  //     case "ground": this.isGround = true; break;
  //     case "rock": this.isRock = true; break;
  //     case "psychic": this.isPsychic = true; break;
  //     case "ice": this.isIce = true; break;
  //     case "bug": this.isBug = true; break;
  //     case "ghost": this.isGhost = true; break;
  //     case "steel": this.isSteel = true; break;
  //     case "dragon": this.isDragon = true; break;
  //     case "dark": this.isDark = true; break;
  //     case "fairy": this.isFairy = true; break;
  //     case "normal": this.isNormal = true; break;
  //     default: {
  //       console.log("pokemon type undefined");
  //       break;
  //     }
  //   }
  // }
  // resetType(){
  //   this.isNormal = false;
  //   this.isGrass = false;
  //   this.isFire = false;
  //   this.isWater = false;
  //   this.isFlying = false;
  //   this.isFighting = false;
  //   this.isPoison = false;
  //   this.isElectric = false;
  //   this.isGround = false;
  //   this.isRock = false;
  //   this.isPsychic = false;
  //   this.isIce = false;
  //   this.isBug = false;
  //   this.isGhost = false;
  //   this.isSteel = false;
  //   this.isDragon = false;
  //   this.isDark = false;
  //   this.isFairy = false;
  // }


}
