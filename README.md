Final Project Unit 12: Java Script unit 8 Trivia Game with Upgrades
Created by Gabriel Ostroff
Description: I chose the Unit 8 Trivia Game because I wanted to add more features such as, a dark mode and a reset button.

Upgrades: I added a dark mode toggle button and a reset button.

# Trivia Challenge - Unit 8 Project

Your Unit 8 project! You're going to build a real, live API-powered web app.

## Getting Started

1. **Clone this repo** to your computer
2. Open the folder in your editor
3. Open `index.html` in a browser

The HTML and CSS are already built. Your job is to wire up the JavaScript to call the trivia API.

## What You're Building

A **Trivia Challenge** app where:
- User picks a category and difficulty from dropdowns
- Clicks "Get a Question"
- Your code fetches a real trivia question from the Open Trivia DB API
- The question and 4 possible answers appear
- User clicks an answer
- App shows if they were right or wrong
- Score updates after each correct answer

### Or build something else!

You can build your own API-powered app instead. Some fun free APIs (no API key needed):

| API | What it does | URL |
|---|---|---|
| Dog API | Random dog images | https://dog.ceo/api/breeds/image/random |
| Cat API | Random cat facts | https://catfact.ninja/fact |
| Joke API | Random jokes | https://official-joke-api.appspot.com/random_joke |
| iTunes | Music search | https://itunes.apple.com/search?term=adele |
| Pokemon | Pokemon info | https://pokeapi.co/api/v2/pokemon/pikachu |
| Google Books | Book search | https://www.googleapis.com/books/v1/volumes?q=harry+potter |
| Bored API | Random activity ideas | https://www.boredapi.com/api/activity |

If you build your own, just make sure your project still hits all the requirements:
- Uses `fetch()` to call a real API
- Uses user input to build a dynamic URL or query
- Displays 3+ pieces of data from the response
- Handles errors with `.catch`
- Uses at least 2 different events

## Files

- `index.html` — done for you, has dropdowns, button, and card structure
- `css/styles.css` — done for you, includes hidden card support + answer styling
- `js/script.js` — has 5 numbered steps with hints + 4 bonus options
- `README.md` — what you're reading right now

## What You'll Use

- **`fetch()`** to call the API
- **`.then()`** to handle the response
- **`.catch()`** to handle errors
- **Template literals** to build dynamic URLs
- **`createElement`** to make answer buttons (Unit 6)
- **`addEventListener`** for click events
- **DOM manipulation** to display data
- **Dot notation + array access** to get data from the JSON response

## Stuck?

1. Open the browser console (F12) — your fetch errors live there
2. `console.log(data)` is your best friend. Always log the data first to see its structure
3. If you see `undefined`, you're probably accessing the wrong property name
4. CORS error? The API might not allow browser requests. Try a different API
5. Page not updating? Did you actually call the function? Did you target the right element id?
6. Go back to your Unit 8 codealong file and student handout

## When You're Done

Open your index.html and test:
- ✅ Picking different categories works
- ✅ Picking different difficulties works
- ✅ Click "Get a Question" loads a question from the API
- ✅ Clicking a wrong answer shows red, the correct one shows green
- ✅ Clicking the correct answer increments the score
- ✅ Errors are handled (try disconnecting wifi and clicking the button)

🌐 You're calling a real, live API on the internet. This is real software!

Have fun! 🚀
