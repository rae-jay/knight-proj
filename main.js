// starting with a grid of 0,0 - 7,7

// ex: knightMoves( [0,0], [1,2] );

// so feeding [0,0] into Board needs to access the [] of ADJACENT tiles to [0,0]
// Board is just a collection of 64 adjacency lists accessible by two numbers, [x,x]


const bSize = 8;




const board = makeBoard();


function makeCell(x, y){
    // it doesn't really NEED a name and i might remove it later
    // but for my santiy i CANNOT just straight-handle triple nested arrays rn
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


    function newLink(newX, newY){
        if(newX < bSize && newX >= 0 && 
            newY < bSize && newY >= 0 ){
            cell.links.push([newX, newY]);
        }
    }


    return cell;
}


function makeBoard(){
    const result = [];

    // let tempNum = 0;

    for(let x = 0; x < bSize; x++){
        result.push([]);
        for(let y = 0; y < bSize; y++){
            result[x].push(makeCell(x,y));
            // result[x].push(x + ',' + y);
            // result[x].push(tempNum);
            // tempNum+= 1;
        }
    }

    return result;
}

function printBoard(){
    // board is an array of columns, so to get a ROW out of it we need to traverse the FIRST [] as the inside loop
    // then since it prints top-down, starting with higher y's

    for(let y = bSize - 1; y >= 0; y--){
        let printRow = '';

        for(let x = 0; x < bSize; x++){
            printRow += `( ${board[x][y].title} )`;
            // printRow += (board[x][y] + ' ');
        }
        console.log(printRow);
    }
}


printBoard();



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


