import React from 'react';
import { useEffect, useState } from 'react';
import mealsIcon from '../resources/restaurant_24.svg';
import shoppingListIcon from '../resources/list_24.svg';

export default function NavBar({appState, setAppState}) {
  console.log('appState', appState);

  function handleMealsClick(e) {
    setAppState({...appState, activeScreen: "Meals"})
  }

  function handleShoppingListClick(e) {
    setAppState({...appState, activeScreen: "ShoppingList"})
  }


  return (
    <>
      <style>
        {`
          .navbar-wrapper {
            background-color: darkturquoise;
            border-top-right-radius: 16px;
            border-top-left-radius: 16px;
            text-align: center;
            width: 100%;
          }

          .navbar-button-row {
            display: inline-flex;
            gap: 24px;
            padding-top: 8px;
            padding-bottom: 16px;
          }

          .navbar-buttons {
            padding: 24px;
            background-color: green;
            border-radius: 16px;
          }
        `}
      </style>
      <div className='navbar-wrapper'>
        <div className='navbar-button-row'>
          <img src={mealsIcon} className="navbar-buttons" alt="Meals" onClick={handleMealsClick} />
          <img src={shoppingListIcon} className="navbar-buttons" alt="Meals" onClick={handleShoppingListClick} />

        </div>
      </div>

    </>
  );
}
