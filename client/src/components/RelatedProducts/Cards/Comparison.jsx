import { React } from 'react';
import styled from 'styled-components';
import { useFeature } from '../contexts/FeatureContext';

// should get an array with two arrays of features from each item
function Comparison() {
  const twoProductsArray = useFeature();

  if (twoProductsArray) {
    const item1 = twoProductsArray.data[0].data;
    const item2 = twoProductsArray.data[1].data;

    // creates an array with all the features
    const FeatArray = item1.features.concat(item2.features);

    // create a set for stringified objects
    const stagingSet = new Set();

    for (let i = 0; i < FeatArray.length; i += 1) {
      if (!stagingSet.has(JSON.stringify(FeatArray[i].feature))) {
        stagingSet.add(JSON.stringify(FeatArray[i]));
      }
    }

    // iterate through stringified set and push to FeatureSet array
    const FeatureSet = [];

    for (const item of stagingSet) {
      FeatureSet.push(JSON.parse(item));
    }


    // ***********COMMENT THIS OUT BEFORE PRODUCTION***********
    // create two arrays to check against FeatureSet array || probably better way to do this, but MVP
    const item1Array = [];
    item1.features.map((item) => item1Array.push(item));

    const item2Array = [];
    item2.features.map((item) => item2Array.push(item));

    return (
      <table>
        <thead>
          <tr>
            <th>{item1.name}</th>
            <th> </th>
            <th>{item2.name}</th>
          </tr>
        </thead>
        <tbody>
          {FeatureSet.map((item, key) => (
            <tr key={key}>

              <Xfeature>{item1Array.map((item1) => (item1.feature === item.feature ? '✓' : ' '))}</Xfeature>

              <Value>{item.value ? `${item.value}` : `${item.feature}`}</Value>

              <Xfeature>{item2Array.map((item2) => (item2.feature === item.feature ? '✓' : ' '))}</Xfeature>
            </tr>
          ))}

        </tbody>
      </table>
    );
  }
}

const Xfeature = styled.td`
  position: flex;
  text-align: center;
`;

const Value = styled.td`
  text-align: center;
  `;

const RowL = styled.tr`
  padding-left: 5px;
`;
export default Comparison;
