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
            background-color: #79bcbf;
            border-top-right-radius: 16px;
            border-top-left-radius: 16px;
            text-align: center;
            width: 100%;
            position: fixed;
            bottom: 0px;
            height: 96px;
            box-shadow: 0 40px 18px 35px;
          }

          .navbar-button-row {
            display: inline-flex;
            gap: 24px;
            padding-top: 16px;
            padding-bottom: 16px;
          }

          .navbar-buttons {
            padding: 18px;
            background-color: #457b9d;
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
