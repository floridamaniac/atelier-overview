/* eslint-disable react/prop-types */
import { React } from 'react';
import styled from 'styled-components';
import ProductImg from './ProductImg';
import Star from '../../../Star';
import { useCurrentProductId } from '../../../contexts/ProductIDContext';
import useTracking from '@Contexts/ClickTracker';


// receives array [product information, thumbnail url, (bool for star or no star on card)]
function Individualcard({ product }) {
  const { trackEvent } = useTracking({ widget: 'clicked on related items' });
  const { setCurrentProductId } = useCurrentProductId();
  const starRating = product[2]?.avgRating || 0;

  const handleClick = () => {
    trackEvent({ element: 'Individualcard' })
    setCurrentProductId(product[0].id)
  }

  return (
      <IndCard onClick={handleClick}>
        <ProductImg image={product[1]} product={product[0].id} star={product[3]} />
        <CardText>
          <CategoryText>
            <div>{product[0].category}</div>
          </CategoryText>
          <p>{product[0].name}</p>
          <p>
            $
            {product[0].default_price}
          </p>
          <div>
            <Star score={starRating} />
            {' '}
          </div>
        </CardText>
      </IndCard>
  );
}

const IndCard = styled.div`
  display: table-cell, relative;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  width: 250px;
  height: fit-content;
  margin-right: 30px;
  margin-bottom: 5px;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 6px rgba(90, 90, 90, 0.8);
  }
  object-fit: cover;
`;

const CategoryText = styled.div`
  font-style: italic;
`;
const CardText = styled.div`
  padding-left: 1px;
`;
export {
  Individualcard,
  IndCard,
};
