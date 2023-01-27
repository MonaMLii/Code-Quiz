
// create all vars

var questionsEl = document.querySelector("#questions");
var thisQuestion = document.querySelector("#question-is");
var choicesEl = document.querySelector("#choices");
var goodFeedbackEl = document.querySelector("#good-feedback");
var badFeedbackEl = document.querySelector("#bad-feedback");
var resultEl = document.querySelector("#result");
var timerEl = document.querySelector("#time");
var btnEl = document.querySelector("#buttons");
var startBtn = document.querySelector("#start");
var instructionEl = document.querySelector("#instruction");
var submitBtn = document.querySelector("#submit");
var initialEl = document.querySelector("#initial");
var showScoreEl = document.querySelector("#show-score");
var currentScore = 0;
var ulEl = document.getElementById("storeHere");
console.log(resultEl);

// quiz time
var currentQuestion = 0;
var time = questions.length * 15;
var timerStart;
var storeScore;


function getStoredScore() {
  storeScore = localStorage.getItem("storeScore") || [];
  console.log(storeScore.length);
  
  for (var i = 0; i < storeScore.length; i++) {
    var liTag = document.createElement("li");
    liTag.textContent = storeScore[i].initial + " - " + storeScore[i].score;

    ulEl.appendChild(liTag);
  }
}
getStoredScore();

// popup box instruction from Codepen + adjust by myself

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("instruction");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// // // popup box for high scorefrom Codepen + adjust by myself

// Get the modal
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn2 = document.getElementById("show-score");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
btn2.onclick = function() {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}


// start timer onclick start
startBtn.addEventListener("click", function() {
    timerStart = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    questionsEl.classList.remove("hide");
    startBtn.classList.add("hide");
    instructionEl.classList.add("hide");
    renderQuestion();
});



function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      endQuiz();
    }
  }

// render question (work with tutor)

function renderQuestion () {
   
      var getQuestion = questions[currentQuestion];

      var titleEl = document.getElementById("question-is");
      titleEl.textContent = getQuestion.title;
     
      for (var i = 0; i < getQuestion.choices.length; i++) {
        var currentBtn = document.getElementById("choice-" + i);
        currentBtn.textContent = getQuestion.choices[i]
      }
      
}

//check answer 
  
function checkAnswer (index) {
  var getQuestion = questions[currentQuestion];

  var rightOption = index === getQuestion.answer;
  if ( rightOption) {
    currentScore ++;

    goodFeedbackEl.classList.remove("hide");
    setTimeout(() => {
      goodFeedbackEl.classList.add("hide");
    }, 500);

  } else {
    time -= 15;

    badFeedbackEl.classList.remove("hide");
    setTimeout(() => {
      badFeedbackEl.classList.add("hide");
    }, 500);
  }

  currentQuestion ++;

  if (currentQuestion >= questions.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

//******QUESTION********

// end quiz
function endQuiz(){
  
  timerEl.textContent = '';
  clearInterval(timerStart);

  questionsEl.classList.add("hide"); 

  lastPage();

}

function lastPage() {
  resultEl.classList.remove("hide");
  var endScore = document.getElementById("end-score")
  console.log(endScore);
  endScore.textContent = currentScore;
}

function showScore(initial) {
  var singleScore = {
     initial,
     score: currentScore
  }
 
   storeScore.push(singleScore)
 
   var liTag = document.createElement("li");
   liTag.textContent = singleScore.initial + " - " + singleScore.score;
 
   localStorage.setItem("storeScore", JSON.stringify(storeScore));
 
   
   ulEl.appendChild(liTag);
}

function submitScore() {
  var initial = initialEl.value;

  if (initial === "") {
    return;
  } 
  showScore(initial);
}
submitBtn.addEventListener("click", submitScore);

renderQuestion();

