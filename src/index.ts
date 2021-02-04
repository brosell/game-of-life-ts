import { GenerationGeneratorService } from "./services/generation-generator.service";


let popDim: number = parseInt(process.argv[2] || '25');
let densityProb = 1 - parseFloat(process.argv[3] || '.5');
let flipProb = parseFloat(process.argv[4] || '1');
let speed: number = parseInt(process.argv[5] || '250');

let generator = new GenerationGeneratorService(popDim);

// @ts-ignore
let hashCode = function(str: string){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
      var character = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+character;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function prettyPrint(population: number[]) {
  console.log();
// ▄ ▀ █ 
  let popDim = Math.sqrt(population.length); 
  let disp = '';
  for (let y=0; y<popDim; y = y + 2) {
    let row = '';
    for (let x=0; x<popDim; x++) {
      let tindex = generator.coordsToIndex(popDim, {x:x, y:y});
      let bindex = generator.coordsToIndex(popDim, {x:x, y:y+1});
      let top = population[tindex];
      let bottom = population[bindex];
      let char = (top && bottom) 
        ? '█'
        : (top ? '▀' : (bottom ? '▄' : ' '))
      row += char; // (top == 1 ? '██' : '  ' );// + ' ';
    }

    disp += '   ' + row + "\r\n";
  }
  console.log(disp);
}

let populations: number[] = [];

function seenBefore(population: number[]): boolean {
  let hash = hashCode(population.toString());
  const when = populations.indexOf(hash);
  if (when > -1) {
    console.log("seen", when);
    return true;
  }
  populations.push(hash);
  return false;
}

function isExtinct(population:number[]) {
  return !population.find( i => i === 1)
}


let next:number[] = [];

for (let ii = 0; ii < popDim**2; ii++) {
  next.push(Math.random()>densityProb?1:0);
}

let i = 0;
let start = Date.now();
setInterval( () => {
  console.clear();
  console.log("generation", i);

  // if ( !(i % 100) ) { 
  //   console.log(i, Date.now() - start);
  //   start = Date.now();
  // }
  i++;
  prettyPrint(next);
  if (isExtinct(next)) // || seenBefore(next)) 
  {
    console.clear();
    prettyPrint(next);
    console.log(i, "generations to stable or extinct");
    process.exit();
  }

  next = generator.next2(next, flipProb);
}, speed);

// for(let i=0; i<1000; i++) {
//   console.clear();
//   console.log(next);
  
//   next = generator.next2(next);
// }




