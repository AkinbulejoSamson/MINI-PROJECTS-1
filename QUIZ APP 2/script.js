const quizData = [
  {
    question: 'How old is Lekan?',
    a: '10',
    b: '14',
    c: '20',
    d: '24',
    correct: 'd'
  },
  {
    question: 'What is the most used programming language?',
    a: 'Python',
    b: 'JavaScript',
    c: 'Java',
    d: 'C',
    correct: 'b'
  },
  {
    question: 'Who is the President of Nigeria?',
    a: 'Buhari',
    b: 'Obasanjo',
    c: 'Osinbajo',
    d: 'Gumi',
    correct: 'a'
  },
  {
    question: 'What is the name of the terror group in Nigeria?',
    a: 'AlQaeda',
    b: 'Boko Haram',
    c: 'All of the above',
    d: 'None of the above',
    correct: 'b'
  },
  {
    question: 'What year was JavaScript launched?',
    a: '1995',
    b: '1996',
    c: '1994',
    d: 'None of the above',
    correct: 'd'
  }
];

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const a_textEl0 = document.getElementById("a_text");
const b_textEl0 = document.getElementById("b_text");
const c_textEl0 = document.getElementById("c_text");
const d_textEl = document.getElementById("d_text");
const submitBtn = document.getElementById("submitBtn");
const answerEls = document.querySelectorAll(".answer");

currentQuiz = 0;
score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_textEl0.innerText = currentQuizData.a;
  b_textEl0.innerText = currentQuizData.b;
  c_textEl0.innerText = currentQuizData.c;
  d_textEl.innerText = currentQuizData.d;
};

submitBtn.addEventListener('click', () => {
  //to check if an answer is selected
  const answer = getSelected();

  if (answer == quizData[currentQuiz].correct) {
    score++;
  }

  if (answer) {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<h2>Your score is ${score}/${quizData.length}</h2><h2>Thanks for participating</h2><button onclick='location.reload()'>Reload</button>`
    }
  };
})

function getSelected() {
  let answer = undefined;

  answerEls.forEach(answerEl => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

function deselectAnswers() {
  answerEls.forEach(answerEl => {
    answerEl.checked = false;
  })
}