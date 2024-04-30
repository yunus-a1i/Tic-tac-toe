import './style.css'


let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector('.reset');
let newGamebtn = document.querySelector('.new');
let msg = document.querySelector('#msg');
let msgContainer = document.querySelector('.msg-container');


let turnO = true;
let click = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach(box => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "X";
            click++;
            box.style.backgroundColor = "red";
            turnO = false;
        } else {
            box.innerText = "O";
            click++;
            box.style.backgroundColor = "blue";
            turnO = true;
        }
        box.classList.add("disabled");
        if(click == 9){
            msg.innerText = `DRAW`;
            msgContainer.classList.remove("hidden");
        }
        checkWinner(click);
    });
});

const resetGame = () => {
    turnO = true;
    msgContainer.classList.add("hidden");
    click = 0;
    enableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes)
    box.classList.add("disabled");
}

const enableBoxes = () => {
    for(let box of boxes){
    box.innerText = "";
    box.style.backgroundColor = "#f1f1f169";
    box.classList.remove("disabled"); 
    }
}

const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hidden");
    if(winner == "X"){
        newGamebtn.style.color = "red";
    }
    else {
        newGamebtn.style.color = "blue";
    }
    disableBoxes();
}


const checkWinner = (click) => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner");
                showWinner(pos1Val);
            }
        }
    }
}

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);