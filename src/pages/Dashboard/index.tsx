import React, { useCallback, useState, FormEvent, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AllHtmlEntities } from 'html-entities';

import shuffle from '../../util/shuffle';

import { quiz_api, users_api } from '../../services/api';

import Navbar from '../../components/Navbar';

import {
  FilterContainer,
  CategorySelector,
  DifficultySelector,
  QuantitySelector,
  NameContainer,
  FormContainer,
  QuestionContainer,
  QuestionTitle,
  QuestionAnswers,
} from './styles';

interface Question {
  number: number;
  title: string;
  shuffled_answers: string[];
}

interface Response {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [selectedQuantity, setSelectedQuantity] = useState(10);
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    new Array(selectedQuantity).fill(undefined),
  );
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [initialTime, setInitialTime] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { push } = useHistory();

  const handleChangeCategory = useCallback(event => {
    setSelectedCategory(event.target.value);
  }, []);

  const handleChangeDifficulty = useCallback(event => {
    setSelectedDifficulty(event.target.value);
  }, []);

  const handleChangeQuantity = useCallback(event => {
    setSelectedQuantity(event.target.value);
  }, []);

  const handleNameChange = useCallback(event => {
    setName(event.target.value);
  }, []);

  const handleBeginQuiz = useCallback(
    event => {
      event.preventDefault();

      if (inputRef.current?.checkValidity()) {
        quiz_api
          .get('/', {
            params: {
              category: selectedCategory,
              difficulty: selectedDifficulty,
              amount: selectedQuantity,
              type: 'multiple',
            },
          })
          .then(response => {
            const entities = new AllHtmlEntities();

            const formattedQuestions = response.data.results.map(
              (question: Response, index: number) => ({
                number: index,
                title: entities.decode(question.question),
                shuffled_answers: shuffle([
                  entities.decode(question.correct_answer),
                  ...question.incorrect_answers.map(incorrect_answer =>
                    entities.decode(incorrect_answer),
                  ),
                ]),
              }),
            );

            const answers = response.data.results.map((question: Response) =>
              entities.decode(question.correct_answer),
            );

            setInitialTime(new Date().getTime());
            setQuestions(formattedQuestions);
            setCorrectAnswers(answers);
          });
      } else {
        alert(`Please type your name`); // eslint-disable-line
      }
    },
    [selectedCategory, selectedDifficulty, selectedQuantity],
  );

  const handleSelectAnwser = useCallback(
    (id: number, anwser: string) => {
      selectedAnswers[id] = anwser;

      setSelectedAnswers([...selectedAnswers]);
    },
    [selectedAnswers],
  );

  const handleFinishQuiz = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      let userScore = 0;

      for (let i = 0; i < selectedQuantity; i += 1) {
        if (selectedAnswers[i] !== undefined) {
          if (selectedAnswers[i] === correctAnswers[i]) {
            userScore += 1;
          }
        }
      }

      const finalTime = new Date().getTime();

      users_api.post('/users', {
        name,
        score: (userScore / selectedQuantity) * 100,
        time_to_finish: (finalTime - initialTime) / 1000,
      });

      alert(`You scored ${userScore} of ${selectedQuantity}`); // eslint-disable-line

      push('/leaderboard');
    },
    [
      selectedAnswers,
      correctAnswers,
      selectedQuantity,
      initialTime,
      name,
      push,
    ],
  );

  return (
    <>
      <Navbar />

      <FilterContainer>
        <CategorySelector
          onChange={handleChangeCategory}
          value={selectedCategory}
        >
          <option value="0">Random</option>
          <option value="9">General Knowledge</option>
          <option value="17">Cience and Nature</option>
          <option value="21">Sports</option>
        </CategorySelector>
        <DifficultySelector
          onChange={handleChangeDifficulty}
          value={selectedDifficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </DifficultySelector>
        <QuantitySelector
          onChange={handleChangeQuantity}
          value={selectedQuantity}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </QuantitySelector>
      </FilterContainer>

      <NameContainer>
        <input
          ref={inputRef}
          type="text"
          onChange={handleNameChange}
          value={name}
          placeholder="Type your name"
          required
          pattern="[a-zA-Z\u00C0-\u024F0-9]+"
        />
        <button type="submit" onClick={handleBeginQuiz}>
          Begin Quiz
        </button>
      </NameContainer>

      {questions.length !== 0 && (
        <FormContainer onSubmit={handleFinishQuiz}>
          {questions.map(question => (
            <QuestionContainer key={question.number}>
              <QuestionTitle>
                {`${question.number + 1} - ${question.title}`}
              </QuestionTitle>
              {question.shuffled_answers.map(answer => (
                <QuestionAnswers key={answer}>
                  <input
                    type="radio"
                    id={`question-${question.number}-${answer}`}
                    name={`question-${question.number}`}
                    value={answer}
                    onChange={() => handleSelectAnwser(question.number, answer)}
                  />
                  <label htmlFor={`question-${question.number}-${answer}`}>
                    {answer}
                  </label>
                </QuestionAnswers>
              ))}
            </QuestionContainer>
          ))}
          <button type="submit">Submit</button>
        </FormContainer>
      )}
    </>
  );
};

export default Dashboard;
