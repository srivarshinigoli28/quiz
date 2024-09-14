document.addEventListener('DOMContentLoaded', function() {
    const quizData = [
        {
            question: "What is the time complexity of binary search in a sorted array?",
            options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
            answer: 1
        },
        {
            question: "Which data structure is used for implementing LRU Cache?",
            options: ["Stack", "Queue", "Hash Map", "Linked List"],
            answer: 2
        },
        {
            question: "What is the worst-case time complexity of QuickSort?",
            options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
            answer: 2
        },
        {
            question: "Which data structure uses LIFO (Last In First Out) principle?",
            options: ["Queue", "Stack", "Deque", "Priority Queue"],
            answer: 1
        },
        {
            question: "What is the space complexity of MergeSort?",
            options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
            answer: 0
        },
        {
            question: "What is the time complexity of a hash table insert operation?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 0
        },
        {
            question: "Which of the following is not a type of linked list?",
            options: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Hash Linked List"],
            answer: 3
        },
        {
            question: "In a binary tree, how many child nodes can a node have?",
            options: ["One", "Two", "Three", "Any number"],
            answer: 1
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let attempt = 0;
    let bestScores = [];
    let currentQuizData = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function getRandomQuestions() {
        const shuffled = [...quizData];
        shuffleArray(shuffled);
        return shuffled.slice(0, 4);
    }

    function loadQuestion() {
        const data = currentQuizData[currentQuestionIndex];
        document.getElementById('question').textContent = data.question;

        const optionsList = document.getElementById('options-list');
        optionsList.innerHTML = '';
        data.options.forEach((option, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="radio" name="answer" class="answer" id="a${index}">
                <label for="a${index}">${option}</label>
            `;
            optionsList.appendChild(listItem);
        });
    }

    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption) {
            const answerIndex = parseInt(selectedOption.id.substring(1));
            if (answerIndex === currentQuizData[currentQuestionIndex].answer) {
                score++;
            }
        }
    }

    function showResult() {
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('score').textContent = `${score} / 4`;

        const feedback = document.getElementById('feedback');
        if (score === 0) {
            feedback.textContent = "You need to work hard.";
        } else if (score === 1) {
            feedback.textContent = "Try harder.";
        } else if (score === 2) {
            feedback.textContent = "Can be better.";
        } else if (score === 3) {
            feedback.textContent = "You were almost there.";
        } else if (score === 4) {
            feedback.textContent = "Congratulations!";
            feedback.classList.add('congratulations');
        }

        // Show appropriate buttons based on the attempt number
        if (attempt < 2) {
            document.getElementById('retake').style.display = 'inline-block';
            document.getElementById('satisfied').style.display = 'inline-block';
            document.getElementById('restart').style.display = 'none';
            document.getElementById('exit').style.display = 'none';
        } else {
            document.getElementById('retake').style.display = 'none';
            document.getElementById('satisfied').style.display = 'none';
            document.getElementById('restart').style.display = 'none';
            document.getElementById('exit').style.display = 'inline-block';
        }
    }

    function finalizeQuiz() {
        document.getElementById('result').style.display = 'block';
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('welcome').style.display = 'none';
        
        const bestScore = Math.max(...bestScores);
        document.getElementById('score').textContent = `Your Best Score Out of 2: ${bestScore} / 4`;

        document.getElementById('retake').style.display = 'none';
        document.getElementById('satisfied').style.display = 'none';
        document.getElementById('restart').style.display = 'none';
        document.getElementById('exit').style.display = 'inline-block';
    }

    function restartQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        currentQuizData = getRandomQuestions();
        document.getElementById('result').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        loadQuestion();
    }

    document.getElementById('start').addEventListener('click', () => {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        currentQuizData = getRandomQuestions();
        loadQuestion();
    });

    document.getElementById('submit').addEventListener('click', () => {
        checkAnswer();
        currentQuestionIndex++;
        if (currentQuestionIndex < 4) {
            loadQuestion();
        } else {
            bestScores.push(score);
            attempt++;
            if (attempt >= 3) {
                finalizeQuiz();
            } else {
                showResult();
            }
        }
    });

    document.getElementById('retake').addEventListener('click', () => {
        restartQuiz();
    });

    document.getElementById('satisfied').addEventListener('click', () => {
        finalizeQuiz();
    });

    document.getElementById('restart').addEventListener('click', () => {
        location.reload();
    });

    document.getElementById('exit').addEventListener('click', () => {
        window.open('', '_self').close();
    });
});
