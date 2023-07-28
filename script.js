// Quiz Questions
const quiz = [
    {
      question: "Which command will generate a new Angular component?",
      choices: ["A.component", "B.generate component", "C.new component", "D.Both A and B"],
      answer: "D. Both A and B"
    },
    {
      question: "Which library is used for state management in React?",
      choices: ["A.Redux", "B.React-Redux", "C.React-router-dom", "D.Both A and B"],
      answer: "D. Both A and B"
    },
    {
      question: "What is Node.js?",
      choices: ["A.A server-side platform", "B.A JavaScript runtime built on Chrome's V8 JavaScript engine", "C.An open source server environment.", "D. All of the above"],
      answer: "D. All of the above"
    }
  ];
  
  // Quiz Timer in seconds
  const quizTime = 30;
  let timer = null;
  
  // High Scores Array
  let highScores = [];
  
  // Start The Quiz
  function startQuiz() {
    // Hides The Start Button and Initials Input
    document.querySelector("button").style.display = "none";
    document.querySelector("input").style.display = "none";
  
    // Displays Quiz Questions and Choices
    let quizHtml = "";
    for (let i = 0; i < quiz.length; i++) {
      quizHtml += "<p>" + quiz[i].question + "</p>";
      for (let j = 0; j < quiz[i].choices.length; j++) {
        quizHtml += "<input type='radio' name='q" + i + "' value='" + quiz[i].choices[j] + "'>" + quiz[i].choices[j] + "<br>";
      }
    }
    document.querySelector("#quiz").innerHTML = quizHtml;
  
    // Show the submit button
    document.querySelector("#submitQuiz").style.display = "";
  
    // Start Quiz Timer
    let timeLeft = quizTime;
    timer = setInterval(function() {
      document.querySelector("#score").innerHTML = "Time left: " + timeLeft;
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timer);
        submitQuiz();
      }
    }, 1000);
  }
  
  // Submits The Quiz and Display The Score
  function submitQuiz() {
    // Get's The User's Initials
    let initials = document.querySelector("#initials").value;
    let score = 0;
    for (let i = 0; i < quiz.length; i++) {
      let selected = document.querySelector("input[name='q" + i + "']:checked");
      if (selected && selected.value === quiz[i].answer) {
        score++;
      }
    }
  
    // Saves The User's Score Locally 
    highScores.push({initials: initials, score: score});
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    // Display The Score
    document.querySelector("#score").innerHTML = "Your score is " + score + " out of " + quiz.length;
  
    // Clear quiz and the timer without hiding the user's score
    document.querySelector("#quiz").innerHTML = '';
    clearInterval(timer);
  }
  
  // Loads The High Scores From Local Storage
  if (localStorage.getItem("highScores")) {
    highScores = JSON.parse(localStorage.getItem("highScores"));
  }
  