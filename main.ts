type Xy = {
    x: number
    y: number
}
type Row = Array<boolean>;
type Display = Array<Row>;
const displayData: Display = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
]
const dot: Xy = {
    x: 2,
    y: 0
}
let fallTimer:number = 500;
let gameOver:boolean = false;
function render(display: Display):void{
    for(let y=0; y < 5; y++){
        for (let x = 0; x < 5; x++) {
            led.unplot(y, x)
        }
    }
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if(display[y][x]){
                led.plot(x, y)
            }
        }
    }
}
function scoreDropEnd(coord: Xy, display: Display){
    if (display[coord.y].every((test) => {return test === true})){
        for (let x = 0; x < 5; x++) {
                display[coord.y][x] = false;
        } 
        for (let y = 4; y > 0 ; y--) {
            for (let x = 0; x < 5; x++) {
                if (display[y][x]) {
                    display[y][x] = false;
                    display[y+1][x] = true;
                }
            }
        }

    }

    coord.y = 0;
    coord.x = 2;
    if(display[coord.y + 1][coord.x]){
        gameOver = true;
    }
    display[coord.y][coord.x] = true;
}
function fall(coord: Xy, display: Display):void{
    display[coord.y][coord.x] = false;
    coord.y += 1;
    display[coord.y][coord.x] = true;
}
function moveLeft(coord: Xy, display: Display): void {
    if (coord.x - 1 >= 0 && !display[coord.y][coord.x - 1]) {
        display[coord.y][coord.x] = false;
        coord.x -= 1;
        display[coord.y][coord.x] = true;
    }
}
function moveRight(coord: Xy, display: Display): void {
    if(coord.x + 1 <= 4 && !display[coord.y][coord.x + 1]){
        display[coord.y][coord.x] = false;
        coord.x += 1;
        display[coord.y][coord.x] = true;
    }
}
 
loops.everyInterval(80, function () {
    if (!gameOver){
         render(displayData)
        if (input.buttonIsPressed(Button.A)) {
                moveLeft(dot, displayData)
        }
        if (input.buttonIsPressed(Button.B)) {
                moveRight(dot, displayData)
            }
    }else{
        basic.showIcon(IconNames.Sad)
        basic.pause(1000);
    }

})
loops.everyInterval(fallTimer, function () {
    if (dot.y === 4) {
        scoreDropEnd(dot, displayData)
    }
    else if (displayData[dot.y + 1][dot.x]) {
        scoreDropEnd(dot, displayData)
    }
    else {
        fall(dot, displayData)
    }})
