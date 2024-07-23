import logo from './resources/logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ShoppingList from './pages-and-views/ShoppingList';
import Meals from './pages-and-views/Meals';
import NavBar from './components/NavBar';

function App() {
  //////////////////////
  // get local data
  /////////////////////

  let defaultData =  {
    activeScreen: "ShoppingList",
    shoppingList: [
      "Milk",
      "Cheese",
      "Yogurt"
    ],
    meals: [
      {
        name: "hamburgers",
        image: {
          source: "./resources/HamburerImage",
          alt: "picture of a hamburger"
        },
        ingredients: [
          "Buns",
          "Patties",
          "Lettuce",
          "Tomato",
          "Onion",
          "Cheese",
          "Ketchup",
          "Mustard",
        ]
      },
      {
        name: "Cereal",
        image: {
          source: "./resources/HamburerImage",
          alt: "picture of a hamburger"
        },
        ingredients: [
          "Cereal",
          "Milk",
        ]
      }
    ]
  }

  let localData = JSON.parse(localStorage.getItem("localAppState"));

  const [appState, setAppState] = useState(localData || defaultData);

  console.log('appState app', appState);

  // update local storage when appState is updated. 
  useEffect(() => {
    localStorage.setItem('localAppState', JSON.stringify(appState));
  }, [appState]);



  return (
    <>
    <div className='app' >
        <style>
          {`
            .app {
              display: flex;
              background-color: red;
              height: 100dvh;
              flex-direction: column;
              justify-content: space-between;
            }

            body {
              background-color: #282c34;
              color: white;
            }


          `}
        </style>
        {appState.activeScreen == "ShoppingList" ? <ShoppingList appState={appState} setAppState={setAppState} /> : <Meals />}
        <NavBar appState={appState} setAppState={setAppState}/>
    </div>
    </>
  );
}

export default App;
