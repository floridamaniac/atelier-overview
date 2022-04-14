import React from 'react';
import styled from 'styled-components';

import { useMeta } from '../../../contexts/ReviewMeta';
import Star from '../../../Star';

export default function RatingOverview() {
  let score = 0;
  let helpfulness = null;
  const currentMeta = useMeta();

  if (currentMeta) {
    const { recommended, avgRating } = currentMeta;
    score = avgRating;
    const trueCT = Number(recommended.true);
    const falseCT = Number(recommended.false);
    helpfulness = Math.round((trueCT / (trueCT + falseCT)) * 100);
  }

  const recommendationEntry = helpfulness ? (
    <div>
      {helpfulness}
      % of reviews recommend this product
    </div>
  ) : '';

  return (
    <RatingOverviewContainer>
      <h3 id="ratings">
        RATINGS & REVIEWS
      </h3>
      <StarContainer>
        <Score>
          {score}
        </Score>
        <Star score={score} />
      </StarContainer>
      {recommendationEntry}
    </RatingOverviewContainer>
  );
}

// Style componnets
const RatingOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StarContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Score = styled.div`
  padding-right: 1rem;
  font-size: 4rem;
  font-weight: bold
`;
