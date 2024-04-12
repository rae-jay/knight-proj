// This is like. technically not doing the project right because i don't think i exactly 'used a search
// algorithm'
// but in my half-assed defense, i couldn't think of a way to do that that seemed even mildly efficient
// not that this is super efficient either
// anyway



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
            // (which atm i've decided is more trouble than it's worth)

            function newLink(newX, newY){
                if(newX < bSize && newX >= 0 && 
                newY < bSize && newY >= 0 ){
                    cell.links.push([newX, newY]);
                }
            }


            cell.discovered = false;


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

    resetDiscovery(){
        for(let x = 0; x < bSize; x++){
            for(let y = 0; y < bSize; y++){
                this.getCell([x,y]).discovered = false;
            }
        }
    }
}



const board = new Board();

board.printBoard();

/*
if i want first number to be 'horizontal placement' and second to be vertical
board[][] has to be [which column][which place within that column]
which means that when it's being filled, it fills top-bottom FIRST, then side to side
*/




// ex: ( [0,0], [1,2] )
function knightMoves(startPair, endPair){
    // this is just for my benefit
    let loopCount = 0;


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

    // to check that we haven't already pathed to this tile
    function pathShortestCheck(position){
        const cell = board.getCell(position);
        if(!cell.discovered){
            cell.discovered = true;
            return true;
        }
        else{
            return false;
        }
    }

    // to get final path result
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
    // don't like doing this bit manually but for now, to set discovery of start tile
    pathShortestCheck(startPair);


    while(cellQueue.length > 0 && finished == false){
        console.log('loop start');


        const cell = cellQueue.shift();
        console.log('checking cell: ');
        console.log(cell.position);

        const cellLinks = board.getCell(cell.position).links;
        // console.log('cell links: ');
        // console.log(cellLinks);


        for(const newPath of cellLinks){
            // console.log('checking coords: ' + newPath);
            
            // check for backtracking
            if(pathRepeatCheck(newPath, cell) && pathShortestCheck(newPath)){

                // createPathOb only returns the cell if it's at endPosition, otherwise pushes into queue
                const endCell = createPathOb(newPath, cell);

                if(endCell){
                    console.log('found the destination you should do something.')
                    console.log(getPathChain(endCell));
                    break;
                }
            }
            else{
                // console.log(newPath + ' would be backtracking');
            }
            
        }

        loopCount += 1;
        console.log('loop end');
    }

    console.log('total loops: ' + loopCount);
    board.resetDiscovery();

}


// knightMoves([0,0],[1,2]);

// knightMoves([0,0],[2,4]);
// knightMoves([0,0],[4,0]);

knightMoves([0,0],[7,4]);
