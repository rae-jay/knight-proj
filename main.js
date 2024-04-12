

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





// ex: ( [0,0], [1,2] )
function knightMoves(startPair, endPair){

    const cellQueue = [];
    let finished = false;


    // to make sure we don't add backtracking to a pathOb chain
    function pathRepeatCheck(position, pathOb){

        // hit the end without failing, so succeeded
        if(!pathOb.parent){
            return true;
        }

        if(pathOb.parent.position == position){
            return false;
        }
        else{
            return pathRepeatCheck(position, pathOb.parent);
        }

    }

    function getPathChain(endCell){
        // const chain = [endCell.position];
        let chain = endCell.position.toString();

        function getParent(current){
            if(current.parent){
                chain = current.parent.position.toString() + '\n' + chain;
                // chain.unshift(current.parent.position);
                getParent(current.parent);
            }
        }
        getParent(endCell);

        chain = 'path to destination:\n' + chain;

        return chain;
    }

    // parent is another pathOb, position is just [x,y]
    function createPathOb(position, parent){
        const pathOb = {};
        pathOb.parent = parent;
        pathOb.position = position;

        // this part would change if we check for destination before feeding into createPathOb
        // console.log(position + '/' + endPair);
        if(position[0] == endPair[0] && position[1] == endPair[1]){
            finished = true;
            return pathOb;
        }
        else{
            console.log('adding ' + position + ' to queue');
            cellQueue.push(pathOb);
            return null;
        }
    }

    console.log('initiating');
    createPathOb(startPair, null);

    // let overload = 6;
    //  && overload < 10

    while(cellQueue.length > 0 && finished == false){
        console.log('loop start');
        // overload += 1;


        const cell = cellQueue.shift();
        console.log('checking cell: ');
        console.log(cell.position);

        const cellLinks = board.getCell(cell.position).links;
        // console.log('cell links: ');
        // console.log(cellLinks);

        // k actually i think
        // HERE, search cellLinks for the destination
        // and if not found, feed them into createPathOb
        // and then i just have to do one search upfront for 'is startpair and endpair the same'

        // but uh right now actually just
        for(const newPath of cellLinks){
            // console.log('checking coords: ' + newPath);
            
            // check for backtracking
            if(pathRepeatCheck(newPath, cell)){

                // createPathOb only returns the cell if it's at endPosition, otherwise pushes into queue
                const endCell = createPathOb(newPath, cell);

                if(endCell){
                    console.log('found the destination you should do something.')
                    console.log(getPathChain(endCell));
                    break;
                }

            }
            else{
                console.log(newPath + ' would be backtracking');
            }
            
        }


        console.log('loop end');
        // find all possible links, check for repeats in parent path, createPathObs for links
    }



    // if(overload >= 10){
    //     console.log('ERROR: search failed, overloaded');
    // }


}


// knightMoves([0,0],[1,2]);

// knightMoves([0,0],[2,4]);
// knightMoves([0,0],[4,0]);

knightMoves([0,0],[7,4]);
