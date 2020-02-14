var start = document.getElementById("start");// start bttun
var quiz = document.getElementById("quiz");// main quiz

var question = document.getElementById("question");
var scoreBttn = document.getElementById("scoreBttn");
var counter = document.getElementById("counter");
var timeLeft = 30; //timer
var score = document.getElementById("score");
var results = document.getElementById("results");
var timerInterval;
var points = 0;


var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");

var scoreBoard = document.getElementById("scoreBoard");
var submitBttn = document.getElementById("submit");
var clearBttn = document.getElementById("clear");
var againBttn = document.getElementById("again");

start.addEventListener("click", startQuiz);
submitBttn.addEventListener("click", submitScore);
clearBttn.addEventListener("click", clear);
scoreBttn.addEventListener("click", function () {
    quiz.style.display = "none";
    scoreBoard.style.display = "block";
    scoreBoard.style.margin = "0 auto";
});
againBttn.addEventListener("click", tryAgain);

// Questions list
var questionList = [
    {
        question: 'In JavaScript, how to convert a string to array?',
        choiceA: 'split()',
        choiceB: 'toArray()',
        choiceC: 'slice()',
        answer: 'A',
    },
    {
        question: 'Which type of data is this: a = true',
        choiceA: 'string',
        choiceB: 'boolean',
        choiceC: 'array',
        answer: 'B',
    },
    {
        question: 'How to find the index of an item in an array?',
        choiceA: 'find()',
        choiceB: 'where()',
        choiceC: 'indexOf()',
        answer: 'C',
    },
    {
        question: 'Which of the following is a way of making comments in JavaScript?',
        choiceA: '/* this is a div */',
        choiceB: '// this is a div',
        choiceC: '<!-- this is a div -->',
        answer: 'B',
    }
];

// click to start quiz
function startQuiz() {
    start.style.display = "none";
    render();
    quiz.style.display = "block";
    setTime();
}

var currentQuestion = 0;
// render questions
function render() {
    question.innerText = questionList[currentQuestion].question;
    choiceA.innerText = questionList[currentQuestion].choiceA;
    choiceB.innerText = questionList[currentQuestion].choiceB;
    choiceC.innerText = questionList[currentQuestion].choiceC;
}

// Check if answer is right or wrong
function checkAnswer(choice) {
    if (choice == questionList[currentQuestion].answer) {
        points += 5;
        results.style.textAlign = "center";
        results.style.color = "green";
        results.innerText = "----------Correct----------"
        setTimeout(function () {
            results.innerText = "";
        }, 500);
        score.innerText = points;
    } else {
        results.style.textAlign = "center";
        results.style.color = "red";
        results.innerText = "----------Wrong----------"
        timeLeft -= 5;
        setTimeout(function () {
            results.innerText = "";
        }, 500);
    }
    if (currentQuestion < questionList.length - 1) {
        currentQuestion++;
        render();
    } else {
        // end quiz
        points = 0;
        quiz.style.display = "none";
        scoreBoard.style.display = "block";
        scoreBoard.style.margin = "0 auto";
        timeLeft = 30;
        counter.innerText = timeLeft;
        clearInterval(timerInterval)
    }
}

// set the timer

function setTime() {
    timeLeft = 30;
    timerInterval = setInterval(function () {
        timeLeft--;
        counter.innerHTML = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            quiz.style.display = "none";
            scoreBoard.style.display = "block";
            scoreBoard.style.margin = "0 auto";
        };
    }, 1000);
};

// store the score
function submitScore() {
    event.preventDefault();
    var name = document.getElementById("username");
    var scoreArray;

    if (JSON.parse(localStorage.getItem('userScore'))) {
        scoreArray = JSON.parse(localStorage.getItem('userScore'));
    } else {
        scoreArray = [];
    }

    var userScore = {
        username: name.value,
        score: points,
    };

    scoreArray.push(userScore);

    if (userScore.username === '') {
        alert("Enter your name");
    } else {
        var liEl = document.createElement("li");
        liEl.textContent = name.value + "-" + points;
        var list = document.getElementById("list");
        list.appendChild(liEl);

        localStorage.setItem("userScore", JSON.stringify(scoreArray));

        name.value = '';
    }

};


// delete all score records
function clear() {
    document.querySelector("ol").innerHTML = '';
}

// start the quiz again
function tryAgain() {
    scoreBoard.style.display = "none";
    start.style.display = "block";
    currentQuestion = 0;
    points = 0;
}

// Show usernames and scores submitted
var submittedScore = JSON.parse(localStorage.getItem('userScore'));
for (var i = 0; i < submittedScore.length; i++) {
    var points = submittedScore[i].score;
    var name = submittedScore[i].username;
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    var text = document.createTextNode(name + "-" + points);
    li.appendChild(text);
    ul.appendChild(li);
};
