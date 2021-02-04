import { GenerationGeneratorService } from "./generation-generator.service";

describe('generation-generator', () => {

    let service: GenerationGeneratorService;

    beforeEach(() => {
        service = new GenerationGeneratorService();
    });

    it('pin', () => {
        expect(service).toBeDefined();
    });

    describe('next', () => {
        describe('next input and output', () => {
            it('accepts array of arrays of int', () => {
                service.next([[1, 1, 1]]);            
            });

            it('returns an array of array or int', () => {
                let result: number[][] = service.next([[]]);
            });

            it('does not return the input array', () => {
                let input: [number[]] = [[0, 0, 0]];
                let result = service.next(input);

                expect(result).not.toBe(input);
            });
        });

        describe('can generate', () =>{
            it('from single row of population data', () => {
                let input: [number[]] = [[0, 0, 0]];
                let result = service.next(input);

                expect(result).toEqual([[0, 0, 0]]);
            });

            let testCases:any[ ] = 
            [
                {input: [[0]], output: [[0]] },
                {input: [[1]], output: [[0]] },
                {input: [[0, 1]], output: [[0, 0]] },
                {input: [[1, 1]], output: [[0, 0]] },
                {input: [[1, 0]], output: [[0, 0]] },
                {input: [[0, 1, 0]], output: [[0, 0, 0]] },
                {input: [[0, 0, 1]], output: [[0, 0, 0]] },
                {input: [[0, 1, 1]], output: [[0, 0, 0]] },
                {input: [[1, 1, 0]], output: [[0, 0, 0]] },
                {input: [[1, 1, 1]], output: [[0, 0, 0]] },
                {input: [[1, 0, 1]], output: [[0, 1, 0]] },
                {input: [[1, 1, 0, 1]], output: [[0, 0, 1, 0]] },
                {input: [[1, 0, 0, 1]], output: [[0, 0, 0, 0]] },
                {input: [[1, 0, 1, 1]], output: [[0, 1, 0, 0]] },
                {input: [[1, 0, 1, 0, 1]], output: [[0, 1, 0, 1, 0]] },
                {input: [[0, 1, 0, 1, 0]], output: [[0, 0, 1, 0, 0]] },
            ]
            testCases.forEach(testCase => {
                it(`from single row of population data ${testCase.input}`, () => {
                    let input = testCase.input;
                    let result = service.next(input);

                    expect(result).toEqual(testCase.output);
                });
            });

            xit('from a 3x3 population', () => {
                let input = [
                    [0, 1, 1],
                    [0, 1, 0],
                    [1, 1, 0]
                ];

                let expectation = [
                    [1, 1, 1],
                    [0, 0, 0],
                    [1, 1, 1]
                ];

                let result = service.next(input);

                expect(result).toEqual(expectation);
            })
        });
    });

    describe('getNeighboringCoordinates', () => {
        it('does the simple thing', () => {
            let result = service.getNeighboringCoordinates(5, {x: 1, y: 1});
            expect(result.length).toBe(8);
        });

        it('does the slightly harder thing', () => {
            let result = service.getNeighboringCoordinates(5, {x: 0, y: 0});
            expect(result.length).toBe(3);

            result = service.getNeighboringCoordinates(5, {x: 1, y: 0});
            expect(result.length).toBe(5);

            result = service.getNeighboringCoordinates(5, {x: 4, y: 2});
            expect(result.length).toBe(5);

            result = service.getNeighboringCoordinates(5, {x: 4, y: 4});
            expect(result.length).toBe(3);
        });
    });

    describe('coords and index', () => {
        it('does the right thing', () => {
            for (let i = 0; i < 25; i++) {

                let coords = service.indexToCoords(5, i);

                let index = service.coordsToIndex(5, coords);

                expect(index).toBe(i);
            }
        })
    });

    fdescribe('next', () => {
        it('simple', () => {
            let start = [
                1, 0, 1,
                0, 0, 0,
                0, 0, 0
            ];

            let expectation = [
                0, 1, 0,
                0, 1, 0,
                0, 0, 0
            ]

            let result = service.next2(start);

            expect(result).toEqual(expectation);
        });

        fit('is freaky', () => {
            let next = [
                1, 0, 1, 0,
                1, 0, 1, 0,
                0, 0, 0, 0,
                0, 0, 0, 1
            ];

            for(let i=0; i<1000; i++) {
                // console.clear();
                next = service.next2(next);
            }

            console.log(next);
                
        })
    });
    
});
