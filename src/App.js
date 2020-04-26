import React, { Component } from 'react';
import './App.css';
import { render } from '@testing-library/react';

class App extends Component {
  state = {
    products: [],
    product: {
      name: 'sample product',
      price: 20
    }
  }

  componentDidMount() {
    this.getProducts();
  }


  getProducts = _ => {
    fetch('http://localhost:5000/products/')
      .then(Response => Response.json())
      .then(Response => this.setState({ products: Response.data }))
      .catch(err => console.log(err))
  }

  addProduct = _ => {
    const { product } = this.state;
    fetch(`http://localhost:5000/products/add?name=${product.name}&price=${product.price}`)
      .then(this.getProducts)
      .catch(err => console.error(err))
  }

  // deleteProduct = _ => {
  //   const { product } = this.state;
  //   fetch(`http://localhost:5000/products/add?name=${product.name}&price=${product.price}`)
  //     .then(this.getProducts)
  //     .catch(err => console.error(err))
  // }

  renderProduct = ({ product_id, name, price }) => {
    return (
      <div key={product_id}>{name}: {price}</div>
    );
  }


  render() {
    const { products, product } = this.state;
    return (
      <div className="App">
        {products.map(this.renderProduct)}
        <div>
          <input
            value={product.name}
            onChange={e => this.setState({ product: { ...product, name: e.target.value } })} />
          <input
            value={product.price}
            onChange={e => this.setState({ product: { ...product, price: e.target.value } })}
          />
          <button onClick={this.addProduct}>add Product</button>
        </div>
      </div>
    );
  }
}

export default App;
