
<<<<<<< HEAD
   Your mission: Build a live web app that uses a real API.

   The default scaffold is a Trivia Challenge using the
   Open Trivia DB API. The user picks a category and
   difficulty, you fetch a question, they pick an answer,
   you tell them if they're right.

   You can also build YOUR OWN API-powered app. Some ideas:
   - Random dog/cat image generator
   - Weather lookup tool (use wttr.in, no key needed)
   - Joke or quote of the day
   - Music search (iTunes API)
   - Book search (Google Books API)
   - Pokemon lookup (PokeAPI)

   Requirements:
   - Use fetch() to call a real API
   - Use user input to build a dynamic URL (or pass query params)
   - Display 3+ pieces of data from the response
   - Handle errors with .catch (or check data.status)
   - Use at least 2 different events
   ===================================================== */

// =====================================================
// STEP 1: Grab the elements you need
// =====================================================
// Hint: Use getElementById for:
// - categorySelect (the category dropdown)
// - difficultySelect (the difficulty dropdown)
// - getQuestionBtn (the button)
// - status (the loading/error message paragraph)
// - questionCard (the card div, starts hidden)
// - questionText (where the question goes)
// - answersList (where the answer buttons go)
// - resultText (where "Correct!" or "Wrong!" appears)
// - scoreDisplay (the score number)
//
// Also create a score variable starting at 0.
//
// Write your code here:
=======
// Variables for DOM elements
>>>>>>> 7ab6295242e1a04fbcf07554198359ee35ac6c39
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

// Dark mode toggle button
let themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", function() { 
   // Switch between light and dark themes on the body
   document.body.classList.toggle("dark-mode");
});

// Reset button event handler
let resetBtn = document.getElementById("resetBtn"); 
resetBtn.addEventListener("click", function() {
   score = 0; 
   scoreDisplay.textContent = score; // Reset score display
   questionCard.classList.add("hidden"); // Hide the question card
   status.textContent = ""; // Clear any status or loading text
   resultText.textContent = ""; // Clear the previous result message
});

// Get question button event handler
getQuestionBtn.addEventListener("click", function() { 
   let category = categorySelect.value;  // Get selected category ID
   let difficulty = difficultySelect.value; // Get selected difficulty level
   
   // URL configured to fetch 1 multiple-choice question based on selection
   let url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;
   
   status.textContent = "Loading..."; // Show loading status while fetching
   fetchQuestion(url); // Call function to fetch the data
});

// Fetches the question from the API
function fetchQuestion(url) {
   fetch(url) 
      .then(response => response.json()) // Convert response stream to JSON
      .then(data => {
         let questionData = data.results[0]; // Get the first question object from results
         displayQuestion(questionData); // Pass the data to the display function
      })
      .catch(error => {
         // Show error status to the user and log the details for debugging
         status.textContent = "Something went wrong. Please try again.";
         console.error("Fetch error:", error);   
      });
}

// Renders the question and creates answer buttons
function displayQuestion(questionData) {
   status.textContent = ""; // Clear loading status
   resultText.textContent = ""; // Clear previous correct/wrong message
   questionCard.classList.remove("hidden"); // Show the question card container
   
   // Sets question text (using innerHTML because the API returns HTML entities like &quot;)
   questionText.innerHTML = questionData.question; 
   
   // Combine correct and incorrect answers into a single array
   let answers = [questionData.correct_answer, ...questionData.incorrect_answers];
   
   // Shuffle the answers array so the correct answer isn't always in the same spot
   answers.sort(() => Math.random() - 0.5); 
   
   answersList.innerHTML = ""; // Clear any previous answer buttons
   answers.forEach(answer => { 
      let btn = document.createElement("button"); 
      btn.textContent = answer; 
      btn.classList.add("answer-btn"); // Add class for styling
      
      btn.addEventListener("click", function() { 
         // Check if clicked answer is correct
         checkAnswer(answer, questionData.correct_answer, btn);
      });
      answersList.appendChild(btn); // Add the button to the answers list in the DOM
   });
}

// Validates the chosen answer and updates the UI
function checkAnswer(picked, correct, buttonClicked) {
   // Compare the picked answer with the correct answer
   if (picked === correct) {
      resultText.textContent = "Correct!";
      resultText.style.color = "green";
      score++; // Increment score
      scoreDisplay.textContent = score; // Update score display
      buttonClicked.classList.add("correct"); // Highlight selected button green
   } else {
      resultText.textContent = `Wrong! The answer was: ${correct}`; 
      resultText.style.color = "red";
      buttonClicked.classList.add("wrong"); // Highlight selected button red
   }

   // Disable all buttons to prevent multiple clicks, and highlight the correct answer
   document.querySelectorAll(".answer-btn").forEach(btn => { 
      if (btn.textContent === correct) { 
         btn.classList.add("correct"); // Ensure the correct answer is always highlighted green
      }
      btn.disabled = true; // Lock the button
   });
}
