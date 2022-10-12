var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('start');
var introEl = document.getElementById('intro');
var questionContainerEl = document.getElementById('quesCards');
var questionEl = document.getElementById('questions');
var answerBtnEl = document.getElementById('ansBtn')
var resultsEl = document.getElementById('results');

var quizEndEl = document.getElementById('quiz-end');
var finalScore = document.getElementById('final-score');
var scoreFormEl = document.getElementById('score-form');
var initialsEl = document.getElementById('initials');

var hofLink = document.getElementById('hof');
var hallOfFame = document.getElementById('hall-of-fame');
var scoresList = document.getElementById('scores-list');
var clearBtn = document.getElementById('clear');
var backBtn = document.getElementById('go-back'); 


let questionIndex = 0;
var secondsLeft = 60;



function startQuiz(){
    hideElement(introEl);
    showElement(questionContainerEl);
    availableQuestions = questionBank;
    displayQuestion();
}

function showElement(element) {
    element.removeAttribute('class', 'hide');
}

function hideElement(element) {
    element.setAttribute('class', 'hide');
}


function displayQuestion() {
    var currentQuestion = availableQuestions[questionIndex];
    questionEl.innerText = currentQuestion.question;
    var possibleAnswers = currentQuestion.possChoices;
    for (i=0; i < possibleAnswers.length; i++) {
        var button = document.createElement('button');
        button.innerText = possibleAnswers[i];
        button.setAttribute('class', 'btn')
        button.addEventListener('click', function(){
            
        });
        
        answerBtnEl.appendChild(button);
        
    }
}

var questionBank = [
    {
        question: "Commonly used datatypes do NOT include:",
        possChoices: ['1. string', '2. boolean', '3. alerts', '4. numbers'],
        answer: "3. alerts"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        possChoices: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
        answer: "4. console.log"
    },
    {
        question: "The condition in an if/else statement is enclosed with ____.",
        possChoices: ['1. quotes', '2. curly braces', '3. parenthesis', '4. square brackets'],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in javascript can be used to store ____.",
        possChoices: ['1. numbers and strings', '2. booleans', '3. other arrays', '4. all of the above'],
        answer: "4. all of the above"
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        possChoices: ["a. <script href='xxx.js'>", "b. <script name='xxx.js'>", "c. <script value='xxx.js'>", "d. <script src='xxx.js'>"],
        answer: 3
    },

];

function startTimer() {
    var timerInterval = setInterval(function() {
        timerEl.textContent = secondsLeft;
        secondsLeft--;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    },1000);
}

startBtn.onclick = startTimer;
startBtn.addEventListener("click", startQuiz);