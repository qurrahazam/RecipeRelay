import React, { useState, useContext, useEffect } from 'react';
const AppContext = React.createContext()
import axios from 'axios';
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getFavItemFromLocalStorage = () =>{
    let favorites = localStorage.getItem('Fav')
    if (favorites){
      favorites = JSON.parse(localStorage.getItem('Fav'))
    }else {
      favorites = []
    }
    return favorites
  }

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavItemFromLocalStorage());
  
  const fetchMeals = async (url) =>{

    setLoading(true)
      try{
        // through the following line we will have all the properties axios has to offer but we need data we can get it by .data method but i would prefer the following method
        const {data} = await axios(url)
        if (data.meals){
          setMeals(data.meals)
        } else { setMeals([])}
      } catch (error){
        console.log(error.response)
      }
    setLoading(false)
    }

  const fetchRandomMeal = () =>{
    fetchMeals(randomMealUrl)
  }

  const selectMeal = (idMeal, favoriteMeal) =>{
    let meal;
    if (favoriteMeal){
      meal = favorites.find((meal)=>meal.idMeal === idMeal) 
    } else{
    meal = meals.find((meal)=>meal.idMeal === idMeal)}
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const closeModal = () =>{
    setShowModal(false)
  }
  const addToFav = (idMeal)=>{
    const alreadyFav = favorites.find((fav)=>fav.idMeal === idMeal)
    if (alreadyFav) return
    const meal = meals.find((meal)=>meal.idMeal === idMeal)
    const updatedFav = [...favorites, meal]
    setFavorites (updatedFav)
    localStorage.setItem('Fav', JSON.stringify(updatedFav))
  }
  const removeFromFav = (idMeal)=>{
    const updatedFav = favorites.filter((meal)=>meal.idMeal !== idMeal)
    setFavorites(updatedFav)
    localStorage.setItem('Fav', JSON.stringify(updatedFav))
    
  }
  
  useEffect(()=>{
    fetchMeals(allMealsUrl)
  },[])
  
  useEffect(()=>{
    // the following part is if you want to fetch data using fetch method but in my project i'll be using axios
    // const fetchData = async () =>{
    // // we have made this function because useEffect can't be async function.
    //   try{
    //     const response = await fetch('https://randomuser.me/api/')
    //     const data = await response.json()
    //     console.log(data)
        
    //   } catch(error){
    //     console.log(error)
        
    //   }
    // }
    // fetchData()
    // console.log(searchTerm)
    if (!searchTerm) return
      fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])
  

  
  return <AppContext.Provider value={{meals, loading, setSearchTerm, fetchRandomMeal,showModal, setShowModal, selectedMeal, selectMeal, closeModal, addToFav, removeFromFav, favorites}}>
    {children}
  </AppContext.Provider>
}
export const useGolbalContext = () => {
  return useContext(AppContext)
}
  
export { AppContext, AppProvider }
