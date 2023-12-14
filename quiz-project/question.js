function Question(questionText, answerOptions, correctAnswer) {
  this.questionText = questionText;
  this.answerOptions = answerOptions;
  this.correctAnswer = correctAnswer;
}

Question.prototype.checkTheAnswer = function (answer) {
  return answer === this.correctAnswer;
};

let questions = [
  new Question(
    "1-Which is a programming language?",
    { a: "HTML", b: "CSS", c: "JavaScript" },
    "c"
  ),
  new Question(
    "2-Which one is not a framework?",
    { a: ".NET", b: "React", c: "Django" },
    "b"
  ),
  new Question(
    "3-Which one has relation with back-end?",
    { a: "SQL", b: "Sass", c: "Bootstrap" },
    "a"
  ),
  new Question(
    "4-Which one has relation with front-end?",
    { a: "ASP.NET", b: "Next.js", c: "Java" },
    "b"
  ),
  new Question(
    "5-Which one has relation with JavaScript and DOM",
    { a: "JQuery", b: "C++", c: "VisualStudio" },
    "a"
  ),
];
