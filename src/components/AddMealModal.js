import React from 'react';
import { useEffect, useState } from 'react';
import closeIcon from '../resources/close_24.svg';
import DeleteItemModal from './DeleteItemModal';
import editIcon from '../resources/edit_24.svg'


export default function AddMealModal({
  appState, 
  setAppState, 
  modalOpen, 
  setModalOpen, 
  modalItem, 
  setModalItem, 
  mealIndex, 
  setMealIndex, 
  addMealFunction
}) {

  function closeModal() {
    // reset ingredients to checked = true
    let newMealsArray = [...appState.meals];
    let newMealIngredientsArray = appState.meals[mealIndex].ingredients.map((ingredient, i) => {
      return {...ingredient, checked: true}
    });

    newMealsArray[mealIndex].ingredients = newMealIngredientsArray;

    setAppState((prev) => {
      return {...prev, meals: newMealsArray}
    });

    setModalOpen("none");
  }

  const [checkAll, setCheckAll] = useState(false);

  function handleCheckboxClick(index) {
    // let newIngredientsArray = modalItem.ingredients.map((ingredient, i) => {
    //   if (i == index) {
    //     return {...ingredient, checked: !ingredient.checked}
    //   }

    //   else {
    //     return ingredient;
    //   }

    // });

    // setAppState((prev) => {
    //   return {...prev, shoppingList: newIngredientsArray}
    // });

    let newMealsArray = [...appState.meals];
    let newMealIngredientsArray = appState.meals[mealIndex].ingredients.map((ingredient, i) => {
      if (i == index) {
        return {...ingredient, checked: !ingredient.checked}
      }

      else {
        return ingredient;
      }

    });

    newMealsArray[mealIndex].ingredients = newMealIngredientsArray;

    setAppState((prev) => {
      return {...prev, meals: newMealsArray}
    });
  }

  function uncheckAllClick(e) {
    if (checkAll) {
      let newMealsArray = [...appState.meals];
      let newMealIngredientsArray = appState.meals[mealIndex].ingredients.map((item, i) => {
        return {...item, checked: true}
      });

      newMealsArray[mealIndex].ingredients = newMealIngredientsArray;

      setAppState((prev) => {
        return {...prev, meals: newMealsArray}
      });
    }
    else {
      let newMealsArray = [...appState.meals];
      let newMealIngredientsArray = appState.meals[mealIndex].ingredients.map((item, i) => {
        return {...item, checked: false}
      });

      newMealsArray[mealIndex].ingredients = newMealIngredientsArray;

      setAppState((prev) => {
        return {...prev, meals: newMealsArray}
      });
    }
    setCheckAll((prev) => !prev);
  }


  return (
    <>
      <style>
        {`

          .meal-modal-background {
            background-color: white;
            opacity: .75;
            width: 100dvw;
            height: 100dvh;
            position: fixed;
            bottom: 0px;
            z-index: 1;

          }
          
          .meal-modal-wrapper {
            // background-color: white;
            // opacity: .75;
            text-align: center;
            width: 100dvw;
            height: 100dvh;
            position: fixed;
            bottom: 0px;
            display: flex;
            justify-content: center;
            align-items: center
          }

          .meal-modal-card {
            z-index: 1;
            background-color: white;
            border-radius: 18px;
            display: flex;
            flex-direction: column;
            // gap: 24px;
            padding: 24px;
            margin: 24px;
            box-shadow: 0 0 30px -8px;
            // height: 100dvh;
            width: 100dvw;
            overflow: auto;
            max-width: 400px;
          }

          .meal-modal-header {
            display: flex;
            justify-content: space-between;
            padding-bottom: 8px;
            border-bottom: 1px solid lightgray;
          }

          .meal-modal-heading {
            text-align: left;
            font-size: 18px;
            font-weight: 700;
          }

          .meal-modal-close-button {
            padding: 0 0 0 8px;
            cursor: pointer;
          }

          .meal-modal-edit-button {
            padding: 0 8px 0 8px;
            cursor: pointer;
          }

          .checklist-container {
            text-align: left;
            display: inline-flex;
            flex-direction: column;
            overflow-y: auto;
            max-height: calc(100dvh - 220px);
            // margin-top: 16px;
            // gap: 8px;
            // width: calc(100dvw - 20px);
            // position: fixed;
            // top: 126px;
            padding-top: 16px;
            padding-bottom: 10px;
          }

          .checklist-item-uncheck-all {
            font-size: 14px;
          }

          .uncheck-checkbox {
            height: 21px;
          }

          .checklist-item {
            display: flex;
            font-size: 16px;
            // border-bottom: 1px solid lightgray;
            padding-top: 4px;
            padding-bottom: 4px;
          }

          .checkboxes {
            width: 16px;
          }

          .uncheck-all-hr {
            margin-left: 4px;
            width: 142px;
          }

          .meal-modal-body {
            padding: 8px;
          }

          .meal-modal-footer-wrapper {
            padding-top: 16px;
            border-top: 1px solid lightgray;
          }

          .meal-modal-footer-button-row {
            display: flex;
            align-items: center;
            justify-content: space-around;
          }

          .meal-modal-add-meal-button {
            background-color: green;
            padding: 12px;
            border-radius: 12px;
            cursor: pointer;
          }
        `}
      </style>
      <div className='meal-modal-wrapper'>
        <div className='meal-modal-background'></div>
        <div className='meal-modal-card'>
          <div className='meal-modal-header'>
            <div className='meal-modal-heading'>
              {modalItem.name}
            </div>
            <div className='meal-modal-edit-button'>
              <img src={editIcon} alt="close modal button" />
            </div>
            <div className='meal-modal-close-button'>
              <img src={closeIcon} alt="close modal button" onClick={closeModal} />
            </div>
          </div>
          <div className='checklist-container'>
            {modalItem.ingredients.length <= 0 ? <p>No items</p> : <div className='checklist-item'>
              <input type="checkbox" onChange={uncheckAllClick} className='checkboxes uncheck-checkbox' checked={!checkAll}></input>
              <label>Un/check All</label>
              {/* <button onClick={() => setModalOpen("Delete All")} className='delete-all-button'>Delete All</button> */}
            </div> }
            {modalItem.ingredients.length >= 1 && <hr className='uncheck-all-hr'></hr>}
            
            {modalItem.ingredients.map((item, index) => {
              return (
                <div key={index} className='checklist-item'>
                  <input  onChange={() => handleCheckboxClick(index)} className='checkboxes'  type='checkbox' checked={item.checked} ></input>
                  <label >{item.name}</label>
                  {/* <img className='delete-item-icon' src={deleteIcon} alt="delete item icon" onClick={() => {
                    setModalItem(item);
                    setDeleteItemIndex(index);
                    setModalOpen("deleteItem");

                    }} /> */}
                </div>
              )

            })}
            
          </div>
          <div className='meal-modal-footer-wrapper'>
            <div className='meal-modal-footer-button-row'>
              {/* <button onClick={closeModal}>Cancel</button> */}
              <button className='meal-modal-add-meal-button' onClick={() => addMealFunction(mealIndex)}>Add to Shopping List</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
