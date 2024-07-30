import React from 'react';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../components/DeleteItemModal.js';
import deleteIcon from  '../resources/close_24.svg';


export default function ShoppingList({appState, setAppState}) {
  // console.log("shoppinglist appstate", appState);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [deleteItemIndex, setDeleteItemIndex] = useState(null);
  const [checkAll, setCheckAll] = useState(false);

  function addItem(e) {
    // console.log('e.currentTarget', e.currentTarget.value);
    if (e.key == "Enter" && e.currentTarget.value.trim() != '' && !appState.shoppingList.some(({name, checked}, i) => name.toLowerCase() == e.currentTarget.value.trim().toLowerCase())) {
      // if value trimmed is not '' and not already in shoppingList array

      let newShoppigListArray = [ // with a new array
        ...appState.shoppingList, // that contains all the old items
        { name: e.currentTarget.value, checked: false } // and one new item at the end
      ]
  
      setAppState((prev) => {
        return {...prev, shoppingList: newShoppigListArray}
      });

      // clear input field
      e.currentTarget.value = '';
      e.currentTarget.blur();
      let checklistContainer = document.querySelector('.checklist-container');
      checklistContainer.scrollTop = checklistContainer.scrollHeight;
      // let lastItemIndex = document.querySelector('.checklist-container').children.length + 1 ;
      // let lastItem = document.querySelector(`.checklist-container > div:nth-child(${lastItemIndex}) > :first-child`);
      // console.log('lastItem', lastItem);
      // lastItem.focus();
    }
  }

  function deleteItem(index) {
    let newShoppigListArray = appState.shoppingList.filter((item, i) => i != index );

    setAppState((prev) => {
      return {...prev, shoppingList: newShoppigListArray}
    });
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

      .shopping-heading {
        margin-block-start: 12px;
        // position: fixed;
        // top: 0px;
      }

      .add-item-input-field {
        width: 250px;
        height: 32px;
        font-size: 20px;
        // position: fixed;
        // top: 84.4px;
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
        width: calc(100dvw - 20px);
        position: fixed;
        top: 126px;
        padding-top: 8px;
      }

      .checklist-item {
        display: flex;
        // background-color: blue;
        font-size: 20px;
        // overflow-x: auto;
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

      .delete-item-icon {
        margin-left: 16px;
      }
      
      `}</style>

      <div className='page-header'>
        <h1 className='shopping-heading'>Shopping List</h1>
        <input className='add-item-input-field' type='text' onKeyDown={addItem} ></input>
      </div>
      <div className='checklist-container'>
        {appState.shoppingList.map((item, index) => {
          return (
            <div key={index} className='checklist-item'>
              <input  onChange={() => handleCheckboxClick(index)} className='checkboxes'  type='checkbox' checked={item.checked} ></input>
              <label style={{ textDecoration: item.checked ? "line-through" : "none" }} >{item.name}</label>
              <img className='delete-item-icon' src={deleteIcon} alt="delete item icon" onClick={() => {
                setModalItem(item);
                setDeleteItemIndex(index);
                setModalOpen(true);

                }} />
            </div>
          )

        })}
        {appState.shoppingList.length <= 0 && <p>No items</p>}
        <div className='checklist-actions-row'>
          <button onClick={uncheckAllClick} className='uncheck-all-button' >Un/check All</button>
          <button onClick={deleteAllClick} className='delete-all-button'>Delete All</button>
        </div>
      </div>

      {modalOpen && <DeleteItemModal 
        appState={appState} 
        setAppState={setAppState} 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}
        modalItem={modalItem}
        setModalItem={setModalItem}
        deleteItemIndex={deleteItemIndex}
        setDeleteItemIndex={setDeleteItemIndex}
        deleteItemFunction={deleteItem}
        />}

    </div>
  );
}
