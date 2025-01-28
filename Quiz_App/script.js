document.addEventListener('DOMContentLoaded', () => {
    const question_container = document.getElementById("ques-container");
    const questiondis = document.getElementById("question");
    const options = document.getElementById("choices");
    const showres = document.getElementById("showres");
    const result = document.getElementById("result-container");
    const scoredis = document.getElementById("score");
    const startbtn = document.getElementById("start");
    const nextbtn = document.getElementById("next");
    const restartbtn = document.getElementById("restart");

    const q = [
        {
            "question": "Which element is said to keep bones strong?",
            "choices": ["Calcium", "Iron", "Magnesium", "Potassium"],
            "answer": "Calcium"
        },
        {
            "question": "Which gas is most abundant in the Earth's atmosphere?",
            "choices": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            "answer": "Nitrogen"
        },
        {
            "question": "Who developed the theory of general relativity?",
            "choices": ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
            "answer": "Albert Einstein"
        },
        {
            "question": "What is the smallest prime number?",
            "choices": ["1", "2", "3", "0"],
            "answer": "2"
        },
        {
            "question": "Which country is known as the Land of the Rising Sun?",
            "choices": ["China", "Japan", "Thailand", "South Korea"],
            "answer": "Japan"
        },
        {
            "question": "Which organ is responsible for pumping blood in the human body?",
            "choices": ["Brain", "Lungs", "Heart", "Liver"],
            "answer": "Heart"
        },
        {
            "question": "What is the value of pi (π) rounded to two decimal places?",
            "choices": ["3.12", "3.14", "3.16", "3.18"],
            "answer": "3.14"
        },
        {
            "question": "Which planet is known as the Red Planet?",
            "choices": ["Venus", "Saturn", "Mars", "Mercury"],
            "answer": "Mars"
        },
        {
            "question": "Which country won the FIFA World Cup in 2018?",
            "choices": ["Brazil", "Germany", "France", "Argentina"],
            "answer": "France"
        }
    ];

    let currentindex = 0;
    let score = 0;

    startbtn.addEventListener("click", () => {
        question_container.classList.remove("hidden");
        startbtn.classList.add("hidden");
        result.classList.add("hidden");
        nextbtn.classList.add("hidden");
        showQues();
    });

    function showQues() {
        questiondis.innerHTML = "";
        options.innerHTML = "";
        showres.textContent = "";

        const currques = q[currentindex];
        const newques = document.createElement('h3');
        newques.innerHTML = currques.question;
        questiondis.appendChild(newques);

        currques.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-primary mb-2';
            btn.textContent = choice;
            options.appendChild(btn);

            btn.addEventListener('click', () => {
                checkans(choice);
                const allButtons = options.querySelectorAll('button');
                allButtons.forEach(button => button.disabled = true);
                nextbtn.classList.remove("hidden");
            });
        });
    }

    function checkans(choice) {
        const currques = q[currentindex];
        if (currques.answer === choice) {
            score++;
            showres.className = 'text-success';
            showres.textContent = `Correct!`;
        } else {
            showres.className = 'text-danger';
            showres.textContent = `Wrong!`;
        }
    }

    nextbtn.addEventListener("click", () => {
        currentindex++;
        if (currentindex < q.length) {
            nextbtn.classList.add("hidden");
            showQues();
        } else {
            question_container.classList.add("hidden");
            result.classList.remove("hidden");
            scoredis.textContent = `Your score is: ${score}/${q.length}`;
            restartbtn.classList.remove("hidden");
        }
    });

    restartbtn.addEventListener('click', () => {
        currentindex = 0;
        score = 0;
        result.classList.add("hidden");
        question_container.classList.remove("hidden");
        scoredis.textContent = "";
        showres.textContent = "";
        nextbtn.classList.add("hidden");
        restartbtn.classList.add("hidden");
        showQues();
    });
});
