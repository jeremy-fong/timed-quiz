var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('start');
var introEl = document.getElementById('intro');
var questionContainerEl = document.getElementById('quesCards');
var questionEl = document.getElementById('questions');
var answerBtnEl = document.getElementById('ansBtn')
var resultsEl = document.getElementById('results');

var quizEndEl = document.getElementById('quiz-end');
var finalScoreEl = document.getElementById('final-score');
var scoreFormEl = document.getElementById('score-form');
var initialsEl = document.getElementById('initials');

var linkHof = document.getElementById('hof');
var hallOfFame = document.getElementById('hall-of-fame');
var scoresList = document.getElementById('scores-list');
var clearBtn = document.getElementById('clear');
var backBtn = document.getElementById('go-back'); 

var scores = [];
let questionIndex = 0;
var secondsLeft = 60;
let timerInterval;
let flashTimeout;

function startQuiz(){
    hideElement(introEl);
    showElement(questionContainerEl);
    availableQuestions = questionBank;
    displayQuestion();
    startTimer();
    // resetQuestions();
}

function displayQuestion() {
    var currentQuestion = availableQuestions[questionIndex];
    questionEl.textContent = currentQuestion.question;
    var possibleAnswers = currentQuestion.possChoices;
    for (i=0; i < possibleAnswers.length; i++) {
        var button = document.createElement('button');
        button.textContent = possibleAnswers[i];
        button.setAttribute('class', 'btn')
        button.addEventListener('click', function(event){
            checkAnswer(event);
            resetQuestions();
            nextQuestion();
        });
        
        answerBtnEl.appendChild(button);
        
    }
};

function resetQuestions() {
    questionIndex++;
    if (questionIndex < availableQuestions.length) {
        while (answerBtnEl.firstChild) {
            answerBtnEl.removeChild(answerBtnEl.firstChild);
        }
        // nextQuestion();  
    } else {
        endQuiz();

    }
}


function checkAnswer(event) {
    var selectedEl = event.target;
    var selected = selectedEl.textContent;
    var msgEl = document.createElement('h4');   
    
    if (selected === questionBank[questionIndex].correctAnswer) {
        resultsEl.setAttribute('class', 'right');
        msgEl.innerText = "Right!";
        resultsEl.appendChild(msgEl);
        flashTimout = setTimeout(function() {
            hideElement(msgEl);
            clearTimeout(flashTimout);
            
        },800); 
    } else {
        secondsLeft -= 10;
        resultsEl.setAttribute('class', 'wrong');
        msgEl.innerText = 'Wrong!';
        resultsEl.appendChild(msgEl);
        flashTimout = setTimeout(function() {
            hideElement(msgEl);
            clearTimeout(flashTimout);
        },800);
    }
    
    nextQuestion();
    
}

function nextQuestion() {
    if (questionIndex < questionBank.length) {
        displayQuestion();
    } else {
        setTimeout(function() {
            endQuiz();
        },500)
    }
}

function endQuiz() {
    clearInterval(timerInterval); 
    timerEl.textContent = 0; 
 
    
    if (secondsLeft < 0) {
        secondsLeft = 0;
    }
    
    finalScoreEl.textContent = secondsLeft;
    hideElement(questionContainerEl);
    showElement(quizEndEl);
}

function compareScores(a, b) {
    return b.score - a.score;
}

function renderScores() {
    hideElement(questionContainerEl);
    hideElement(quizEndEl);
    hideElement(introEl);
    scoresList.innerHTML = "";
    scores.sort(compareScores);
    for (let i = 0; i < scores.length; i++) {
        var li = document.createElement('li');
        li.textContent = `${scores[i].initials} - ${scores[i].score}`;
        scoresList.appendChild(li);
    }

    showElement(hallOfFame);
}

function storeScore() {
    localStorage.setItem('scores', JSON.stringify(scores));
}

function loadScores() {
    var storedScores = JSON.parse(localStorage.getItem('scores'));
    if (storedScores) {
        scores = storeScores;
    }
}

// loadScores();

backBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    questionIndex = 0;
    secondsLeft = 60;

    timerEl.textContent = secondsLeft;

    resetQuestions();
    hideElement(hallOfFame);
    showElement(introEl);
})

scoreFormEl.addEventListener('submit', function(event) {
    event.preventDefault();
    var initials = initialsEl.value.trim();
    if (!initials) {
        return;
    }

    var initialsScore = { initials: initials, score: secondsLeft };


    scores.push(initialsScore);

    initialsEl.value = "";


    storeScore();

    renderScores();
})


clearBtn.addEventListener('click', function() {
    localStorage.clear();
    scores = [];
    renderScores();
})

linkHof.addEventListener('click', function() {
    clearInterval(timerInterval);
    renderScores();

})

var questionBank = [
    {
        question: "Commonly used datatypes do NOT include:",
        possChoices: ['1. string', '2. boolean', '3. alerts', '4. numbers'],
        correctAnswer: "3. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with ____.",
        possChoices: ['1. quotes', '2. curly braces', '3. parenthesis', '4. square brackets'],
        correctAnswer: "3. parenthesis"
    },
    {
        question: "Arrays in javascript can be used to store ____.",
        possChoices: ['1. numbers and strings', '2. booleans', '3. other arrays', '4. all of the above'],
        correctAnswer: "4. all of the above"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        possChoices: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
        correctAnswer: "4. console.log"
    },
    {
        question: "What is the correct syntax for referring to an external script called '***.js'?",
        possChoices: ["1. <script href='***.js'>", "2. <script name='***.js'>", "3. <script link='***.js'>", "4. <script src='***.js'>"],
        correctAnswer: "4. <script src='***.js'>"
    },
    
];

function showElement(element) {
    element.removeAttribute('class', 'hide');
}

function hideElement(element) {
    element.setAttribute('class', 'hide');
}

function startTimer() {
     timerInterval = setInterval(function() {
        timerEl.textContent = secondsLeft;
        secondsLeft--;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    },1000);
}

// startBtn.onclick = startTimer;
startBtn.addEventListener("click", startQuiz);