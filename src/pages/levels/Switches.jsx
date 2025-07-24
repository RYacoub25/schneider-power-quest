import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestTracker from '../../components/QuestTracker'
import Congrats from '../Congrats'
const quizData = [
    {
        question: "What is the key feature of the Unica range of switches?",
        options: [
            "Energy-saving features",
            "Sleek and modern design",
            "Smart home integration",
            "Automatic switching"
        ],
        answer: "Sleek and modern design"
    },
    {
        question: "Which Schneider switch range integrates with smart home systems?",
        options: ["Unica", "MiluZ", "Odace", "Plexo"],
        answer: "Unica"
    },
    {
        question: "How does the MiluZ range help reduce energy consumption?",
        options: [
            "By using energy-efficient materials",
            "Through advanced automation features",
            "By having a low standby power mode",
            "All of the above"
        ],
        answer: "All of the above"
    },
    {
        question: "What type of environment is the Plexo switch range most suitable for?",
        options: [
            "Residential homes",
            "Offices and conference rooms",
            "Harsh environments like industrial settings",
            "Smart homes"
        ],
        answer: "Harsh environments like industrial settings"
    },
    {
        question: "Which feature of Unica switches makes them ideal for high-end residential projects?",
        options: [
            "Customization of colors and materials",
            "Weather-resistant capabilities",
            "Multiple smart functionalities",
            "Built-in motion sensors"
        ],
        answer: "Customization of colors and materials"
    },
    {
        question: "Which Schneider switch range is known for its durability in tough conditions?",
        options: ["MiluZ", "Plexo", "Unica", "Odace"],
        answer: "Plexo"
    },
    {
        question: "Which Schneider switch range is ideal for modern, minimalist interiors?",
        options: ["MiluZ", "Unica", "Odace", "Plexo"],
        answer: "Unica"
    },
    {
        question: "How do Schneider's smart switches contribute to home automation?",
        options: [
            "By being able to control lights and devices remotely",
            "By reducing energy consumption",
            "By integrating with voice assistants",
            "All of the above"
        ],
        answer: "All of the above"
    },
    {
        question: "Which feature of the MiluZ range enhances its design appeal in homes?",
        options: [
            "Sleek glass finishes",
            "Built-in LED lights",
            "Wireless connectivity",
            "Automated on/off control"
        ],
        answer: "Sleek glass finishes"
    },
    {
        question: "How do Plexo switches enhance safety in industrial settings?",
        options: [
            "They have explosion-proof casings",
            "They have energy-efficient designs",
            "They have shock-resistant properties",
            "They are weather-resistant"
        ],
        answer: "They have shock-resistant properties"
    }
];

export default function Switches({ isDone, setIsDone }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isAnswered, setIsAnswered] = useState(false); // Track if the question has been answered
    const handleAnswer = (selectedAnswer) => {
        const correctAnswer = quizData[currentQuestionIndex].answer;

        // Check if the selected answer is correct
        if (selectedAnswer === correctAnswer) {
            setScore(score + 1);
            setFeedback('Correct!'); // Show correct feedback
            setIsAnswered(true); // Allow to move to next question
        } else {
            setFeedback('Incorrect, try again.'); // Show incorrect feedback
            setIsAnswered(false); // Keep the current question
        }

        // Save the user's answer
        setUserAnswers([...userAnswers, selectedAnswer]);
    };

    const goToNextQuestion = () => {
        if (isAnswered && currentQuestionIndex <= quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsAnswered(false); // Reset for the next question
            setFeedback(''); // Clear feedback for the next question
        }
    };


    const renderResult = () => {
        if (currentQuestionIndex >= quizData.length) {
            setIsDone(true);
        }
        return (
            <div>
                <h2>Your Score: {score}/{quizData.length}</h2>
                <p className="feedback">You got promocode of 10% off Schneider Switches</p>
            </div>
        );
    };

    if (currentQuestionIndex >= quizData.length) {
        return renderResult();
    }

    const { question, options } = quizData[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <h2>Question {currentQuestionIndex + 1}</h2>
            <p>{question}</p>

            <div className="options-container">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className="option-btn"
                        disabled={isAnswered} // Disable buttons after answering
                    >
                        {option}
                    </button>
                ))}
            </div>

            {feedback && <p className="feedback">{feedback}</p>} {/* Show feedback */}

            {/* "Next Question" button appears only when the answer is correct */}
            {isAnswered && (
                <button className="next-btn" onClick={goToNextQuestion}>
                    Next Question
                </button>
            )}

        </div>
    );
}