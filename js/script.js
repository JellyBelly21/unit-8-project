
// varables for all DOM elements
let categorySelect = document.getElementById("categorySelect");
let difficultySelect = document.getElementById("difficultySelect");
let getQuestionBtn = document.getElementById("getQuestionBtn");
let status = document.getElementById("status");
let questionCard = document.getElementById("questionCard");
let questionText = document.getElementById("questionText");
let answersList = document.getElementById("answersList");
let resultText = document.getElementById("resultText");
let scoreDisplay = document.getElementById("scoreDisplay");

let score = 0;// sets initial score to 0

// dark mode toggle
let themeBtn = document.getElementById("themeBtn");// click event listener that toggles dark mode class on the body
themeBtn.addEventListener("click", function() {// toggles the "dark-mode" class on the body element to switch themes
   document.body.classList.toggle("dark-mode");// changes the button text based on the current theme
});

// reset button function
let resetBtn = document.getElementById("resetBtn"); // click event listener that resets the quiz
resetBtn.addEventListener("click", function() {
   score = 0; // sets score to 0 
   scoreDisplay.textContent = score;// updates score display
   questionCard.classList.add("hidden");   // hides question card
   status.textContent = ""; // clears status text
   resultText.textContent = ""; // clears result text
});

// get question button function
getQuestionBtn.addEventListener("click", function() { // click event listener that fetches a question
   let category = categorySelect.value;  // selected category
   let difficulty = difficultySelect.value; // selected difficulty
   let url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;// sets the status text to "Loading..." while the question is being fetched
   status.textContent = "Loading...";  // show loading status
   fetchQuestion(url);// calls the fetchQuestion function with the constructed URL
});

// fetches question function
function fetchQuestion(url) {
   fetch(url)  // fetches the question from the API
      .then(response => response.json()) // converts the response to JSON
      .then(data => {// checks if the API returned a question
         let questionData = data.results[0]; // gets the first question from the results array
         displayQuestion(questionData);// calls the displayQuestion function to show the question and answers
      })
      // handles any errors that occur during the fetch process
      .catch(error => {// sets the status text to an error message if something goes wrong during the fetch
         status.textContent = "Something went wrong. Please try again.";
         console.error("Fetch error:", error);   // logs the error to the console for debugging purposes
      });
}

// displays question and answers on the page
function displayQuestion(questionData) {
   status.textContent = ""; // Clear any previous status messages
   resultText.textContent = ""; // Clear previous result text
   questionCard.classList.remove("hidden"); // Show the question card
   questionText.innerHTML = questionData.question; // Set the question text (using innerHTML to render any HTML entities)
   let answers = [questionData.correct_answer, ...questionData.incorrect_answers];// Combine correct and incorrect answers into one array
   answers.sort(() => Math.random() - 0.5);// Shuffle the answers array to randomize the order of answer choices
   answersList.innerHTML = "";// Clear previous answer buttons
   answers.forEach(answer => { // Loop through each answer in the shuffled array
      let btn = document.createElement("button");// Create a button element for each answer
      btn.textContent = answer; // Set the button text to the answer
      btn.classList.add("answer-btn");// Add a class for styling
      btn.addEventListener("click", function() {// Add click event listener to each answer button
         checkAnswer(answer, questionData.correct_answer, btn);// Call the checkAnswer function with the picked answer, correct answer, and the button that was clicked
      });
      answersList.appendChild(btn);// Add the button to the answers list in the DOM
   });
}

// This function checks if the user's picked answer is correct and updates the UI accordingly
function checkAnswer(picked, correct, buttonClicked) {// compares the picked answer with the correct answer
   if (picked === correct) {// if the picked answer is correct
      resultText.textContent = "Correct!";// shows "Correct!" in the result text element
      resultText.style.color = "green";// sets the result text color to green
      score++;// increments the score by 1
      scoreDisplay.textContent = score;// updates the score display with the new score
      buttonClicked.classList.add("correct");// adds the "correct" class to the button that was clicked for styling
   } else {// if the picked answer is wrong
      resultText.textContent = `Wrong! The answer was: ${correct}`;// shows "Wrong! The answer was: [correct]" in the result text element
      resultText.style.color = "red";// sets the result text color to red
      buttonClicked.classList.add("wrong");// adds the "wrong" class to the button that was clicked for styling
   }
   
   // After an answer is selected, we want to disable all answer buttons and highlight the correct answer
   document.querySelectorAll(".answer-btn").forEach(btn => {// selects all elements with the class "answer-btn" and iterates over them
      if (btn.textContent === correct) {// if the button's text matches the correct answer
         btn.classList.add("correct");// adds the "correct" class to highlight the correct answer
      }
      btn.disabled = true;// disables the button to prevent further clicks after an answer has been selected
   });
};