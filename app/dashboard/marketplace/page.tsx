'use client';

import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: 'in-stock' | 'low-stock' | 'out-stock';
  rating: number;
}

export default function MarketplacePage() {
  const [products] = useState<Product[]>([
    {
      id: 'PRD001',
      name: 'Wireless Headphones Pro',
      category: 'Electronics',
      price: 89.99,
      stock: 'in-stock',
      rating: 4.8,
    },
    {
      id: 'PRD002',
      name: 'Smart Watch Series X',
      category: 'Electronics',
      price: 199.99,
      stock: 'in-stock',
      rating: 4.9,
    },
    {
      id: 'PRD003',
      name: 'Designer Leather Jacket',
      category: 'Clothing',
      price: 149.99,
      stock: 'low-stock',
      rating: 4.5,
    },
    {
      id: 'PRD004',
      name: '4K Action Camera',
      category: 'Electronics',
      price: 299.99,
      stock: 'in-stock',
      rating: 4.7,
    },
    {
      id: 'PRD005',
      name: 'Gaming Keyboard RGB',
      category: 'Electronics',
      price: 79.99,
      stock: 'out-stock',
      rating: 4.6,
    },
  ]);

  const getStockBadge = (stock: string) => {
    const badges = {
      'in-stock': { text: 'In Stock', class: 'status-in-stock' },
      'low-stock': { text: 'Low Stock', class: 'status-low-stock' },
      'out-stock': { text: 'Out of Stock', class: 'status-out-stock' },
    };
    return badges[stock as keyof typeof badges];
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars ? '⭐' : '☆');
    }
    return stars.join('');
  };

  return (
    <div className="marketplace-container">
      <h1 className="page-title">Available Products</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-group">
          <label>Category:</label>
          <select className="filter-select">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home & Garden</option>
            <option>Sports</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Price Range:</label>
          <select className="filter-select">
            <option>All Prices</option>
            <option>$0 - $50</option>
            <option>$50 - $100</option>
            <option>$100 - $200</option>
            <option>$200+</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Sort By:</label>
          <select className="filter-select">
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Status</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const stockBadge = getStockBadge(product.stock);
              return (
                <tr key={product.id}>
                  <td>#{product.id}</td>
                  <td>
                    <div className="product-cell">
                      <div className="product-image">
                        <span>{product.name[0]}</span>
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td className="price">${product.price.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${stockBadge.class}`}>
                      {stockBadge.text}
                    </span>
                  </td>
                  <td>
                    {renderStars(product.rating)} ({product.rating})
                  </td>
                  <td>
                    <button
                      className="btn-buy"
                      disabled={product.stock === 'out-stock'}
                    >
                      {product.stock === 'out-stock' ? 'Sold Out' : 'Buy Now'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="page-btn" disabled>
          « Previous
        </button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn">Next »</button>
      </div>

      <style jsx>{`
        .marketplace-container {
          background: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .page-title {
          color: #003399;
          font-size: 32px;
          margin-bottom: 30px;
          text-align: center;
        }

        .filter-section {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 8px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
          min-width: 200px;
        }

        .filter-group label {
          font-weight: bold;
          color: #333;
          font-size: 14px;
        }

        .filter-select {
          padding: 10px;
          border: 2px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
        }

        .products-table-container {
          overflow-x: auto;
          margin-bottom: 30px;
        }

        .products-table {
          width: 100%;
          border-collapse: collapse;
        }

        .products-table thead {
          background: linear-gradient(135deg, #003399 0%, #0052cc 100%);
          color: white;
        }

        .products-table th {
          padding: 15px;
          text-align: left;
          font-weight: bold;
        }

        .products-table td {
          padding: 15px;
          border-bottom: 1px solid #eee;
        }

        .products-table tbody tr:hover {
          background: #f9f9f9;
        }

        .product-cell {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .product-image {
          width: 50px;
          height: 50px;
          border-radius: 5px;
          background: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 20px;
        }

        .category-badge {
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: bold;
          background: #e3f2fd;
          color: #1976d2;
        }

        .status-badge {
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: bold;
        }

        .status-in-stock {
          background: #c8e6c9;
          color: #2e7d32;
        }

        .status-low-stock {
          background: #fff9c4;
          color: #f57f17;
        }

        .status-out-stock {
          background: #ffcdd2;
          color: #c62828;
        }

        .price {
          font-size: 18px;
          font-weight: bold;
          color: #0066ff;
        }

        .btn-buy {
          background: linear-gradient(135deg, #00c853 0%, #00e676 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }

        .btn-buy:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .page-btn {
          padding: 10px 15px;
          border: 2px solid #0066ff;
          background: white;
          color: #0066ff;
          border-radius: 5px;
          cursor: pointer;
        }

        .page-btn.active {
          background: #0066ff;
          color: white;
        }

        .page-btn:disabled {
          border-color: #ccc;
          color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}