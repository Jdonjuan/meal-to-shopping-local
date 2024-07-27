import React from 'react';
import { useEffect, useState } from 'react';


export default function ShoppingList({appState, setAppState}) {
  console.log("shoppinglist appstate", appState);

  const [checkAll, setCheckAll] = useState(false);

  function addItem(e) {
    console.log('e.currentTarget', e.currentTarget.value);
    if (e.key == "Enter" && e.currentTarget.value.trim() != '' && !appState.shoppingList.some(({name, checked}, i) => name.toLowerCase() == e.currentTarget.value.trim().toLowerCase())) {
      // if value trimmed is not '' and not already in shoppingList array

      let newShoppigListArray = [ // with a new array
        ...appState.shoppingList, // that contains all the old items
        { name: e.currentTarget.value, checked: false } // and one new item at the end
      ]
  
      setAppState((prev) => {
        return {...prev, shoppingList: newShoppigListArray}
      });
    }
  }

  function handleCheckboxClick(index) {
    let newShoppigListArray = appState.shoppingList.map((item, i) => {
      if (i == index) {
        return {...item, checked: !item.checked}
      }

      else {
        return item;
      }

    });

    setAppState((prev) => {
      return {...prev, shoppingList: newShoppigListArray}
    });
  }

  function uncheckAllClick(e) {
    if (checkAll) {
      let newShoppigListArray = appState.shoppingList.map((item, i) => {
        return {...item, checked: true}
      });
  
      setAppState((prev) => {
        return {...prev, shoppingList: newShoppigListArray}
      });
    }
    else {
      let newShoppigListArray = appState.shoppingList.map((item, i) => {
        return {...item, checked: false}
      });
  
      setAppState((prev) => {
        return {...prev, shoppingList: newShoppigListArray}
      });
    }
    setCheckAll((prev) => !prev);
  }

  function deleteAllClick(e) {
    let newShoppigListArray = [];

    setAppState((prev) => {
      return {...prev, shoppingList: newShoppigListArray}
    });

  }

  return (
    <div className='shopping-list-page'>
      <style>{`
      
      .shopping-list-page {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .page-header {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #79bcbf;
        position: fixed;
        top: 0px;
        width: 100dvw;
        height: 125px;
        box-shadow: 0px 3px 13px -4px;
      }

      .shopping-header {
        position: fixed;
        top: 0px;
      }

      .add-item-input-field {
        width: 250px;
        height: 32px;
        font-size: 20px;
        position: fixed;
        top: 84.4px;
        border-radius: 8px;
        padding-inline: 8px;
        // box-shadow: 0px 3px 13px -4px;
      }

      .checklist-container {
        text-align: center;
        display: inline-flex;
        flex-direction: column;
        overflow-y: auto;
        max-height: calc(100dvh - 228px);
        // margin-top: 16px;
        gap: 8px;
        min-width: calc(100dvw - 20px);
        position: fixed;
        top: 122px;
        padding-top: 8px;
      }

      .checklist-item {
        display: flex;
        // background-color: blue;
        font-size: 20px;
      }

      .checkboxes {
        width: 32px;
      }

      button {
       background-color: gray;
       color: white;
       border: none;
       padding: 8px;
       border-radius: 10px;
      }

      .checklist-actions-row {
        display: flex;
        justify-content: center;
        gap: 32px;
        padding-top: 8px;
        padding-bottom: 16px;
      }

      
      `}</style>

      <div className='page-header'>
        <h1 className='shopping-header'>Shopping List</h1>
        <input className='add-item-input-field' type='text' onKeyDown={addItem} ></input>
      </div>
      <div className='checklist-container'>
        {appState.shoppingList.map((item, index) => {
          return (
            <div key={index} className='checklist-item'>
              <input  onChange={() => handleCheckboxClick(index)} className='checkboxes'  type='checkbox' checked={item.checked} ></input>
              <label style={{ textDecoration: item.checked ? "line-through" : "none" }} >{item.name}</label>
            </div>
          )

        })}
        {appState.shoppingList.length <= 0 && <p>No items</p>}
        <div className='checklist-actions-row'>
          <button onClick={uncheckAllClick} className='uncheck-all-button' >Un/check All</button>
          <button onClick={deleteAllClick} className='delete-all-button'>Delete All</button>
        </div>
      </div>

    </div>
  );
}
