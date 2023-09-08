// Define quiz questions and answers
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2 // Index of the correct choice (Paris)
    },
    // Add more questions here
];

let currentQuestion = 0;

function showQuestion() {
    const questionElement = document.getElementById("question");
    questionElement.textContent = questions[currentQuestion].question;

    const choices = questions[currentQuestion].choices;
    const choiceButtons = document.querySelectorAll(".choice");
    
    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].textContent = choices[i];
    }
}

function checkAnswer(selectedIndex) {
    const resultElement = document.getElementById("result");
    if (selectedIndex === questions[currentQuestion].correct) {
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Wrong! Try again.";
    }

    // Move to the next question
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        resultElement.textContent = "Quiz completed!";
    }
}

// Initial question
showQuestion();
