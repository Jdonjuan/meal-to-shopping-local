import React from 'react';
import { useEffect, useState } from 'react';


export default function ShoppingList({appState, setAppState}) {
  console.log("shoppinglist appstate", appState);

  return (
    <div className='shopping-list-page'>
      <style>{`
      
      .shopping-list-page {
        text-align: center;
      }

      .checklist-container {
        text-align: center;
        display: inline-flex;
        flex-direction: column;
        overflow-y: auto;
        max-height: 78dvh;
      }

      .checklist-item {
        display: flex;
        background-color: blue;
      }

      
      `}</style>

      <h1 className='shopping-header'>Shopping List</h1>

      <div className='checklist-container'>
        {appState.shoppingList.map((item) => {
          return (
            <div key={item} className='checklist-item'>
              <input type='checkbox'></input>
              {item}
            </div>
          )

        })}
      </div>

    </div>
  );
}
