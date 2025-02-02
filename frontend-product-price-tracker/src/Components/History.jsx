import React, { useState } from 'react';

const History = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:7000/api/products');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    return (
        <>
            <div>
                <button onClick={fetchProducts}>Fetch Products</button>
                {products.length > 0 ? (
                    <table>
                    <thead>
                        <tr>
                        <th>Product Platform</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product MRP</th>
                        <th>Product URL</th>
                        <th>Date and Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.productPlatform}</td>
                            <td>{product.productName}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.productMrp}</td>
                            <td>{product.productURL}</td>
                            <td>{new Date(product.dateTime).toLocaleString()}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p>No products to display. Click "Fetch Products" to load data.</p>
                )}
            </div>
        </>
    )
}
export default History