fetch('https://hgxphlvxhzinnokdclkh.supabase.co/rest/v1/Data?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhneHBobHZ4aHppbm5va2RjbGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5OTAyMDcsImV4cCI6MjAwOTU2NjIwN30.rxRj6VAFxUXkCNfe8DMj0SidSXcKpBTLtSL9CAElxMU')
  .then(response => response.json())
  .then(data => {
    // Call the function to start the game with the fetched data
    startGame(data);
  });

let correctAnswers = 0;
let questionsAnswered = 0;

// Function to start the game
function startGame(data) {
  selectRandomMushroom(data);
}

// Function to select a random mushroom and update the game
function selectRandomMushroom(data) {
  // Get a random index from the data array
  const randomIndex = Math.floor(Math.random() * data.length);
  const mushroom = data[randomIndex];

  // Update the image source
  const imageElement = document.getElementById("quiz-image");
  imageElement.src = mushroom.profile_image_src;

  // Create an array to hold answer options
  const answerOptions = [];

  // Add the correct title to answer options
  answerOptions.push(mushroom.title);

  // Add some incorrect titles to answer options
  const numberOfIncorrectOptions = 3;
  const incorrectTitles = [];

  while (incorrectTitles.length < numberOfIncorrectOptions) {
    const incorrectIndex = Math.floor(Math.random() * data.length);
    const incorrectTitle = data[incorrectIndex].title;

    // Avoid duplicate incorrect titles
    if (!incorrectTitles.includes(incorrectTitle) && incorrectTitle !== mushroom.title) {
      incorrectTitles.push(incorrectTitle);
      answerOptions.push(incorrectTitle);
    }
  }

  // Shuffle the answer options to randomize the correct answer
  shuffleArray(answerOptions);

  // Clear previous options
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  // Create buttons for answer options
  answerOptions.forEach((optionText) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = optionText;
    optionButton.addEventListener("click", () => {
      // Handle answer here
      if (optionText === mushroom.title) {
        correctAnswers++;
        displayResult("Rigtigt!");
      } else {
        displayResult(`Forkert! Det var en: ${mushroom.title}`);
      }
      questionsAnswered++;
      updateScore();
      selectRandomMushroom(data); // Go to the next question
    });
    optionsContainer.appendChild(optionButton);
  });
}

// Function to update the score on the webpage
function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `${correctAnswers} ud af ${questionsAnswered}`;
}

// Function to display the result on the webpage
function displayResult(resultText) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = resultText;
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
