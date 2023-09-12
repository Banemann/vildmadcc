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

  // Update the title
  const titleElement = document.getElementById("question");
  titleElement.textContent = `Find: ${mushroom.title}`;

  // Create an array to hold answer options
  const answerOptions = [];

  // Add the correct image URL to answer options
  answerOptions.push(mushroom.profile_image_src);

  // Add some incorrect image URLs to answer options
  const numberOfIncorrectOptions = 3;
  const incorrectImages = [];

  while (incorrectImages.length < numberOfIncorrectOptions) {
    const incorrectIndex = Math.floor(Math.random() * data.length);
    const incorrectImage = data[incorrectIndex].profile_image_src;

    // Avoid duplicate incorrect images
    if (!incorrectImages.includes(incorrectImage) && incorrectImage !== mushroom.profile_image_src) {
      incorrectImages.push(incorrectImage);
      answerOptions.push(incorrectImage);
    }
  }

  // Shuffle the answer options to randomize the correct answer
  shuffleArray(answerOptions);

  // Clear previous options
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  // Create buttons for answer options
  answerOptions.forEach((optionSrc) => {
    const optionButton = document.createElement("button");
    const optionImage = document.createElement("img");
    optionImage.src = optionSrc;
    optionButton.appendChild(optionImage);
    optionButton.addEventListener("click", () => {
      // Disable further clicks on options
      optionsContainer.querySelectorAll("button").forEach((btn) => {
        btn.disabled = true;
      });
      // Handle answer here
      if (optionSrc === mushroom.profile_image_src) {
        optionImage.style.border = "2px solid green"; // Make the correct image green
        correctAnswers++;
      } else {
        // Highlight the correct answer in green
        answerOptions.forEach((btnSrc) => {
          if (btnSrc === mushroom.profile_image_src) {
            const correctOptionImage = optionsContainer.querySelector(`img[src="${btnSrc}"]`);
            correctOptionImage.style.border = "2px solid green";
          }
        });
      }
      setTimeout(() => {
        optionsContainer.querySelectorAll("button").forEach((btn) => {
          btn.disabled = false;
        });
        selectRandomMushroom(data); // Go to the next question
      }, 1000);
      questionsAnswered++;
      updateScore();
    });
    optionsContainer.appendChild(optionButton);
  });
}

// Function to update the score on the webpage
function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `${correctAnswers} ud af ${questionsAnswered}`;
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
