// 代码生成时间: 2025-10-01 01:52:22
 * intelligent_question_bank.js
 * A simple intelligent question bank system using D3.js
 * This system allows for adding, removing, and displaying questions.
 */

// Define the Question class
class Question {
    constructor(id, question, options, answer) {
        this.id = id;
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}

// Define the QuestionBank class
class QuestionBank {
    constructor() {
        this.questions = [];
    }

    // Add a question to the bank
    addQuestion(question) {
        if (!(question instanceof Question)) {
            throw new Error('The question must be an instance of Question class.');
        }
        this.questions.push(question);
    }

    // Remove a question from the bank by its ID
    removeQuestionById(id) {
        this.questions = this.questions.filter(question => question.id !== id);
    }

    // Display all questions in the bank
    displayQuestions() {
        this.questions.forEach(question => {
            console.log(`Question: ${question.question}
Options: ${question.options.join(', ')}
Answer: ${question.answer}`);
        });
    }
}

// Example usage
try {
    const questionBank = new QuestionBank();
    questionBank.addQuestion(new Question(1, "What is the capital of France?", ["Paris", "London", "Berlin"], "Paris"));
    questionBank.addQuestion(new Question(2, "Who is the inventor of D3.js?", ["Mike Bostock", "Scott Murray", "Jason Davies"], "Mike Bostock"));
    questionBank.displayQuestions();
    questionBank.removeQuestionById(1);
    questionBank.displayQuestions();
} catch (error) {
    console.error(error.message);
}
