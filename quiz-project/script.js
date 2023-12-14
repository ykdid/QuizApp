let score = 0;

function updateScore(isCorrect) {
  if (isCorrect) {
    score++;
  }

  document.getElementById("scoreValue").textContent = score;
}

const ui = new UI();
const quiz = new Quiz(questions);

ui.btn_start.addEventListener("click", function () {
  ui.quiz_box.classList.add("active");
  ui.showQuestion(quiz.getQuestion());
  ui.next.classList.remove("show");
  timeStarter(10);
  startTimerLine();
});
ui.next.addEventListener("click", function () {
  if (quiz.questions.length != quiz.questionIndex + 1) {
    quiz.questionIndex++;
    ui.showQuestion(quiz.getQuestion());
    ui.next.classList.remove("show");
    if (quiz.questions.length == quiz.questionIndex + 1)
      ui.next.textContent = "Finish Quiz";
    clearInterval(counter);
    timeStarter(10);
    clearInterval(counterLine);
    startTimerLine();
  } else {
    console.log("quiz is over");
    ui.quiz_box.classList.remove("active");
    ui.score_box.classList.add("active");
    clearInterval(counter);
    ui.showScore(quiz.questions.length, quiz.numberOfCorrectAns);
  }
});

function optionSelected(option) {
  clearInterval(counter);
  clearInterval(counterLine);
  let soru = quiz.getQuestion();
  let cevap = option.querySelector("span b").textContent;

  if (soru.checkTheAnswer(cevap)) {
    quiz.numberOfCorrectAns++;
    option.classList.add("correct");
    option.insertAdjacentHTML("beforeend", ui.correctIcon);
    updateScore(true);
  } else {
    option.classList.add("incorrect");
    option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    updateScore(false);
  }

  for (let i = 0; i < ui.option_list.children.length; i++) {
    ui.option_list.children[i].classList.add("disabled");
  }

  ui.next.classList.add("show");
}

document.addEventListener("DOMContentLoaded", function () {
  const questionIndexElement = document.querySelector(".question-index span");

  function updateQuestionIndex() {
    const currentIndex = quiz.questionIndex + 1;
    const totalQuestions = questions.length;

    if (currentIndex === totalQuestions + 1) {
      document.querySelector("#next").style.display = "none";
    } else {
      document.querySelector("#next").style.display = "block";
    }
    questionIndexElement.textContent = `${quiz.questionIndex + 1}/${
      questions.length
    }`;
  }

  updateQuestionIndex();

  ui.btn_start.addEventListener("click", function () {
    document.querySelector(".quiz-box").classList.add("active");
    ui.showQuestion(quiz.getQuestion());
    updateQuestionIndex();
  });

  ui.next.addEventListener("click", function () {
    if (quiz.questions.length != quiz.questionIndex) {
      ui.showQuestion(quiz.getQuestion());
      updateQuestionIndex();
    } else {
      console.log("quiz is over");
      console.log("Final Score: ", score);
      ui.score_box.classList.add("active");
      updateQuestionIndex();
      ui.showScore(quiz.questions.length, quiz.numberOfCorrectAns);
    }
  });
});

ui.fnshQuiz.addEventListener("click", function () {
  window.location.reload();
});

ui.tryAgain.addEventListener("click", function () {
  quiz.questionIndex = 0;
  quiz.numberOfCorrectAns = 0;
  score = 0;
  clearInterval(counter);
  clearInterval(counterLine);
  ui.timeText.textContent = "Remain: ";
  ui.timeSecond.textContent = "10";
  document.querySelector("#scoreValue").textContent = score;
  ui.btn_start.click();
  ui.score_box.classList.remove("active");
  ui.next.textContent = "Next";
});

let counter;
function timeStarter(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    ui.timeSecond.textContent = time;
    time--;

    if (time == -1) {
      ui.timeText.textContent = "Time Over";
      ui.timeSecond.textContent = " ";
    }
    if (time < -1) {
      alert("Time Over!");
      clearInterval(counter);
      for (let i = 0; i < ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled");
      }
      ui.next.classList.add("show");
      console.log("quiz is over");
      ui.quiz_box.classList.remove("active");
      ui.score_box.classList.add("active");
      clearInterval(counter);
      ui.showScore(quiz.questions.length, quiz.numberOfCorrectAns);
    }
  }
}

const darkModeToggleBtn = document.querySelector(".btn-toggle-dark-mode");
darkModeToggleBtn.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

let counterLine;
function startTimerLine() {
  let line_width = 0;

  counterLine = setInterval(timer, 100);

  function timer() {
    line_width += 5;
    ui.timeLine.style.width = line_width + "px";

    if (line_width > 548) {
      clearInterval(counterLine);
    }
  }
}
