import React, {
  useState, useEffect, useContext, createContext,
} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Console from '../../Console';
import { useCurrentProductId, ProductIDContext } from '../../contexts/ProductIDContext';

const RelatedContext = createContext();

export function useRelated() {
  return useContext(RelatedContext);
}

export function RelatedProvider({ children }) {
  const [related, setRelatedInfo] = useState();
  // const productId = useCurrentProductId().currentProductId;
  const productId = useContext(ProductIDContext);

  useEffect(() => {
    axios({
      method: 'get',
      url: `products/${productId}/related`,
    })
      .then(({ data }) => {
        setRelatedInfo(data);
      })
      .catch((err) => Console.log(err));
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
