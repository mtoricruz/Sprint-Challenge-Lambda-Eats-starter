import React, { useState, useEffect } from "react";
// STEP 2 - import Route/Switch/Link from react router dom if needed
import { Route, Link } from "react-router-dom";
import PizzaForm from "./PizzaForm";
import Order from "./Order"
// import HomePage from './HomePage';
import axios from "axios";
import * as yup from "yup";
import "./App.css";

const url = "https://reqres.in/api/users";

const initialFormValues = {
  //text for name
  name: "",
  //dropdown comp for size
  size: "",
  //checkbox for toppings
  toppings: {
    sausage: false,
    pepperoni: false,
    peppers: false,
    apples: false
  },
  //text for instructions
  instructions: ""
};

const initialFormErrors = {
  name: "",
  size: "",
  instructions: ""
};

const formSchema = yup.object().shape({
  name: yup.string().min(2, "name must have at least 2 characters!"),
  size: yup.string().matches(/(small|medium)/, "either small or medium size"),
  instructions: yup.string()
});

function App() {
  const [orders, setOrders] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formDisabled, setFormDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const postOrder = order => {
    axios.post(url, order)
      .then(res => {
        setOrders([...orders, res.data]);
      })
      .catch(err => {
        debugger
      });
  };

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setFormDisabled(!valid);
    });
  }, [formValues]);

  const onSubmit = evt => {
    evt.preventDefault();

    const newOrder = {
      name: formValues.name,
      size: formValues.size === 'medium' ? false : true,
      toppings: Object.keys(formValues.toppings)
      .filter(topping => formValues.toppings[topping] === true),
      instructions: formValues.instructions
    };

    postOrder(newOrder);
    setFormValues(initialFormValues);
  };

  const onInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup.reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const onCheckboxChange = evt => {
    const { name } = evt.target;
    const isChecked = evt.target.isChecked;

    setFormValues({
      ...formValues,
      toppings: {
        ...setFormValues.toppings,
        [name]: isChecked
      }
    });
  };

  return (
    <div className="container">
      <header>
        <h1>Lambda Eats</h1>
      </header>

      
      <Route exact path="/">
        <Link to="/pizza">Order Here</Link>
        <h1>Home Page</h1>
      </Route>

      <Route path="/pizza">
        <Link to="/">Go Home</Link>
        <h2>Order Form</h2>
        <PizzaForm
          values={formValues}
          onInputChange={onInputChange}
          onCheckboxChange={onCheckboxChange}
          onSubmit={onSubmit}
          disabled={formDisabled}
          errors={formErrors}
        />
      </Route>

      {
        orders.map(order => {
          return (
            <Order key={order.id} details={order} />
          )
        })
      }
    </div>
  );
}

export default App;
