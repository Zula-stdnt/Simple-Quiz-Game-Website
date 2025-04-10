// Select elements
const usernameInput = document.getElementById("username");
const startBtn = document.getElementById("start-btn");
const quizSection = document.getElementById("quiz-section");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const moneyDisplay = document.getElementById("money-display");
const resultSection = document.getElementById("result-section");
const finalScore = document.getElementById("final-score");
const funnyMessage = document.getElementById("funny-message");
const leaderboardSection = document.getElementById("leaderboard-section");
const leaderboardList = document.getElementById("leaderboard");
const restartBtn = document.getElementById("restart-btn");

let money = 500;
let currentQuestionIndex = 0;
let username = "";
let leaderboard = [];

// Questions array
const questions = [
    { question: "A stranger offers you a free phone online, but asks for your personal details first. What should you do?", options: ["Give them your details", "Ignore the offer", "Ask for more info", "Tell your friends"], correct: 1 },
    { question: "You receive an email saying you won a lottery you never joined. What’s the best action?", options: ["Claim the prize", "Reply to verify", "Ignore and report", "Send bank details"], correct: 2 },
    { question: "A website claims you must pay now or your account will be deleted. What should you do?", options: ["Panic and pay", "Verify the website", "Ignore it", "Give your login details"], correct: 1 },
    { question: "Someone messages you pretending to be your bank, asking for your OTP. What do you do?", options: ["Give them the OTP", "Ignore the message", "Call the bank to verify", "Reply with fake details"], correct: 2 },
    { question: "A job offer online asks for an upfront payment. What’s the best move?", options: ["Pay immediately", "Verify the company", "Ignore and report", "Ask for a discount"], correct: 2 },
    { question: "A friend tells you about an investment that guarantees 500% returns instantly. What do you do?", options: ["Invest quickly", "Ask for proof", "Ignore and report", "Join cautiously"], correct: 2 },
    { question: "You get a text saying you won a prize but must click a link to claim it. What should you do?", options: ["Click the link", "Ignore and delete", "Reply for details", "Ask for more proof"], correct: 1 },
    { question: "An unknown caller says your relative is in trouble and needs money urgently. What’s the best action?", options: ["Send money quickly", "Ask them personal questions", "Verify with your relative", "Ignore the call"], correct: 2 },
    { question: "A pop-up on a website says your device has a virus and you must download an app. What’s the safest action?", options: ["Download the app", "Restart your device", "Ignore the pop-up", "Click to scan"], correct: 2 },
    { question: "A seller online insists on payment before showing any product proof. What should you do?", options: ["Pay immediately", "Ask for proof", "Ignore the seller", "Report the profile"], correct: 3 }
];

// Start game
startBtn.addEventListener("click", () => {
    username = usernameInput.value.trim();
    if (username === "") {
        alert("Please enter your username!");
        return;
    }
    
    document.getElementById("username-section").style.display = "none";
    quizSection.style.display = "block";
    displayQuestion();
});

// Display question
function displayQuestion() {
    if (currentQuestionIndex >= questions.length || money <= 0) {
        endGame();
        return;
    }

    let currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });
}

// Check answer
function checkAnswer(selectedIndex) {
    let correctIndex = questions[currentQuestionIndex].correct;
    let buttons = document.querySelectorAll(".option-btn");

    if (selectedIndex === correctIndex) {
        money += 100;
        buttons[selectedIndex].classList.add("correct");
    } else {
        money -= 200;
        buttons[selectedIndex].classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
    }

    moneyDisplay.textContent = `Money: ₱${money}`;
    currentQuestionIndex++;

    setTimeout(displayQuestion, 1000);
}

// End game
function endGame() {
    quizSection.style.display = "none";
    resultSection.style.display = "block";

    finalScore.textContent = `Final Money: ₱${money}`;

    if (money >= 1000) {
        funnyMessage.textContent = "Wow! You're a scam expert! No one can fool you!";
    } else if (money >= 500) {
        funnyMessage.textContent = "Not bad! But stay sharp, scammers are tricky!";
    } else if (money > 0) {
        funnyMessage.textContent = "You almost got scammed! Be more careful next time!";
    } else {
        funnyMessage.textContent = "You got scammed! Maybe stay off the internet for a while. 😂";
    }

    updateLeaderboard();
}

// Update leaderboard
function updateLeaderboard() {
    leaderboardSection.style.display = "block";
    leaderboard.push({ name: username, score: money });
    leaderboard.sort((a, b) => b.score - a.score);
    
    leaderboardList.innerHTML = "";
    leaderboard.forEach((player) => {
        let li = document.createElement("li");
        li.textContent = `${player.name}: ₱${player.score}`;
        leaderboardList.appendChild(li);
    });
}

// Restart game
restartBtn.addEventListener("click", () => {
    money = 500;
    currentQuestionIndex = 0;
    resultSection.style.display = "none";
    quizSection.style.display = "block";
    displayQuestion();
});
