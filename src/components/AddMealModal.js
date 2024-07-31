import React from 'react';
import { useEffect, useState } from 'react';
import closeIcon from '../resources/close_24.svg';
import DeleteItemModal from './DeleteItemModal';

// import mealsIcon from '../resources/restaurant_24.svg';
// import shoppingListIcon from '../resources/list_24.svg';

export default function AddMealModal({
  appState, 
  setAppState, 
  modalOpen, 
  setModalOpen, 
  modalItem, 
  setModalItem, 
  deleteItemIndex, 
  setDeleteItemIndex, 
  deleteItemFunction 
}) {
  // console.log('appState', appState);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  function closeModal() {
    setModalOpen("none");
  }

  function handleDeleteItem(e) {
    deleteItemFunction(deleteItemIndex);
    setDeleteItemIndex(null);
    setModalItem(null);
    closeModal();

  }


  return (
    <>
      <style>
        {`

          .modal-background {
            background-color: white;
            opacity: .75;
            width: 100dvw;
            height: 100dvh;
            position: fixed;
            bottom: 0px;
            z-index: 1;
          }
          
          .modal-wrapper {
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

          .modal-card {
            z-index: 2;
            background-color: white;
            border-radius: 18px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding: 24px;
            margin: 8px;
            box-shadow: 0 0 30px -8px;
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
          }

          .modal-heading {
            font-size: 18px;
            font-weight: 700;
          }

          .modal-close-button {
          
          }

          .modal-body {
            padding: 8px;
          }

          .modal-buttons-row {
            display: flex;
            align-items: center;
            justify-content: space-around;
          }

          .modal-delete-button {
            background-color: red;
          }
        `}
      </style>
      <div className='modal-wrapper'>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <div className='modal-header'>
            <div className='modal-heading'>
              Meal Name
            </div>
            <div className='modal-close-button'>
              <img src={closeIcon} alt="close modal button" onClick={closeModal} />
            </div>
          </div>
          <div className='modal-body'>
            Are you sure you want to delete <strong>{modalItem.name}</strong>?
          </div>
          <div className='modal-buttons-row'>
            <button onClick={closeModal}>Cancel</button>
            <button className='modal-delete-button' onClick={handleDeleteItem}>Delete</button>
          </div>

        </div>
      </div>

      {deleteModalOpen && <DeleteItemModal 
        appState={appState} 
        setAppState={setAppState} 
        modalOpen={deleteModalOpen} 
        setModalOpen={setDeleteModalOpen}
        modalItem={modalItem}
        setModalItem={setModalItem}
        deleteItemIndex={deleteItemIndex}
        setDeleteItemIndex={setDeleteItemIndex}
        deleteItemFunction={deleteItem}
        />}

    </>
  );
}
