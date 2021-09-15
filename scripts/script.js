const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
//search by name
//https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
//full deatails by id
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772

// Grabbing html elements
const searchInput = document.getElementById('search-meal');
const searchButton = document.getElementById('search-button');
const showCaseArea = document.getElementById('meal-showcase-area');
const mealDetailsArea = document.getElementById('meal-details-area');

// Search button event handler
searchButton.addEventListener('click', event => {
   event.preventDefault();
   const searchTerm = searchInput.value.trim();
   console.log(searchTerm);
   if (!searchTerm) {
      let output = '';
      output += `<div class="text-center not-found">No meal found to show!</div>`;
      showCaseArea.innerHTML = output;
   } else {
      getMealResult(searchTerm);
      mealDetailsArea.innerHTML = '';
   }
});

// Get Meals from API
const getMealResult = async searchTerm => {
   const res = await fetch(`${BASE_URL}/search.php?s=${searchTerm}`);
   const mealsObj = await res.json();
   displayMeals(mealsObj);
};

//Show meals in UI

const displayMeals = mealsObj => {
   const mealList = mealsObj.meals;
   let output = '';
   mealList.map(x => {
      output += `
         <div class="col">
            <div class="card">
               <img class="img-fluid card-img-top w-100" src=${x.strMealThumb} alt=${x.strMeal}/>
               <div class="meal-title text-center my-4"><h4>${x.strMeal}</h4></div>
            </div>
            
         </div>
      `;
   });
   showCaseArea.innerHTML = output;
};
