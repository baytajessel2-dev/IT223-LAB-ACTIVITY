// Quiz Questions Data - Web Systems & Technology
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correct: 0
    },
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"],
        correct: 1
    },
    {
        question: "What is the purpose of a web browser?",
        options: ["To store files", "To display web pages", "To create websites", "To send emails"],
        correct: 1
    },
    {
        question: "What does HTTP stand for?",
        options: ["HyperText Transfer Protocol", "High Tech Transfer Protocol", "HyperText Transmission Protocol", "High Transfer Text Protocol"],
        correct: 0
    },
    {
        question: "What is the correct HTML element for the largest heading?",
        options: ["<heading>", "<h6>", "<h1>", "<head>"],
        correct: 2
    },
    {
        question: "What does URL stand for?",
        options: ["Universal Resource Link", "United Resource Location", "Uniform Resource Locator", "Universal Reference Link"],
        correct: 2
    },
    {
        question: "What is the function of a web server?",
        options: ["To display websites", "To store and serve web pages", "To create graphics", "To scan for viruses"],
        correct: 1
    },
    {
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Query Logic", "Standard Query Link", "System Quality Language"],
        correct: 0
    }
];

// Game State
let currentQuestion = 0;
let score = 0;
let answered = false;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const scoreScreen = document.getElementById('score-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const questionCounter = document.getElementById('question-counter');
const finalScore = document.getElementById('final-score');
const scoreMessage = document.getElementById('score-message');

// Start Quiz
function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

// Load Question
function loadQuestion() {
    answered = false;
    const question = questions[currentQuestion];
    
    questionText.textContent = question.question;
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    // Update progress bar
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Create options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    nextBtn.disabled = true;
}

// Select Answer
function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;
    
    const question = questions[currentQuestion];
    const options = optionsContainer.querySelectorAll('.option');
    
    // Mark selected answer
    options[selectedIndex].classList.add('selected');
    
    // Check if correct
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        score++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }
    
    // Disable all options
    options.forEach(option => {
        option.style.cursor = 'default';
    });
    
    nextBtn.disabled = false;
}

// Next Question
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

// Show Score
function showScore() {
    quizScreen.classList.add('hidden');
    scoreScreen.classList.remove('hidden');
    
    const percentage = (score / questions.length) * 100;
    finalScore.textContent = `${score}/${questions.length}`;
    
    // Set message based on score
    if (percentage === 100) {
        scoreMessage.textContent = "Perfect! You're a tech genius! 🎉";
    } else if (percentage >= 80) {
        scoreMessage.textContent = "Excellent! Great knowledge! 🌟";
    } else if (percentage >= 60) {
        scoreMessage.textContent = "Good work! Keep learning! 👍";
    } else if (percentage >= 40) {
        scoreMessage.textContent = "Not bad! Study more! 💪";
    } else {
        scoreMessage.textContent = "Keep practicing! You'll improve! 📚";
    }
}

// Restart Quiz
function restartQuiz() {
    scoreScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}