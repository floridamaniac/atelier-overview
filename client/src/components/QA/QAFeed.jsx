import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useData } from './QAContext';
import QAItem from './QAItem';

export default function Feed({ searchQuesitonBody }) {
  const [numQsToRender, setNumQsToRender] = useState(2);
  const [startQsToRender, setStartQsToRender] = useState(0);

  const questionData = useData().qData;
  const answerData = useData().aData;
  let filteredQData = questionData;
  let queryText = '';
  if (searchQuesitonBody !== undefined && searchQuesitonBody.length > 2) {
    queryText = searchQuesitonBody.toLowerCase();
  } else {
    queryText = '';
  }
  const tempTotalQsToRender = [];
  let lengthOfFeed = 0;

  if (questionData !== null) {
    lengthOfFeed = questionData.length;
    filteredQData = questionData.filter(
      (question) => question.question_body.toLowerCase().includes(queryText),
    );
    const compareQuestionHelpfulness = (a, b) => {
      if (a.question_helpfulness > b.question_helpfulness) {
        return -1;
      } if (a.question_helpfulness < b.question_helpfulness) {
        return 1;
      } return 0;
    };
    filteredQData.sort(compareQuestionHelpfulness);
    for (let i = 0; i < Math.min(numQsToRender, filteredQData.length); i += 1) {
      tempTotalQsToRender.push(filteredQData[i]);
    }
  }

  return (
    <>
      <FeedSection>
        {tempTotalQsToRender === [] ? 'Loading...' : tempTotalQsToRender.map(
          (question) => (
            <QAItem
              key={question.question_id}
              question={question}
              allAnswers={answerData}
            />
          ),
        )}
      </FeedSection>
      <ButtonBlock>
        {(lengthOfFeed > numQsToRender) && (
          <MoreAnswersButton
            type="submit"
            onClick={() => {
              setNumQsToRender(numQsToRender + 2);
              setStartQsToRender(startQsToRender + 2);
            }}
          >
            Load More Questions
          </MoreAnswersButton>
        )}
        <MoreAnswersButton
          onClick={() => { console.log('Nice ...'); }}
        >
          Ask a Question +
        </MoreAnswersButton>
      </ButtonBlock>
    </>
  );
}

const FeedSection = styled.section`
  background-color: ${(props) => props.theme.colors.light};
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow: scroll;
`;

const MoreAnswersButton = styled.button`
border: 2px solid;
text-align: center;
padding: 1.3rem 1rem 1.3rem 1rem;
font-size: medium;
font-weight: 700;
&:hover {
  background-color:${(props) => props.theme.colors.buttonHover}
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1.3rem 1rem 1.3rem 1rem;
`;

Feed.propTypes = {
  searchQuesitonBody: PropTypes.string,
};

Feed.defaultProps = {
  searchQuesitonBody: '',
};
