import React from "react";
// import { Route, Link } from "react-router-dom";

function PizzaForm(props) {
  const {
    values,
    onInputChange,
    onCheckboxChange,
    onSubmit,
    disabled,
    errors
  } = props;

  return (
    <form id="order" className="pizza-form-container">
      <h2>Complete Form and Place Order</h2>
      {/* Step 10 SHOW ERRORS */}
      <div className="errors">{errors.name}</div>
      {/* ////////// name TEXT INPUT ////////// */}
      <label> Name:&nbsp;
        <input
          value={values.name}
          onChange={onInputChange}
          name="name"
          type="text"
        />
      </label>
      {/* ////////// DROPDOWN ////////// */}
      <label>
        Pizza Size:&nbsp;
        <select 
            value={values.size} 
            onChange={onInputChange} 
            name="size"
            >
          <option defaultValue="">Please choose</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
        </select></label>
      {/* ////////// CHECKBOXES ////////// */}
      <label><input
          checked={values.toppings.sausage}
          onChange={onCheckboxChange}
          name="sausage"
          type="checkbox" />Sausage</label>
      <label><input
          checked={values.toppings.pepperoni}
          onChange={onCheckboxChange}
          name="pepperoni"
          type="checkbox" />Pepperoni</label>
      <label><input
          checked={values.toppings.peppers}
          onChange={onCheckboxChange}
          name="peppers"
          type="checkbox" />Peppers</label>
      <label><input
          checked={values.toppings.apples}
          onChange={onCheckboxChange}
          name="apples"
          type="checkbox" />Apples&nbsp;</label>
      {/* ////////// special instructions TEXT INPUT ////////// */}
      <label>
        Special Instructions:&nbsp;
        <input
          value={values.instructions}
          onChange={onInputChange}
          name="instructions"
          type="text"
        />
      </label>
      {/* ////////// DISABLED feature with Submit Button////////// */}
      <button name="order" onClick={onSubmit} disabled={disabled}>
        Place Order
      </button>
    </form>
  );
}

export default PizzaForm;