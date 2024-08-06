import React from 'react';
import { useEffect, useState } from 'react';
import deleteIcon from  '../resources/close_24.svg';
import AddMealModal from '../components/AddMealModal.js';


export default function Meals({appState, setAppState}) {
  // console.log("shoppinglist appstate", appState);

  const [modalOpen, setModalOpen] = useState('none');
  const [modalItem, setModalItem] = useState(null);
  const [mealIndex, setMealIndex] = useState(null);
  const [checkAll, setCheckAll] = useState(false);

  function createNewMeal(e) {
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

  function addMealToShoppingList(index) {
    // find the meal
    let mealIngredients = appState.meals[index].ingredients;
    let newShoppigListArray = [ // new array
      ...appState.shoppingList, // that contains all the old items
    ]
    mealIngredients.forEach((ingredient, i) => {
      if (ingredient.checked && !appState.shoppingList.some(({name, checked}, i) => name.trim().toLowerCase() == ingredient.name.trim().toLowerCase())) {
        newShoppigListArray = [ // with a new array
          ...newShoppigListArray, // that contains all the old items
          { name: ingredient.name, checked: false } // and one new item at the end
        ]
    
        // setAppState((prev) => {
        //   return {...prev, shoppingList: newShoppigListArray}
        // });
      }
    });

    setAppState((prev) => {
      return {...prev, shoppingList: newShoppigListArray}
    });

    // reset ingredients to checked = false
    let newMealsArray = [...appState.meals];
    let newMealIngredientsArray = appState.meals[index].ingredients.map((ingredient, i) => {
      return {...ingredient, checked: true}
    });

    newMealsArray[index].ingredients = newMealIngredientsArray;

    setAppState((prev) => {
      return {...prev, meals: newMealsArray}
    });

    setModalOpen('none');
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
    <div className='meals-page'>
      <style>{`
      
      .meals-page {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2
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

      .meals-heading {
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

      .meals-container {
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
        gap: 12px;
        max-width: 400px;
      }

      .meal-card {
        background-color: white;
        box-shadow: 0 0 9px -1px;
        margin: 8px;
        border-radius: 14px;
        cursor: pointer;
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
      
      `}</style>

      <div className='page-header'>
        <h1 className='meals-heading'>Meals</h1>
        {/* <input className='add-item-input-field' type='text' onKeyDown={addItem} ></input> */}
      </div>
      <div className='meals-container'>
        {appState.meals.map((item, index) => {
          return (
            <div key={index} className='meal-card' onClick={() => {
              setModalItem(item);
              setMealIndex(index);
              setModalOpen("addToShopping");

              }}>
              {/* <input  onChange={() => handleCheckboxClick(index)} className='checkboxes'  type='checkbox' checked={item.checked} ></input> */}
              <h3 className='card-title' >{item.name}</h3>
              {/* <img className='delete-item-icon' src={deleteIcon} alt="delete item icon" onClick={() => {
                setModalItem(item);
                setDeleteItemIndex(index);
                setModalOpen(true);

                }} /> */}
            </div>
          )

        })}
        {/* {appState.shoppingList.length <= 0 ? <p>No items</p> : <div className='checklist-actions-row'>
          <button onClick={uncheckAllClick} className='uncheck-all-button' >Un/check All</button>
          <button onClick={deleteAllClick} className='delete-all-button'>Delete All</button>
        </div> } */}
        
      </div>

      {modalOpen == "addToShopping" && <AddMealModal
        appState={appState}
        setAppState={setAppState}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalItem={modalItem}
        setModalItem={setModalItem}
        mealIndex={mealIndex}
        setMealIndex={setMealIndex}
        addMealFunction={addMealToShoppingList}

      />}

      {/* {modalOpen == "newMeal" && <AddMealModal
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

      {modalOpen == "editMeal" && <AddMealModal
        appState={appState}
        setAppState={setAppState}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalItem={modalItem}
        setModalItem={setModalItem}
        deleteItemIndex={deleteItemIndex}
        setDeleteItemIndex={setDeleteItemIndex}
        deleteItemFunction={deleteItem}

      />} */}

    </div>
  );
}
