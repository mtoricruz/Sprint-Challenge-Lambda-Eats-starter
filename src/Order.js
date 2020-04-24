import React from 'react'

function Order({ details }) {
  if (!details) {
    return <h3>Working fetching your order&apos;s details...</h3>
  }
  return (
    <div className='oder container'>
      <h2>{details.name}'s Order</h2>
      <p>Size: {details.size ? 'Small' : 'Medium'}</p>
      {
        !!details.toppings && !!details.toppings.length &&
        <div>
          Toppings:
          <ul>
            {
              details.toppings.map((topping, idx) => <li key={idx}>{topping}</li>)
            }
          </ul>
        </div>
      }
      <p>Special Instructions: {details.instructions}</p>
    </div>
  )
}

export default Order