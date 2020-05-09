
const options = document.querySelector('.option').children;
const scoreTrackerContainer = document.querySelector('.score');
const questionNumberspan = document.querySelector('.qnumvalue');
const totalquestionspan = document.querySelector('.totalqvalue');
const correctAnswerSpan = document.querySelector('.correct-answer');
const totalquestionspan2 = document.querySelector('.totalquest');
const question = document.querySelector('#quest');
const op1 = document.querySelector('#opt1');
const op2 = document.querySelector('#opt2');
const op3 = document.querySelector('#opt3');
let questionIndex;
let index = 0;
let myArray = [];
let myArr=[];
let tScore = 0;

// Questions, options and Answers
const questions = [
  {
    q: 'What city is the Capital City of Nigeria?',
    options: ['Cairo', 'Kumasi', 'Abuja'],
    answers: 'opt3'
  },
  {
    q: 'Which is the longest river in afrrica?',
    options: ['Nile', 'Orange', 'Niger'],
    answers: 'opt1'
  },
  {
    q: 'In what year did the Zambia gain its independence?',
    options: ['1961', '1964', '1945'],
    answers: 'opt2'
  },
  {
    q: 'What is the approximate population of Africa?',
    options: ['1.1 billion', '1.4 billion', '1.9 billion'],
    answers: 'opt1'
  },
  {
    q: 'The Capital city of Burkina Faso is?',
    options: ['Kampala', 'Ouagadougou', 'Lesotho'],
    answers: 'opt2'
  }
]


// set questions, options and question number
totalquestionspan.innerHTML = questions.length;
function load() {
  questionNumberspan.innerHTML = index + 1;
  question.innerHTML = questions[questionIndex].q;
  op1.innerHTML = questions[questionIndex].options[0];
  op2.innerHTML = questions[questionIndex].options[1];
  op3.innerHTML = questions[questionIndex].options[2];
  index++;
}

function check(element) {
  if (element.id == questions[questionIndex].answers) {
    element.classList.add("correct");
    updateScore("correct");
    tScore++;
    console.log("tScore:"+tScore)
  }
  else {
    element.classList.add("wrong");
    updateScore("wrong");
  }
  disabledOptions()
}

function disabledOptions() {
  for (let i=0; i<options.length; i++) {
      options[i].classList.add("disabled");
      if (options[i].id == questions[questionIndex].answers) {
        options[i].classList.add("correct")
      }

  }
}
function enableOptions() {
  for (let i=0; i<options.length; i++) {
      options[i].classList.remove("disabled", "correct", "wrong");

  }
}

function validate() {
  if (!options[0].classList.contains("disabled")) {
    alert('Select an option to continue')
  }
  else{
    enableOptions();
    randomQuestion();
  }
}

function next() {
  validate();

}

function randomQuestion() {
  let nextNumber = Math.floor(Math.random()*questions.length);
  let hitDuplicate=0;
  if (index==questions.length){
    quizOver();
  }
  else{
    if (myArray.length>0) {
      for(let i=0; i<myArray.length; i++){
        if(myArray[i]==nextNumber) {
          hitDuplicate=1;
          break;
        }
      }
      if (hitDuplicate==1){
        randomQuestion();
      }
      else {
        questionIndex = nextNumber;
        load();
        myArr.push(questionIndex);
      }
    }
    if (myArray.length==0) {
      questionIndex = nextNumber;
      load();
      myArr.push(questionIndex);
    }

    myArray.push(nextNumber);
  }
}

function answerTracker() {
  for (let i=0; i<questions.length; i++){
    const div = document.createElement("div");
      scoreTrackerContainer.appendChild(div);
  }

}

function quizOver() {
  document.querySelector('.quiz-over').classList.add('show');
  correctAnswerSpan.innerHTML=tScore;
  totalquestionspan2.innerHTML=questions.length;
}

function tryAgain() {
    window.location.reload();
}

function updateScore(classNam) {
  scoreTrackerContainer.children[index-1].classList.add(classNam);
}

window.onload = function() {
  randomQuestion();
  answerTracker();
}
