import React from 'react';
import { useEffect, useState } from 'react';
import closeIcon from '../resources/close_24.svg';
import DeleteItemModal from './DeleteItemModal';
import editIcon from '../resources/edit_24.svg'
import addIcon from '../resources/add_24.svg';
import deleteIcon from '../resources/delete_24.svg';


export default function EditMealModal({
  appState, 
  setAppState, 
  modalOpen, 
  setModalOpen, 
  modalItem, 
  setModalItem, 
  mealIndex, 
  setMealIndex, 
}) {

  const [deleteModalOpen, setDeleteModalOpen] = useState("none");
  const [deleteModalItem, setDeleteModalItem] = useState(null);
  const [deleteItemIndex, setDeleteItemIndex] = useState(null);
  const [newMeal, setNewMeal] = useState({...modalItem});


  function closeModal() {
    // reset ingredients to checked = true
    // let newMealsArray = [...appState.meals];
    // let newMealIngredientsArray = appState.meals[mealIndex].ingredients.map((ingredient, i) => {
    //   return {...ingredient, checked: true}
    // });

    // newMealsArray[mealIndex].ingredients = newMealIngredientsArray;

    // setAppState((prev) => {
    //   return {...prev, meals: newMealsArray}
    // });
    // setModalItem(modalItem);
    // setMealIndex(mealIndex);
    setModalOpen("none");
  }

  function updateMeal() {
    if (updateMeal.name.trim() != '') {
      let newMealsArray = [...appState.meals];
      newMealsArray[mealIndex] = newMeal;
  
      setAppState((prev) => {
        return {...prev, meals: newMealsArray}
      });
  
      closeModal();
    }
  }

  function deleteMeal(index) {
    let newMealsArray = appState.meals.filter((item, i) => i != index );

    setAppState((prev) => {
      return {...prev, meals: newMealsArray}
    });

    closeModal();
  }

  function updateMealName(e) {
    let newName = e.currentTarget.value;

    setNewMeal({...newMeal, name: newName});
    // setNewMeal(prev => {
    //   return {...prev, name: e?.currentTarget?.value}
    // });
  }

  function addIngredient(e) {
    // console.log('e.currentTarget', e.currentTarget.value);
    if (e.key == "Enter") {
      if (e.currentTarget.value.trim() != '' && !newMeal.ingredients.some(({name, checked}, i) => name.toLowerCase() == e.currentTarget.value.trim().toLowerCase())) {
        // if value trimmed is not '' and not already in ingredients array
  
        let newIngredientsArray = [ // with a new array
          ...newMeal.ingredients, // that contains all the old items
          { name: e.currentTarget.value, checked: true } // and one new item at the end
        ]
    
        setNewMeal((prev) => {
          return {...prev, ingredients: newIngredientsArray}
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
      else {
        // clear input field
        e.currentTarget.value = '';
        e.currentTarget.blur();
        let checklistContainer = document.querySelector('.checklist-container');
        checklistContainer.scrollTop = checklistContainer.scrollHeight;
      }
    }
  }

  function handleAddIngredientButtonClick(e) {
    let inputField = e.currentTarget.parentElement.firstChild;
    // console.log('inputField', inputField);
    if (inputField.value.trim() != '' && !newMeal.ingredients.some(({name, checked}, i) => name.toLowerCase() == inputField.value.trim().toLowerCase())) {
      // if value trimmed is not '' and not already in ingredients array

      let newIngredientsArray = [ // with a new array
        ...newMeal.ingredients, // that contains all the old items
        { name: inputField.value, checked: true } // and one new item at the end
      ]
  
      setNewMeal((prev) => {
        return {...prev, ingredients: newIngredientsArray}
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
    let newIngredientsArray = newMeal.ingredients.filter((item, i) => i != index );

    setNewMeal((prev) => {
      return {...prev, ingredients: newIngredientsArray}
    });
  }

  // function SaveMeal() {
  //   if (newMeal.name.trim() != '') {
  //     newMealFunction(newMeal);
  //     closeModal();
  //   }
  // }

  console.log('newMeal state', newMeal);

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

          .name-row {
            margin-top: 8px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .meal-name-input-field {
            width: 200px;
            height: 32px;
            font-size: 16px;
            // position: fixed;
            // top: 84.4px;
            border-radius: 8px;
            padding-inline: 8px;
            // box-shadow: 0px 3px 13px -4px;
            margin: 8px 0;
          }

          .ingredients-heading {
            text-align: start;
            padding-bottom: 4px;
            padding-top: 4px;
          }

          .add-item-row {
            display: flex;
            border-bottom: 1px solid lightgray;
          }

          .add-item-input-field {
            width: 160px;
            height: 32px;
            font-size: 16px;
            // position: fixed;
            // top: 84.4px;
            border-radius: 8px;
            padding-inline: 8px;
            // box-shadow: 0px 3px 13px -4px;
            margin: 8px 0;
          }

          .add-item-button {
            background-color: #457b9d;
            border-radius: 12px;
            padding: 0 6px;
            margin: 8px 4px;
            cursor: pointer;
          }

          .checklist-container {
            text-align: left;
            display: inline-flex;
            flex-direction: column;
            overflow-y: auto;
            max-height: calc(100dvh - 352px);
            // margin-top: 16px;
            // gap: 8px;
            // width: calc(100dvw - 20px);
            // position: fixed;
            // top: 126px;
            // padding-top: 16px;
            padding-bottom: 10px;
            padding-left: 16px;
          }

          .checklist-item-uncheck-all {
            font-size: 14px;
          }

          .uncheck-checkbox {
            height: 18px;
          }

          .checklist-item {
            display: flex;
            font-size: 16px;
            // border-bottom: 1px solid lightgray;
            padding-top: 4px;
            padding-bottom: 4px;
            align-items: flex-end;
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
              Edit {modalItem.name}
            </div>
            <div className='meal-modal-edit-button'>
              <img className='delete-item-icon' src={deleteIcon} alt="delete item icon" onClick={() => {
                setDeleteModalItem(modalItem);
                setDeleteItemIndex(mealIndex);
                setDeleteModalOpen("deleteMeal");

              }} />
            </div>
            <div className='meal-modal-close-button'>
              <img src={closeIcon} alt="close modal button" onClick={closeModal} />
            </div>
          </div>
          <div className='name-row'>
            <label>Name</label>
            <input className='meal-name-input-field' type='text' defaultValue={modalItem.name} onChange={updateMealName} placeholder='Meal Name...' ></input>
          </div>
          <div className='ingredients-heading'>
            Ingredients
          </div>
          <div className='add-item-row'>
            <input className='add-item-input-field' type='text' onKeyDown={addIngredient} placeholder='Add Item...' ></input>
            <img className='add-item-button' src={addIcon} alt="add item icon" onClick={handleAddIngredientButtonClick} />
          </div>
          <div className='checklist-container'>
            {newMeal.ingredients.length <= 0 && <p>No items</p>}            
            {newMeal.ingredients.map((item, index) => {
              return (
                <div key={index} className='checklist-item'>
                  {/* <input  onChange={() => handleCheckboxClick(index)} className='checkboxes'  type='checkbox' checked={item.checked} ></input> */}
                  <label >{item.name}</label>
                  <img className='delete-item-icon' src={closeIcon} alt="delete item icon" onClick={() => {
                    setDeleteModalItem(item);
                    setDeleteItemIndex(index);
                    setDeleteModalOpen("deleteItem");

                    }} />
                </div>
              )

            })}
            
          </div>
          <div className='meal-modal-footer-wrapper'>
            <div className='meal-modal-footer-button-row'>
              <button onClick={closeModal}>Cancel</button>
              <button className='meal-modal-add-meal-button' onClick={updateMeal} >Save Changes</button>
            </div>
          </div>
        </div>
      </div>

      {deleteModalOpen == "deleteItem" && <DeleteItemModal 
        appState={appState} 
        setAppState={setAppState} 
        modalOpen={deleteModalOpen} 
        setModalOpen={setDeleteModalOpen}
        modalItem={deleteModalItem}
        setModalItem={setDeleteModalItem}
        deleteItemIndex={deleteItemIndex}
        setDeleteItemIndex={setDeleteItemIndex}
        deleteItemFunction={deleteItem}
      />}

      {deleteModalOpen == "deleteMeal" && <DeleteItemModal 
        appState={appState} 
        setAppState={setAppState} 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}
        modalItem={deleteModalItem}
        setModalItem={setDeleteModalItem}
        deleteItemIndex={deleteItemIndex}
        setDeleteItemIndex={setDeleteItemIndex}
        deleteItemFunction={deleteMeal}
      />}


    </>
  );
}
