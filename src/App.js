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
      {
        name:"FirstItem",
        checked: false,
      },
      {
        name:"Cheese",
        checked: false,
      },
      {
        name:"Yogurt",
        checked: false,
      },
      {
        name:"Milk",
        checked: false,
      },
      {
        name:"Cheese",
        checked: false,
      },
      {
        name:"Yogurt",
        checked: false,
      },
      {
        name:"Milk",
        checked: false,
      },
      {
        name:"Cheese",
        checked: false,
      },
      {
        name:"Yogurt",
        checked: false,
      },
      {
        name:"Milk",
        checked: false,
      },
      {
        name:"Cheese",
        checked: false,
      },
      {
        name:"Yogurt",
        checked: false,
      },
      {
        name:"Milk",
        checked: false,
      },
      {
        name:"Cheese",
        checked: false,
      },
      {
        name:"Yogurt",
        checked: false,
      },
      {
        name:"Milk",
        checked: false,
      },
      {
        name:"Cheese",
        checked: false,
      },
      {
        name:"Yogurt",
        checked: false,
      },
      {
        name:"Milk",
        checked: false,
      },
      {
        name:"Cheese",
        checked: false,
      },
      {
        name:"lastItem",
        checked: false,
      },
    ],
    meals: [
      {
        name: "Hamburgers",
        image: {
          source: "./resources/HamburerImage",
          alt: "picture of a hamburger"
        },
        ingredients: [
          {
            name:"Buns",
            checked: true,
          },
          {
            name:"Patties",
            checked: true,
          },
          {
            name:"Tomatoes",
            checked: true,
          },
          {
            name:"Lettuce",
            checked: true,
          },
          {
            name:"Onions",
            checked: true,
          },
          {
            name:"Cheese",
            checked: true,
          },
          {
            name:"Ketchup",
            checked: true,
          },
          {
            name:"Mustard",
            checked: true,
          },
          {
            name:"Ingredient1",
            checked: true,
          },
          {
            name:"Ingredient2",
            checked: true,
          },
          {
            name:"Ingredient3",
            checked: true,
          },
          {
            name:"Ingredient4",
            checked: true,
          },
          {
            name:"Ingredient5",
            checked: true,
          },
          {
            name:"Ingredient6",
            checked: true,
          },
          {
            name:"Ingredient7",
            checked: true,
          },
          {
            name:"Ingredient8",
            checked: true,
          },
          {
            name:"Ingredient9",
            checked: true,
          },
          {
            name:"Ingredient10",
            checked: true,
          },
          {
            name:"Ingredient11",
            checked: true,
          },
          {
            name:"Ingredient12",
            checked: true,
          },
          {
            name:"Ingredient13",
            checked: true,
          },
          {
            name:"Ingredient14",
            checked: true,
          },
          {
            name:"Ingredient15",
            checked: true,
          },
          {
            name:"Ingredient16",
            checked: true,
          },
          {
            name:"Ingredient17",
            checked: true,
          },
          {
            name:"Ingredient18",
            checked: true,
          },
          {
            name:"Ingredient19",
            checked: true,
          },
        ]
      },
      {
        name: "Cereal",
        image: {
          source: "./resources/HamburerImage",
          alt: "picture of a hamburger"
        },
        ingredients: [
          {
            name:"Cereal",
            checked: true,
          },
          {
            name:"Milk",
            checked: true,
          },
        ]
      }
    ]
  }

  let localData = JSON.parse(localStorage.getItem("localAppState"));

  const [appState, setAppState] = useState(localData || defaultData);

  // console.log('appState app', appState);

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
              background-color: #dcf0f1;
              height: 100dvh;
              flex-direction: column;
              justify-content: space-between;
            }

            body {
              background-color: #021526;
              color: black;
            }


          `}
        </style>
        {appState.activeScreen == "ShoppingList" ? <ShoppingList appState={appState} setAppState={setAppState} /> : <Meals appState={appState} setAppState={setAppState}/>}
        <NavBar appState={appState} setAppState={setAppState}/>
    </div>
    </>
  );
}

export default App;
