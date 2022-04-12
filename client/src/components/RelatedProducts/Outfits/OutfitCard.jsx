/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import { React } from 'react';
import styled from 'styled-components';
import { useCurrentStyles } from '../../../contexts/StylesProvider';
import { useMeta } from '../../../contexts/ReviewMeta';
import { Individualcard } from '../Cards/Individualcard';

// ({ product, setOutfitArray, outfitArray })

function OutfitCard({ product }) {
  if (useCurrentStyles()) {
    const thumbnail = useCurrentStyles()[0].photos[0].thumbnail_url;
    const rating = useMeta();
    const information = [product, thumbnail, rating];

    // use if add outfit array is more than 1
    // const removeItem = (product) => {
    //   const remove = outfitArray.indexOf(product);
    //   // console.log(remove, 'this is 1');

    //   if (remove > -1) {
    //     setOutfitArray(((outfitArray) => outfitArray.filter((product, i) => i === remove)
    //     ));

    //     // console.log(outfitArray, 'this is array after removing');
    //   }
    // };

    return (

      <Outfit>

        {/* <CloseButton onClick={outfitArray.length === 1 ? () => setOutfitArray([]) : removeItem(product)}>
        X
      </CloseButton> */}

        <Individualcard product={information} />
      </Outfit>

    );
  }
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
// padding: 0 15px 0 15px;
&:hover {
  box-shadow: 0 0 6px rgba(90, 90, 90, 0.8);
}
`;

const CloseButton = styled.div`
  display: flex;
  z-index: 10;
  position: absolute;
  top: 5px;
  right: 15px;
  background: transparent;
  border-style: transparent;
  font-color: yellow;
`;
const OutfitImg = styled.p`
  margin-top: 5px;
`;

const Outfit = styled.div`
  margin-left: 5px;
  display: flex;
  float: right;
  flex-direction: row;

`;
export default OutfitCard;

// <IndCard>
//       <CloseButton onClick={outfitArray.length === 1 ? () => setOutfitArray([]) : removeItem(product)}>
//         X
//       </CloseButton>
//       <OutfitImg>

//         <img
//           src={thumbnail}
//           alt="Not found"
//         />
//       </OutfitImg>
//       <div>{product.category}</div>
//       <p>{product.name}</p>
//       <p>
//         $
//         {product.default_price}
//       </p>
//       <div><Star score={rating} /></div>

//     </IndCard>
