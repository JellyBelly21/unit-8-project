
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
let themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", function() {
   document.body.classList.toggle("dark-mode");
});

// reset button
let resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", function() {
   score = 0;
   scoreDisplay.textContent = score;
   questionCard.classList.add("hidden");
   status.textContent = "";
   resultText.textContent = "";
});


// =====================================================
// STEP 2: Add a click listener to the Get Question button
// =====================================================
// Hint: When the button is clicked:
// 1. Read the category value from categorySelect
// 2. Read the difficulty value from difficultySelect
// 3. Build the URL with template literals:
//    `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`
// 4. Show "Loading..." in the status element
// 5. Call your fetch function (you'll write that in Step 3)
//
// Write your code here:
getQuestionBtn.addEventListener("click", function() {
   let category = categorySelect.value;
   let difficulty = difficultySelect.value;
   let url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;
   
   status.textContent = "Loading...";
   fetchQuestion(url);
});

// =====================================================
// STEP 3: Write the fetch function
// =====================================================
// Hint: Create a function called fetchQuestion(url).
// Inside, use fetch with .then chain to:
// 1. Convert response to JSON
// 2. Get the first question: data.results[0]
// 3. Call displayQuestion (Step 4) with the question data
// 4. Handle errors with .catch
//
// Note: The API returns:
// {
//   results: [
//     {
//       question: "What is...",
//       correct_answer: "answer here",
//       incorrect_answers: ["wrong1", "wrong2", "wrong3"]
//     }
//   ]
// }
//
// Write your code here:
function fetchQuestion(url) {
   fetch(url)
      .then(response => response.json())
      .then(data => {
         let questionData = data.results[0];
         displayQuestion(questionData);
      })
      .catch(error => {
         status.textContent = "Something went wrong. Please try again.";
         console.error("Fetch error:", error);
      });
}


// =====================================================
// STEP 4: Write the display function
// =====================================================
// Hint: Create a function called displayQuestion(questionData).
// Inside:
// 1. Clear the status text
// 2. Show the questionCard (remove "hidden" class)
// 3. Set questionText.textContent to questionData.question
//    (use innerHTML if there are HTML entities like &quot;)
// 4. Combine correct + incorrect answers into one array
// 5. Shuffle them (optional but nicer)
// 6. Clear answersList.innerHTML
// 7. Loop through answers and create a button for each
// 8. Each button should call checkAnswer (Step 5) when clicked
//
// Hint for shuffling: answers.sort(() => Math.random() - 0.5)
//
// Write your code here:

function displayQuestion(questionData) {
   status.textContent = "";
   resultText.textContent = ""; // Clear previous result
   questionCard.classList.remove("hidden");
   
   // Use innerHTML to handle HTML entities (like &quot;)
   questionText.innerHTML = questionData.question;
   
   // Combine correct and incorrect answers using spread operator
   let answers = [questionData.correct_answer, ...questionData.incorrect_answers];
   
   // Shuffle answers
   answers.sort(() => Math.random() - 0.5);
   
   answersList.innerHTML = "";
   answers.forEach(answer => {
      let btn = document.createElement("button");
      btn.textContent = answer;
      btn.classList.add("answer-btn");
      btn.addEventListener("click", function() {
         checkAnswer(answer, questionData.correct_answer, btn);
      });
      answersList.appendChild(btn);
   });
}


// =====================================================
// STEP 5: Write the check answer function
// =====================================================
// Hint: Create a function called checkAnswer(picked, correct, buttonClicked).
// Inside:
// 1. If picked === correct, show "Correct!" in green
//    - Increment score and update scoreDisplay
//    - Add "correct" class to the buttonClicked
// 2. Else, show "Wrong! The answer was: [correct]" in red
//    - Add "wrong" class to buttonClicked
//    - Find the correct button and add "correct" class to it
// 3. Disable all answer buttons so they can only answer once
//
// Hint to disable all buttons:
// document.querySelectorAll(".answer-btn").forEach(btn => btn.disabled = true);
//
// Write your code here:
function checkAnswer(picked, correct, buttonClicked) {
   if (picked === correct) {
      resultText.textContent = "Correct!";
      resultText.style.color = "green";
      score++;
      scoreDisplay.textContent = score;
      buttonClicked.classList.add("correct");
   } else {
      resultText.textContent = `Wrong! The answer was: ${correct}`;
      resultText.style.color = "red";
      buttonClicked.classList.add("wrong");
   }

   // Disable all buttons and highlight the correct one if user was wrong
   document.querySelectorAll(".answer-btn").forEach(btn => {
      if (btn.textContent === correct) {
         btn.classList.add("correct");
      }
      btn.disabled = true;
   });
}

// =====================================================
// BONUS CHALLENGES (Pick at least 1)
// =====================================================
//
// BONUS 1: Loading spinner
// Add a loading message or spinner during the fetch.
// You can add CSS animation or just text like "Loading..."
//
//
// BONUS 2: Streak counter
// Track consecutive correct answers. Show "Streak: 3!"
// when they get 3 in a row.
//
//
// BONUS 3: Reset button
// Add a button that resets the score to 0 and hides the
// question card.
//
//
// BONUS 4: Question count
// Track total questions asked (correct + wrong) and show
// "Score: X / Y" instead of just "X correct"



// =====================================================
// DONE! Save and open index.html.
// Test:
// - Pick a category and difficulty
// - Click "Get a Question"
// - You should see a real trivia question with answer choices
// - Clicking an answer shows correct/wrong feedback
// - Score updates when you get one right
//
// You're calling a REAL LIVE API. \ud83c\udf10
// =====================================================


