

const bSize = 8;

class Board{
    constructor(){
        function makeCell(x, y){
            // it doesn't really NEED a name and i might remove it later
            // but rn i need it for personal sanity
            const cell = {};
            cell.title = x + ',' + y;

            const ones = [-1,1];
            const twos = [-2,2];

            cell.links = [];

            for(let o = 0; o < ones.length; o++){
                for(let t = 0; t < twos.length; t++){
                    newLink(x + ones[o], y + twos[t]);
                    newLink(x + twos[t], y + ones[o]);
                }
            }
            // so right now links would be ordered as
            // -1,-2    -1,2    -2,-1   -2,1    1,-2    1,2     2,-1    2,1
            // if i swapped newLink order in the loop we'd get
            // -2,-1    -2,1    -1,-2   -1,2    2,-1    2,1     1,-2    1,2
            // which is like, more correct, but only through the negatives
            // so this would have to get mildly overhauled to generate them in-order

            function newLink(newX, newY){
                if(newX < bSize && newX >= 0 && 
                newY < bSize && newY >= 0 ){
                    cell.links.push([newX, newY]);
                }
            }


            return cell;
        }

        this.grid = [];

        for(let x = 0; x < bSize; x++){
            this.grid.push([]);
            for(let y = 0; y < bSize; y++){
                this.grid[x].push(makeCell(x,y));
            }
        }
    }

    // coords given as [x,y]
    getCell(coords){
        const cell = this.grid[ coords[0] ][ coords[1] ];
        if(cell) return cell
        else{
            console.log( `${coords} was not found on board` );
            return undefined;
        }
    }

    printBoard(){
        for(let y = bSize - 1; y >= 0; y--){
            let printRow = '';

            for(let x = 0; x < bSize; x++){
                printRow += `( ${this.getCell([x,y]).title} )`;
            }
            console.log(printRow);
        }
    }

}



const board = new Board();


console.log('new');
board.printBoard();

/*
if i want first number to be 'horizontal placement' and second to be vertical
board[][] has to be [which column][which place within that column]
which means that when it's being filled, it fills top-bottom FIRST, then side to side
*/




/*
PATHFINDING

so... starting with a given coordinate, you get a group of 'possible moves'
(maybe sort things based on like, the x number, and do the half/half/half search for the tile you're looking for?)

*/





