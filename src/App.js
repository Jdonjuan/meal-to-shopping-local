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
    activeScreen: "Meals",
    shoppingList: [],
    meals: [
      {
        name: "Hamburgers",
        image: {
          source: "./resources/HamburerImage",
          alt: "picture of a hamburger"
        },
        ingredients: [
          {
            name:"Hamburger Buns",
            checked: true,
          },
          {
            name:"Hamburger Patties",
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
            name:"Sliced Cheese",
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
        ]
      },
      {
        name: "Sandwiches",
        ingredients: [
          {
            name:"Sandwich Bread",
            checked: true,
          },
          {
            name:"Lettuce",
            checked: true,
          },
          {
            name:"Tomatoes",
            checked: true,
          },
          {
            name:"Lunch Meat",
            checked: true,
          },
          {
            name:"Mayo",
            checked: true,
          },
          {
            name:"Mustard",
            checked: true,
          },
        ]
      },
      {
        name: "Spaghetti & Meatballs",
        ingredients: [
          {
            name:"Spaghetti",
            checked: true,
          },
          {
            name:"Meatballs",
            checked: true,
          },
          {
            name:"Spaghetti Sauce",
            checked: true,
          },
        ]
      },
      {
        name: "Chicken Alfredo",
        ingredients: [
          {
            name:"Chicken Breasts",
            checked: true,
          },
          {
            name:"Pasta",
            checked: true,
          },
          {
            name:"Alfredo Sauce",
            checked: true,
          },
        ]
      },
      {
        name: "Pizza",
        ingredients: [
          {
            name:"Pizza Sauce",
            checked: true,
          },
          {
            name:"Shredded Cheese",
            checked: true,
          },
          {
            name:"Pizza Toppings",
            checked: true,
          },
          {
            name:"Pizza Dough",
            checked: true,
          },
        ]
      },
      {
        name: "Chili",
        ingredients: [
          {
            name:"Canned Beans",
            checked: true,
          },
          {
            name:"Diced Tomatoes",
            checked: true,
          },
          {
            name:"Ground Beef",
            checked: true,
          },
          {
            name:"Onions",
            checked: true,
          },
          {
            name:"Shredded Cheese",
            checked: true,
          },
          {
            name:"Chili Spices",
            checked: true,
          },
        ]
      },
      {
        name: "Kids Snacks",
        ingredients: [
          {
            name:"Chicken Nuggets",
            checked: true,
          },
          {
            name:"Kids Yogurt",
            checked: true,
          },
          {
            name:"Mini Pizzas",
            checked: true,
          },
          {
            name:"Apple Sauce",
            checked: true,
          },
          {
            name:"Cheese Sticks",
            checked: true,
          },
          {
            name:"GoldFish",
            checked: true,
          },
          {
            name:"Fruit Snacks",
            checked: true,
          },
        ]
      },
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
              background-color: #ebfeff;
              height: 100dvh;
              flex-direction: column;
              justify-content: space-between;
              font-family: "Comfortaa", sans-serif;
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
