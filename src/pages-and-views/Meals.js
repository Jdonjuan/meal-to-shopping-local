import React from 'react';
import { useEffect, useState } from 'react';
import deleteIcon from  '../resources/close_24.svg';
import AddMealModal from '../components/AddMealModal.js';
import NewMealModal from '../components/NewMealModal.js';


export default function Meals({appState, setAppState}) {
  // console.log("shoppinglist appstate", appState);

  const [modalOpen, setModalOpen] = useState('none');
  const [modalItem, setModalItem] = useState(null);
  const [mealIndex, setMealIndex] = useState(null);
  const [checkAll, setCheckAll] = useState(false);

  function createNewMeal(newMeal) {
    let newMealsArray = [ // with a new array
      ...appState.meals, // that contains all the old items
      { ...newMeal } // and one new item at the end
    ]

    setAppState((prev) => {
      return {...prev, meals: newMealsArray}
    });

    let mealsContainer = document.querySelector('.meals-container');
    mealsContainer.scrollTop = mealsContainer.scrollHeight;
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
        margin-block-end: 8px;
        // position: fixed;
        // top: 0px;
      }

      .new-meal-button {
        background-color: #457b9d;
        border-radius: 12px;
        padding: 12px;
        margin: 0 4px;
        cursor: pointer;
        font-size: 16px;
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
        <button className='new-meal-button' onClick={() => setModalOpen("newMeal")}>New Meal</button>
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

      {modalOpen == "newMeal" && <NewMealModal
        appState={appState}
        setAppState={setAppState}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        newMealFunction={createNewMeal}

      />}

      {/* {modalOpen == "editMeal" && <NewMealModal
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
