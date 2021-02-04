import { Observable, from } from "rxjs";

export class GenerationGeneratorService {
    constructor(private dimension: number) {

    }

    next(currentGeneration: number[][]): number[][] {
        if (currentGeneration.length == 1) {
            return [ this.singleRowCase(currentGeneration[0]) ]
        }
        return [[0, 0, 0]];
    }

    private singleRowCase(row: number[] ): number[] {
        if (!row || !row.length) {
            return [];
        }
        let result = row.map((cell:number) => 0);

        if (row.length < 3) {
            return result;
        }

        for(let i=1; i< row.length-1; i++) {
            result[i] = (row[i] == 0 && row[i-1] == 1 && row[i+1] == 1)?1:0
        }
        return result;
    }

    next2(population: number[], flipProb:number): number[] {
        let populationDimension = this.dimension;

        let IAmAliveButWillDieIfNeighborCount = [0, 1, 4, 5, 6, 7, 8];
        let IAmDeadButWillSpawnIfNeighborCount = [3];

        return population
            .map((isLiving: number, index: number) => this.indexToCoords(populationDimension, index))
            .map((coords) => {
                let livingNeighbors = this.countLivingNeighbors(population, coords);
                let answer = true;
                if (this.isLiving(population, coords)) {
                    answer = IAmAliveButWillDieIfNeighborCount.indexOf(livingNeighbors) == -1
                }
                else {
                    answer = IAmDeadButWillSpawnIfNeighborCount.indexOf(livingNeighbors) != -1
                }
                answer = Math.random() > flipProb ? answer : !answer;
                return answer?1:0;
            });    
    }

    countLivingNeighbors(population: number[], coord: {x: number, y: number}): number {
        let populationDimension = this.dimension;

        return this.getNeighboringCoordinates(populationDimension, coord)
            .filter(coord => this.isLiving(population, coord))
            .length;
    }

    coordsToIndex(populationDimension: number, coord: {x: number, y: number}) {
        return (coord.y * populationDimension) + coord.x;
    }

    indexToCoords(populationDimension: number, index: number) {
        return { 
            x: index - (Math.floor(index / populationDimension) * populationDimension),
            y: Math.floor(index / populationDimension)
        }
    }

    getNeighboringCoordinates(populationDimension: number, coord: { x: number, y: number }) {
        let answer:{x:number, y:number}[] = [];
        answer.push({x: coord.x-1, y: coord.y-1});
        answer.push({x: coord.x-1, y: coord.y});
        answer.push({x: coord.x-1, y: coord.y+1});
        
        answer.push({x: coord.x, y: coord.y-1});
        answer.push({x: coord.x, y: coord.y+1});
        
        answer.push({x: coord.x+1, y: coord.y-1});
        answer.push({x: coord.x+1, y: coord.y});
        answer.push({x: coord.x+1, y: coord.y+1});

        answer = answer.filter(c => 
            c.x >= 0 &&
            c.x < populationDimension &&
            c.y >= 0 &&
            c.y < populationDimension
        );

        return answer;
    }

    isLiving(population: number[], coord:{ x:number, y:number}) {
        let populationDimension = this.dimension;
        return population[this.coordsToIndex(populationDimension, coord)] === 1;
    }
}

