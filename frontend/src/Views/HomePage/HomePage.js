import React, { useEffect } from 'react';
import './HomePage.css';
import ProductCard from './ProductCard';


const HomePage = (props) => {
  const {
    getAllProducts,
    allProductsData,
  } = props;

  useEffect(() => {
    const getdata = async () => {
      try {
        await getAllProducts();
      }
      catch (err) {
        console.error(err);
      }
    }
    getdata();
  }, []);

  useEffect(() => {
    console.log(allProductsData)
  }, [allProductsData])

  return (<>
    <div style={{ display: 'grid', placeItems: "center", gridTemplateColumns: "1fr 1fr 1fr" }}>
      {allProductsData && allProductsData.length > 0 && allProductsData.map((product) => {
        return <div style={{ width: "300px" }}>
          <ProductCard productDetails={product} />
        </div>
      })}
    </div>
  </>)

}

export default HomePage;