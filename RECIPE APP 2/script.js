const mealsEl = document.getElementById('random-meal');
const favContainer = document.getElementById('fav-meals');
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
const mealPopup = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('close-popup');
const mealInfoEl = document.getElementById('meal-info');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  
  addMeal(randomMeal, true)
}

async function getMealById(id) {
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsBySearch(item) {
  const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + item);
  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
}

//RANDOM MEALS 
function addMeal(mealData, random = false) {
  console.log(mealData);

  const meal = document.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML = `
    <div class="meal-header">
      ${random ? `<span class="random">Random Recipe</span>` : ''}
      <img id="randomImg"
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}">
    </div>
    <div class="random-body" id="random-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn"><i class="fas fa-heart"></i></button>
    </div>
  `

  const btn = meal.querySelector(".random-body .fav-btn");
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove('active');
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add('active');
    }
    
    fetchFavMeals();
  })

  const randomImg = meal.querySelector('#randomImg');
  randomImg.addEventListener('click', () => {
    showMealInfo(mealData);
  })

  mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem('mealIds', JSON.stringify([...mealIds,mealId]))
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem('mealIds'));

  return mealIds === null ? [] : mealIds;
}

//FAV MEALS 
async function fetchFavMeals() {
  favContainer.innerHTML = '';

  const mealIds = getMealsLS();

  for (let i = 0; i < mealIds.length; i++){
    const mealId = mealIds[i];
    meal = await getMealById(mealId);

    addFavMeal(meal);
  }
}

function addFavMeal(mealData) {
  const favMeal = document.createElement('li');

  favMeal.innerHTML = `
    <img id="fav-img"
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
    >
    <span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
  `

  const favImg = favMeal.querySelector('#fav-img');
  favImg.addEventListener('click', () => {
    showMealInfo(mealData);
  })
  
  const btn = favMeal.querySelector('.clear');
  btn.addEventListener('click', () => {
    removeMealLS(mealData.idMeal);
    fetchFavMeals();
  })

  favContainer.appendChild(favMeal);
}

//SEARCH 
searchBtn.addEventListener('click', async () => {
  mealsEl.innerHTML = '';//to empty the random container
  
  const search = searchTerm.value;
  const meals = await getMealsBySearch(search);

  if (meals) {
    meals.forEach(meal => {
      addMeal(meal)
    });
  }
});

//POPUP
function showMealInfo(mealData) {
  mealInfoEl.innerHTML = ''; //to clean the div

  const mealEl = document.createElement('div');
  
  let ingredients = [];
  for (let i = 1; i < 20; i++){
    if (mealData['strIngredient' + i]) {
      ingredients.push(`${mealData['strIngredient' + i]} / ${mealData['strMeasure' + i]}`);
    } else {
      break;
    }
  };
  console.log(ingredients);
  
  mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
    />
    <p>${mealData.strInstructions}</p>
    <h3>Ingredients:</h3>
    <ul>
      ${ingredients
        .map((ing) => `<li>${ing}</li>`).join("")
      }
    </ul>
  `
  mealInfoEl.appendChild(mealEl);

  mealPopup.classList.remove('hidden');
}

popupCloseBtn.addEventListener('click', () => {
  mealPopup.classList.add('hidden');
})