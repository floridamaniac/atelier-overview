import React from 'react';
import styled from 'styled-components';
import sampleData from './../../sampleData.js';

const FavButton = styled.button`
  color: tomato;
  position: relative;
  float: right;
`;

function ProductImg() {
  // console.log(sampleData.productStyles.results[0].photos[0].url);
  // console.log(sampleData, 'this is sampledata!')

  // link should take it to the product page (productID)
  // src should image of related products
  // will need to find out the dimensions of thumbnail or use thumbnail

  return (
    <div id="parent">
      <FavButton as="a" href="http://bing.com">Test</FavButton>
      <a href="http://google.com">
        <img
          src={sampleData.productStyles.results[0].photos[0].url}
          width={200}
          height={150}
          alt="this is a test"
        />
      </a>

    </div>

  );
}

export default ProductImg;


// color: tomato;
  // position: relative;
  // float: right;