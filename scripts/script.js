const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Grabbing html elements
const searchInput = document.getElementById('search-meal');
const searchButton = document.getElementById('search-button');
const showcaseArea = document.getElementById('meal-showcase-area');
const mealDetailsArea = document.getElementById('meal-details-area');

// Search button event handler
searchButton.addEventListener('click', event => {
   event.preventDefault();
   const searchTerm = searchInput.value.trim();
   if (!searchTerm) {
      alert('Please, search with a valid name');
   } else {
      getMealResult(searchTerm);
   }
});

// Get Meals from API
const getMealResult = async searchTerm => {
   const res = await fetch(`${BASE_URL}/search.php?s=${searchTerm}`);
   const mealsObj = await res.json();
   displayMeals(mealsObj);
};

//Display meals in UI
const displayMeals = mealsObj => {
   const mealList = mealsObj.meals;
   let html = '';
   if (mealList) {
      mealList.map(item => {
         html += `
            <div class="col">
               <div class="card" id="meal-item" onClick = {getMealDetails(${item.idMeal})}>
                  <img class="img-fluid card-img-top w-100" src=${item.strMealThumb} alt=${item.strMeal}/>
                  <div class="text-center my-4"><h4 id="meal-title">${item.strMeal}</h4>
                  </div>
               </div>   
            </div>
         `;
      });
      showcaseArea.innerHTML = html;
   } else {
      alert('No meal found to show!');
   }
};

//Get meal details using API
const getMealDetails = async id => {
   const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
   const mealsObj = await res.json();
   displayMealDetails(mealsObj);
};

//Display Meal Details in the UI
const displayMealDetails = mealsObj => {
   const mealList = mealsObj.meals;
   let html = '';
   mealList.map(item => {
      html += `
         <div class="py-3">
            <img class="w-100 recipe-detail-img" src=${item.strMealThumb} alt=${
         item.strMeal
      }/>
         </div>
         <h1 class="py-4">${item.strMeal}</h1>
         <h5 class="pb-3">Ingredients</h5>
         <p>${item.strMeasure1 || ''} ${item.strIngredient1 || ''} </p>
         <p>${item.strMeasure2 || ''} ${item.strIngredient2 || ''} </p>
         <p>${item.strMeasure3 || ''} ${item.strIngredient3 || ''} </p>
         <p>${item.strMeasure4 || ''} ${item.strIngredient4 || ''} </p>
         <p>${item.strMeasure5 || ''} ${item.strIngredient5 || ''} </p>
         <p>${item.strMeasure6 || ''} ${item.strIngredient6 || ''} </p>
         <p>${item.strMeasure7 || ''} ${item.strIngredient7 || ''} </p>
         <p>${item.strMeasure8 || ''} ${item.strIngredient8 || ''} </p>
         <p>${item.strMeasure0 || ''} ${item.strIngredient9 || ''} </p>
         <p>${item.strMeasure10 || ''} ${item.strIngredient10 || ''} </p>
         <p>${item.strMeasure11 || ''} ${item.strIngredient11 || ''} </p>
         <p>${item.strMeasure12 || ''} ${item.strIngredient12 || ''} </p>
         <p>${item.strMeasure13 || ''} ${item.strIngredient13 || ''} </p>
         <p>${item.strMeasure14 || ''} ${item.strIngredient14 || ''} </p>
         <p>${item.strMeasure15 || ''} ${item.strIngredient15 || ''} </p>
         <p>${item.strMeasure16 || ''} ${item.strIngredient16 || ''} </p>
         <p>${item.strMeasure17 || ''} ${item.strIngredient17 || ''} </p>
         <p>${item.strMeasure18 || ''} ${item.strIngredient18 || ''} </p>
         <p>${item.strMeasure19 || ''} ${item.strIngredient19 || ''} </p>
         <p>${item.strMeasure20 || ''} ${item.strIngredient20 || ''} </p>    
      `;
      mealDetailsArea.innerHTML = html;
   });
};
