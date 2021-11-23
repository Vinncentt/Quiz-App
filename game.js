const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');


let currentQuestion = {}; //object
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let avilableQuestions = [];

let questions = [
    {
    "question": "Inside which HTML questionCounterement do we put the JavaScript??",
    "choice1": "<script>",
    "choice2": "<javascript>",
    "choice3": "<js>",
    "choice4": "<scripting>",
    "answer": 1
  },
  {
    "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
    "choice1": "<script href='xxx.js'>",
    "choice2": "<script name='xxx.js'>",
    "choice3": "<script src='xxx.js'>",
    "choice4": "<script file='xxx.js'>",
    "answer": 3
  },
  {
    "question": " How do you write 'Hello World' in an alert box?",
    "choice1": "msgBox('Hello World');",
    "choice2": "alertBox('Hello World');",
    "choice3": "msg('Hello World');",
    "choice4": "alert('Hello World');",
    "answer": 4
  }
];
console.log(questions);


//Constatnts

const CORRECT_BONUS = 50;
const MAX_QUESTIONS = 3;

StartGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    //console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        //Go to the end page
        return window.location.assign("/end.html");
        // return window.location.reload(false);
    }
    questionCounter++;
    //questionCounterText.innerText = questionCounterText + "/" + MAX_QUESTIONS;
    progressText.innerText =`Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress Bar
    // progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    console.log();
    progressBarFull.style.width = `${questionCounter / MAX_QUESTIONS * 100}%`;

    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};


choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToAplly = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        //same role writing in anothe way
        // const classToAplly = 'incorrect';
        // if(selectedAnswer == currentQuestion.answer){
        //     classToAplly = 'correct';
        // }

        if(classToAplly === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToAplly);
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToAplly);
            getNewQuestion();
        }, 1000);
    });
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


StartGame();