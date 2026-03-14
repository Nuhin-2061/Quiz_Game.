//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "I have keys but no locks, space but no room. You can enter but can't go outside. What am I?",
    answers: [
      { text: "House", correct: false },
      { text: "Car", correct: false },
      { text: "Phone", correct: false },
      { text: "Keyboard", correct: true },
    ],
  },
  {
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    answers: [
      { text: "Letter A", correct: false },
      { text: "Letter M", correct: true },
      { text: "Letter O", correct: false },
      { text: "Letter T", correct: false },
    ],
  },
  {
    question: "Which month has 28 days?",
    answers: [
      { text: "February", correct: false },
      { text: "January", correct: false },
      { text: "All months", correct: true },
      { text: "March", correct: false },
      
    ],
  },
  {
    question: "If you drop a red stone into the blue sea, what will it become?",
    answers: [
      { text: "Red", correct: false },
      { text: "Wet", correct: true },
      { text: "Blue", correct: false },
      { text: "Heavy", correct: false },
    ],
  },
  {
    question: "I can fly without wings and cry without eyes. What am I?",
    answers: [
      { text: "Wind", correct: false },
      { text: "Bird", correct: false },
      { text: "Cloud", correct: true },
      { text: "Kite", correct: false },
    ],
  },
  {
    question: "The more you take away from me, the bigger I get. What am I?",
    answers: [
      { text: "Balloon", correct: false },
      { text: "Hole", correct: true },
      { text: "Shadow", correct: false },
      { text: "Water", correct: false },
    ],
  },
  {
    question: "I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?",
    answers: [
      { text: "Wind chime", correct: false },
      { text: "Song", correct: false },
      { text: "Whistle", correct: false },
      { text: "Echo", correct: true },
    ],
  },
  {
    question: "I have cities but no houses, forests but no trees, and rivers but no water. What am I?",
    answers: [
      { text: "Atlas", correct: false },
      { text: "Map", correct: true },
      { text: "Globe", correct: false },
      { text: "Puzzle", correct: false },
    ],
  },
  {
    question: "I’m tall when I’m young and short when I’m old. What am I?",
    answers: [
      { text: "Candle", correct: true },
      { text: "Tree", correct: false },
      { text: "Pencil", correct: false },
      { text: "Stick", correct: false },
    ],
  },
  {
    question: "The more you take me, the more you leave behind. What am I?",
    answers: [
      { text: "Time", correct: false },
      { text: "Shadow", correct: false },
      { text: "Footsteps", correct: true },
      { text: "Memories", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz() {

  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if(button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}


function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}


function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
