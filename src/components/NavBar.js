import React from 'react';
import { useEffect, useState } from 'react';
import mealsIcon from '../resources/restaurant_24.svg';
import shoppingListIcon from '../resources/list_24.svg';
import settingsIcon from '../resources/settings_24.svg';

export default function NavBar({appState, setAppState}) {
  // console.log('appState', appState);

  function handleMealsClick(e) {
    setAppState({...appState, activeScreen: "Meals"});
  }

  function handleShoppingListClick(e) {
    setAppState({...appState, activeScreen: "ShoppingList"});
  }

  function handleSettingsClick(e) {
    setAppState({...appState, activeScreen: "Settings"});
  }


  return (
    <>
      <style>
        {`
          .navbar-wrapper {
            background-color: #93e2e6;
            border-top-right-radius: 16px;
            border-top-left-radius: 16px;
            text-align: center;
            width: 100%;
            position: fixed;
            bottom: 0px;
            height: 76px;
            box-shadow: 0 40px 18px 35px;
            z-index: 1;
          }

          .navbar-button-row {
            display: inline-flex;
            gap: 44px;
            padding-top: 16px;
            padding-bottom: 8px;
          }

          .navbar-buttons {
            padding: 12px;
            background-color: #457b9d;
            border-radius: 16px;
            cursor: pointer;
          }
        `}
      </style>
      <div className='navbar-wrapper'>
      
        <div className='navbar-button-row'>
          <img src={mealsIcon} className="navbar-buttons" style={{ boxShadow: appState.activeScreen == "Meals" ? "#dcf0f1 0px 0px 6px 5px" : "none" }} alt="Meals" onClick={handleMealsClick} />
          <img src={shoppingListIcon} className="navbar-buttons" style={{ boxShadow: appState.activeScreen == "ShoppingList" ? "#dcf0f1 0px 0px 6px 5px"  : "none" }} alt="Shopping List" onClick={handleShoppingListClick} />
          <img src={settingsIcon} className="navbar-buttons" style={{ boxShadow: appState.activeScreen == "Settings" ? "#dcf0f1 0px 0px 6px 5px" : "none" }} alt="Settings" onClick={handleSettingsClick} />
        </div>
      </div>

    </>
  );
}
