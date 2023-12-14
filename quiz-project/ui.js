function UI() {
  (this.btn_start = document.querySelector(".btn-start")),
    (this.quiz_box = document.querySelector(".quiz-box")),
    (this.score_box = document.querySelector(".score-box")),
    (this.next = document.getElementById("next")),
    (this.questionText = document.querySelector(".question_text")),
    (this.option_list = document.querySelector(".option_list")),
    (this.correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>'),
    (this.incorrectIcon =
      '<div class="icon"><i class="fas fa-times"></i></div>'),
    (this.tryAgain = document.getElementById("tryAgain")),
    (this.fnshQuiz = document.getElementById("fnshQuiz")),
    (this.timeText = document.querySelector(".timer_text")),
    (this.timeSecond = document.querySelector(".time_second")),
    (this.timeLine = document.querySelector(".time_line"));
}

UI.prototype.showQuestion = function (soru) {
  let question = `<span>${soru.questionText}</span>`;
  let options = ``;
  for (let answer in soru.answerOptions) {
    options += `
            <div class="option">
                <span><b>${answer}</b>: ${soru.answerOptions[answer]}</span>
            </div>
            `;
  }

  this.questionText.innerHTML = question;
  this.option_list.innerHTML = options;
  const option = this.option_list.querySelectorAll(".option");

  for (let opt of option) {
    opt.setAttribute("onClick", "optionSelected(this)");
  }
};

UI.prototype.showScore = function (totalQuestions, correctAnswer) {
  let tag = `<p class="scoreBoxText">You answered <span id="correct-answer">${correctAnswer}</span> out of <span id="total-questions">${totalQuestions}</span> questions correctly in total.</p>`;
  document.querySelector(".score-box .score-text").innerHTML = tag;
};
