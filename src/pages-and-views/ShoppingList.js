import React from 'react';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../components/DeleteItemModal.js';
import deleteIcon from  '../resources/close_24.svg';
import addIcon from '../resources/add_24.svg';
import swipeIcon from '../resources/swipe_vertical_24.svg';
import upIcon from '../resources/arrow_upward_24.svg';
import downIcon from '../resources/arrow_downward_24.svg';
import DeleteAllItemsModal from '../components/DeleteAllItemsModal.js';
import AssociatedMealsModal from '../components/AssociatedMealsModal.js';


export default function ShoppingList({appState, setAppState}) {
  // console.log("shoppinglist appstate", appState);

  const [modalOpen, setModalOpen] = useState("none");
  const [modalItem, setModalItem] = useState(null);
  const [deleteItemIndex, setDeleteItemIndex] = useState(null);
  const [checkAll, setCheckAll] = useState(false);
  const [reorder, setReorder] = useState(false);

  function addItem(e) {
    // console.log('e.currentTarget', e.currentTarget.value);
    if (e.key == "Enter" && e.currentTarget.value.trim() != '') {
      // if (e.currentTarget.value.trim() != '' && !appState.shoppingList.some(({name, checked}, i) => name.toLowerCase() == e.currentTarget.value.trim().toLowerCase())) {
      //   // if value trimmed is not '' and not already in shoppingList array
  
      //   let newShoppigListArray = [ // with a new array
      //     ...appState.shoppingList, // that contains all the old items
      //     { name: e.currentTarget.value, checked: false } // and one new item at the end
      //   ]
    
      //   setAppState((prev) => {
      //     return {...prev, shoppingList: newShoppigListArray}
      //   });
  
      //   // clear input field
      //   e.currentTarget.value = '';
      //   e.currentTarget.blur();
      //   let checklistContainer = document.querySelector('.checklist-container');
      //   checklistContainer.scrollTop = checklistContainer.scrollHeight;
      //   // let lastItemIndex = document.querySelector('.checklist-container').children.length + 1 ;
      //   // let lastItem = document.querySelector(`.checklist-container > div:nth-child(${lastItemIndex}) > :first-child`);
      //   // console.log('lastItem', lastItem);
      //   // lastItem.focus();
      // }
      // else {
      //   // clear input field
      //   e.currentTarget.value = '';
      //   e.currentTarget.blur();
      //   let checklistContainer = document.querySelector('.checklist-container');
      //   checklistContainer.scrollTop = checklistContainer.scrollHeight;
      // }

      let newShoppigListArray = [ // new array
        ...appState.shoppingList, // that contains all the old items
      ];
      
      appState.shoppingList.forEach(({name, checked, associatedMeals}, i) => {
        // if item found in shopping list, add '(Manually Added)' to associated meals array
        if (name.trim().toLowerCase() == e.currentTarget.value.trim().toLowerCase()) {
          let newAssociatedMealsArray = [];
          if (associatedMeals) {
            newAssociatedMealsArray = [...associatedMeals, "(Manually Added)"];
          }
          else {
            newAssociatedMealsArray = ["(Manually Added)"];
          }
          newShoppigListArray[i] = {name, checked, associatedMeals: newAssociatedMealsArray};
        }
        // else { // if item not found in shopping list, just add the item and create an associated meals array with this meal
        //   newShoppigListArray = [ // with a new array
        //     ...newShoppigListArray, // that contains all the old items
        //     { name: ingredient.name, checked: false, associatedMeals: [name] } // and one new item at the end
        //   ]
        // }
      });

      if (!appState.shoppingList.some(({name, checked}, i) => name.trim().toLowerCase() == e.currentTarget.value.trim().toLowerCase())){
        newShoppigListArray = [ // with a new array
          ...newShoppigListArray, // that contains all the old items
          { name: e.currentTarget.value, checked: false, associatedMeals: ['(Manually Added)']} // and one new item at the end
        ]
      }
      console.log('newShoppingListArray', newShoppigListArray);
  
      setAppState((prev) => {
        return {...prev, shoppingList: newShoppigListArray}
      });

      // clear input field
      e.currentTarget.value = '';
      e.currentTarget.blur();
      let checklistContainer = document.querySelector('.checklist-container');
      checklistContainer.scrollTop = checklistContainer.scrollHeight;
    }
  }

  function handleAddItemButtonClick(e) {
    let inputField = e.currentTarget.parentElement.firstChild;
    // console.log('inputField', inputField);
    if (inputField.value.trim() != '' && !appState.shoppingList.some(({name, checked}, i) => name.toLowerCase() == inputField.value.trim().toLowerCase())) {
      // if value trimmed is not '' and not already in shoppingList array

      let newShoppigListArray = [ // with a new array
        ...appState.shoppingList, // that contains all the old items
        { name: inputField.value, checked: false } // and one new item at the end
      ]
  
      setAppState((prev) => {
        return {...prev, shoppingList: newShoppigListArray}
      });

      // clear input field
      inputField.value = '';
      inputField.blur();
      let checklistContainer = document.querySelector('.checklist-container');
      checklistContainer.scrollTop = checklistContainer.scrollHeight;
      // let lastItemIndex = document.querySelector('.checklist-container').children.length + 1 ;
      // let lastItem = document.querySelector(`.checklist-container > div:nth-child(${lastItemIndex}) > :first-child`);
      // console.log('lastItem', lastItem);
      // lastItem.focus();
    }
    else {
      // clear input field
      inputField.value = '';
      inputField.blur();
      let checklistContainer = document.querySelector('.checklist-container');
      checklistContainer.scrollTop = checklistContainer.scrollHeight;
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

  function deleteCheckedClick(e) {
    let newShoppigListArray = appState.shoppingList.filter((item, i) => !item.checked );

    setAppState((prev) => {
      return {...prev, shoppingList: newShoppigListArray}
    });
  }

  function handleMoveUp(fromIndex) {
    let toIndex = fromIndex - 1;
    let newShoppigListArray = [...appState.shoppingList];

    if (toIndex >=0 && toIndex <= appState.shoppingList.length) {
      var element = newShoppigListArray[fromIndex];
      newShoppigListArray.splice(fromIndex, 1);
      newShoppigListArray.splice(toIndex, 0, element);

      setAppState((prev) => {
        return {...prev, shoppingList: newShoppigListArray}
      });
    }
  }

  function handleMoveDown(fromIndex) {
    let toIndex = fromIndex + 1;
    let newShoppigListArray = [...appState.shoppingList];

    if (toIndex >=0 && toIndex <= appState.shoppingList.length) {
      var element = newShoppigListArray[fromIndex];
      newShoppigListArray.splice(fromIndex, 1);
      newShoppigListArray.splice(toIndex, 0, element);

      setAppState((prev) => {
        return {...prev, shoppingList: newShoppigListArray}
      });
    }
  }


  return (
    <div className='shopping-list-page'>
      <style>{`
      
      .shopping-list-page {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index 2;
      }

      .page-header {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #93e2e6;
        position: fixed;
        top: 0px;
        width: 100dvw;
        height: 125px;
        box-shadow: 0px -3px 13px -4px;
        border-bottom: 1px solid gray;
      }

      .shopping-heading {
        // margin-block-start: 12px;
        // position: fixed;
        // top: 0px;
      }

      .add-item-row {
        display: flex;
      }

      .add-item-input-field {
        width: 248px;
        height: 32px;
        font-size: 20px;
        // position: fixed;
        // top: 84.4px;
        border-radius: 8px;
        padding-inline: 8px;
        // box-shadow: 0px 3px 13px -4px;
      }

      .add-item-button {
        background-color: #457b9d;
        border-radius: 12px;
        padding: 6px;
        margin: 0 4px;
        cursor: pointer;
      }

      .checklist-container {
        text-align: center;
        display: inline-flex;
        flex-direction: column;
        overflow-y: auto;
        max-height: calc(100dvh - 220px);
        // margin-top: 16px;
        // gap: 8px;
        width: calc(100dvw - 20px);
        position: fixed;
        top: 126px;
        padding-top: 16px;
        max-width: 400px;
      }

      .checklist-item {
        display: flex;
        font-size: 20px;
        border-bottom: 1px solid lightgray;
        padding-top: 4px;
        padding-bottom: 4px;
      }

      .checkboxes {
        min-width: 18px;
        max-width: 32px;
        margin-right: 8px;
      }

      button {
       background-color: gray;
       color: white;
       border: none;
       padding: 8px;
       border-radius: 10px;
       cursor: pointer;
      }

      .checklist-actions-row {
        display: flex;
        justify-content: center;
        gap: 32px;
        padding-top: 14px;
        padding-bottom: 14px;
      }

      .delete-item-icon {
        margin-left: 16px;
      }

      .multiples-text {
        font-size: 16px;
        padding-left: 8px;
        align-self: center;
      }

      .move-icon {
        margin-left: 8px;
        margin-right: 8px;
      }

      .reorder-button {
        margin-bottom: 16px;
        align-self: start;
      }
      
      `}</style>

      <div className='page-header'>
        <h1 className='shopping-heading'>Shopping List</h1>
        <div className='add-item-row'>
          <input className='add-item-input-field' type='text' onKeyDown={addItem} placeholder='Add Item...' ></input>
          <img className='add-item-button' src={addIcon} alt="add item icon" onClick={handleAddItemButtonClick} />
        </div>
      </div>
      <div className='checklist-container'>
        <button className='reorder-button' onClick={() => setReorder(prev => !prev)}>Reorder</button>
        {appState.shoppingList.map((item, index) => {
          return (
            <div key={index} className='checklist-item' >
              {console.log('item', item.associatedMeals)}
              {reorder && (<img className='move-icon' src={upIcon} alt="move up icon" onClick={() => {handleMoveUp(index)}} />)}
              {reorder && (<img className='move-icon' src={downIcon} alt="move down icon" onClick={() => {handleMoveDown(index)}} />)}
              <input  onChange={() => handleCheckboxClick(index)} className='checkboxes'  type='checkbox' checked={item.checked} ></input>
              <label style={{ textDecoration: item.checked ? "line-through" : "none" }} >{item.name}</label>
              <div className='multiples-text' onClick={() => {
                setModalItem(item);
                setDeleteItemIndex(index);
                setModalOpen("AssociatedMeals");

              }}>
                {item.associatedMeals && item.associatedMeals.length >= 2 && (`(${item.associatedMeals.length})`)}
              </div>
              <img className='delete-item-icon' src={deleteIcon} alt="delete item icon" onClick={() => {
                setModalItem(item);
                setDeleteItemIndex(index);
                setModalOpen("deleteItem");

              }} />
            </div>
          )

        })}
        {appState.shoppingList.length <= 0 ? <p>No items</p> : <div className='checklist-actions-row'>
          <button onClick={uncheckAllClick} className='uncheck-all-button' >Un/check All</button>
          <button onClick={() => setModalOpen("Delete All")} className='delete-all-button'>Delete Checked</button>
        </div> }
      </div>

      {modalOpen == "deleteItem" && <DeleteItemModal 
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

      {modalOpen == "Delete All" && <DeleteAllItemsModal 
        setModalOpen={setModalOpen}
        deleteAllItemsFunction={deleteCheckedClick}
        />}

      {modalOpen == "AssociatedMeals" && <AssociatedMealsModal 
        appState={appState} 
        setAppState={setAppState} 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}
        modalItem={modalItem}
        setModalItem={setModalItem}
        modalItemIndex={deleteItemIndex}
        />}   

    </div>
  );
}
