import React, {
  useState, useEffect, useContext, createContext,
} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ProductIDContext } from '../../contexts/ProductIDContext';

const RelatedContext = createContext();

export function useRelated() {
  return useContext(RelatedContext);
}

export function RelatedProvider({ children }) {
  const [related, setRelatedInfo] = useState();
  const [styles, setStyles] = useState();
  const productId = useContext(ProductIDContext);

  useEffect(() => {
    axios({
      method: 'get',
      url: `products/${productId}/related`,
    })
      .then(({ data }) => {
        setRelatedInfo(data);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `products/${productId}/styles`,
    })
      .then(({ data }) => {
        setStyles(data);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  return (
    <RelatedContext.Provider value={related}>
      { children }
    </RelatedContext.Provider>
  );
}

RelatedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
