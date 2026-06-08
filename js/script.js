
// varables for DOM elements
let categorySelect = document.getElementById("categorySelect");
let difficultySelect = document.getElementById("difficultySelect");
let getQuestionBtn = document.getElementById("getQuestionBtn");
let status = document.getElementById("status");
let questionCard = document.getElementById("questionCard");
let questionText = document.getElementById("questionText");
let answersList = document.getElementById("answersList");
let resultText = document.getElementById("resultText");
let scoreDisplay = document.getElementById("scoreDisplay");

let score = 0;

// dark mode toggle
let themeBtn = document.getElementById("themeBtn");// click that toggles dark mode
themeBtn.addEventListener("click", function() { // switch between light and dark themes
   document.body.classList.toggle("dark-mode");// changes the button text
});

// reset button function
let resetBtn = document.getElementById("resetBtn"); //click that resets the quiz
resetBtn.addEventListener("click", function() {// resets the quiz
   score = 0; 
   scoreDisplay.textContent = score;// updates score display
   questionCard.classList.add("hidden");   // hides question card
   status.textContent = ""; // clears status text
   resultText.textContent = ""; // clears result text
});

// get question button function
getQuestionBtn.addEventListener("click", function() { // fetches question
   let category = categorySelect.value;  // selected category
   let difficulty = difficultySelect.value; // selected difficulty
   let url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;// sets text while question is being fetched
   status.textContent = "Loading...";  // show loading status
   fetchQuestion(url);// calls function with URL
});

// fetch question function
function fetchQuestion(url) {
   fetch(url)  // fetches API
      .then(response => response.json()) // converts response to JSON
      .then(data => {// checks if API returned a question
         let questionData = data.results[0]; // gets first question from results array
         displayQuestion(questionData);// calls function to show question and answers
      })
      // handles errors during fetch process
      .catch(error => {// sets text to an error message if something goes wrong
         status.textContent = "Something went wrong. Please try again.";// shows error status
         console.error("Fetch error:", error);   // logs error for debugging purposes
      });
}

// displays question and answers
function displayQuestion(questionData) {
   status.textContent = ""; // Clear status messages
   resultText.textContent = ""; // Clear result text
   questionCard.classList.remove("hidden"); // Show question card
   questionText.innerHTML = questionData.question; // Sets question text (render any HTML entities)
   let answers = [questionData.correct_answer, ...questionData.incorrect_answers];// Combine correct and incorrect answers into one array
   answers.sort(() => Math.random() - 0.5); // Shuffle the answers array to randomize button order
   answersList.innerHTML = "";// Clear answer buttons
   answers.forEach(answer => { // Loop through each answer in shuffled array
      let btn = document.createElement("button"); // Create a button element for each answer
      btn.textContent = answer; // Set the button text to the answer
      btn.classList.add("answer-btn");// Adds class for styling
      btn.addEventListener("click", function() { // Add click event listener to each answer button
         checkAnswer(answer, questionData.correct_answer, btn);// Call the checkAnswer function
      });
      answersList.appendChild(btn); // Add the button to the answers list in the DOM
   });
}

// check answer function
function checkAnswer(picked, correct, buttonClicked) {// compares picked answer with correct answer
   if (picked === correct) {// if picked answer is correct
      resultText.textContent = "Correct!";// shows "Correct!" in text
      resultText.style.color = "green";// result text is green
      score++;// increases score by 1
      scoreDisplay.textContent = score ;// updates score with the new score
      buttonClicked.classList.add("correct"); // adds "correct" class to button clicked for styling
   } else {// if picked answer is wrong
      resultText.textContent = `Wrong! The answer was: ${correct}`; // shows "Wrong! in text
      resultText.style.color = "red";//result text color red
      buttonClicked.classList.add("wrong"); // adds "wrong" class to button clicked for styling
   }

   // disable all buttons and highlight correct answer
   document.querySelectorAll(".answer-btn").forEach(btn => { // loops through all answer buttons
      if (btn.textContent === correct) { // checks if button text matches correct answer
         btn.classList.add("correct"); // adds "correct" class to correct answer button for styling
      }
      btn.disabled = true;// disables button
   });
};