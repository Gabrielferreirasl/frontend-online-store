import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from '../Pages/Home';
import { CheckoutInputs } from './CheckoutInputs';
import iconGoBack from '../icons/icon-goBack.png';

class Checkout extends Component {
  constructor() {
    super();
    this.clearCart = this.clearCart.bind(this);
    this.state = { redirect: false };
  }

  clearCart() {
    const { location: { state: { listOfProducts } } } = this.props;
    listOfProducts.map((item) => {
      const product = JSON.parse(localStorage.getItem(item.id));
      product.isOnCart = false;
      return product.rating ? localStorage.setItem(item.id, JSON.stringify(product))
        : localStorage.removeItem(item.id);
    });
    this.setState({ redirect: true });
  }

  render() {
    const { location: { state: { listOfProducts, total } } } = this.props;
    const { redirect } = this.state;
    return (
      <section>
        <div>
          <Link
            to="/cart"
          >
            <img
              className="ml-5 mt-5 w-10"
              alt="cart"
              src={ iconGoBack }
            />
          </Link>
          <h1 className="font-medium text-lg mb-10">Revise seus Produtos</h1>
          <h3
            className="font-sans
           text-lg
           text-gray-800 text-center font-bold mb-2 truncate"
          >
            {total}

          </h3>
          <section className="space-y-10 mt-10">
            {listOfProducts.map((product) => (
              <div
                key={ product.id }
                data-testid="product"
                className="flex-col
              cart-section bg-white shadow-2xl  rounded px-10 pt-6 pb-8 mb-4"
              >
                <h4
                  className="font-sans
                italic text-lg text-gray-800 text-center text-clip"
                >
                  { product.title }
                </h4>
                <img
                  src={ product.thumbnail }
                  alt={ product.title }
                  className="cart-image"
                />
                <h5>{ `${product.quantity} x R$ ${product.price}` }</h5>
                <h5
                  className="font-sans
                 text-lg text-gray-800 text-center font-bold"
                >
                  {`Subtotal: R$ ${(product.quantity * product.price).toFixed(2)}`}

                </h5>
              </div>
            ))}
          </section>
        </div>
        <section className="flex-col justify-center">
          <h4
            className="font-medium
           text-lg mt-10 mb-2 text-center"
          >
            Informações do comprador
          </h4>
          <CheckoutInputs />
          <button
            onClick={ this.clearCart }
            type="submit"
            className="bg-blue-500
            hover:bg-blue-700 text-white font-bold
            py-2 px-4 border border-blue-700 rounded mt-8 mb-8"
          >
            Finalizar Pedido
          </button>
        </section>
        {redirect && <Redirect to="/" Component={ Home } />}
      </section>
    );
  }
}

Checkout.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default Checkout;
