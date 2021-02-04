# Game of Life
Conway's Game of Life in typescript console


### install
- unzip somewhere
- npm install
- npm run gol [populationSize (def 25) [popDenstityProb (.71) [mutateChance (0) [generationTimeMS (250)] ] ] ]

cell area is square, so populationSize represents length of side. Board size will be (populationSize^2)

This is a nice one that lasts a long time. May need to ensmallen your console font

npm run gol 86 .71 .0001 100


### Rules:
- population exists as an virtually infinite sized grid of square cells
  - obviously limitation is that we can't have an infinite sized 'world'
- Game is given seed population
- generating generations
  - populated positions with < 2 live neighbors die
  - populated positions with > 3 neighbors die
  - populated positions with 2 or 3 live neighbors lives on to next gen
  - unpopulated cell with 3 live neighbors becomes populated
- each cell is evaluated 'simultaneously'


