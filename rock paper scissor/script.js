let options = document.querySelectorAll(".option");
let userscore = document.querySelector(".userscore");
let computerscore = document.querySelector(".computerscore");
let message = document.querySelector(".message");
let userscore1 = 0;
let computerscore1 = 0;

// Save data to localStorage
function setitem() {
    const gameState = {
        message: message.innerHTML,
        userscore: userscore1,
        computerscore: computerscore1
    };
    localStorage.setItem("save", JSON.stringify(gameState));
}

// Retrieve data from localStorage
function getitem() {
    const savedGameState = localStorage.getItem("save");
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        message.innerHTML = gameState.message;
        userscore1 = gameState.userscore;
        computerscore1 = gameState.computerscore;
        userscore.innerHTML = userscore1;
        computerscore.innerHTML = computerscore1;
    }
}

// Call getitem() whenever the page is loaded
window.addEventListener("load", getitem);

let draw = () => {
    message.innerHTML = "match is draw";
    message.style.backgroundColor = "yellow";
    // Call setitem() whenever the game state changes
    setitem();
};

let computermovee = () => {
    let arr = ["rock", "paper", "scissor"];
    let mat = Math.floor(Math.random() * arr.length);
    return arr[mat];
};

options.forEach((option) => {
    option.addEventListener("click", () => {
        let usermove = option.getAttribute("id");
        getstart(usermove);
    });
});

function getstart(usermove) {
    let computermove = computermovee();
    if (usermove == computermove) {
        draw();
    } else {
        let userWin = true;
        if (usermove === "rock") {
            userWin = computermove === "paper" ? false : true;
        } else if (usermove === "paper") {
            userWin = computermove === "scissor" ? false : true;
        } else {
            userWin = computermove === "rock" ? false : true;
        }
        win(userWin, usermove, computermove);
    }
}

function win(userWin, usermove, computermove) {
    if (userWin) {
        userscore1++;
        userscore.innerHTML = userscore1;
        message.innerHTML = `  YOU WIN YOUR move is ${usermove} and COMPUTER MOVE is ${computermove}`;
        message.style.backgroundColor = "green";
    } else {
        computerscore1++;
        computerscore.innerHTML = computerscore1;
        message.innerHTML = `  computer WIN HIS move is${computermove} and YOUR MOVE is ${usermove} `;
        message.style.backgroundColor = "red";
    }
    // Call setitem() whenever the game state changes
    setitem();
}

// Reset scores when the button is clicked
document.getElementById("click").addEventListener("click", () => {
    userscore1 = 0;
    computerscore1 = 0;
    userscore.innerHTML = 0;
    computerscore.innerHTML = 0;
    message.innerHTML = "PLAYER-MOVE";
    message.style.backgroundColor = "white";
    // Call setitem() whenever the game state changes
    setitem();
});
