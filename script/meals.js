const loadMeals = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  const mealsContainer = document.getElementById('meal-container');
  mealsContainer.innerHTML = '';
  meals.forEach(meal => {
    console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.classList.add('col');
    mealDiv.innerHTML = `
            <div class="card bg-light p-3">
                <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                    <button class="d-block mt-5 mx-auto btn btn-primary" onclick="loadMealDetail(${meal.idMeal})">View Recipe</button>
                </div>
            </div>
        `;
    mealsContainer.appendChild(mealDiv)
  })
};

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log("searching",searchText)
    loadMeals(searchText);
    searchField.value = '';
    loadMeals(searchText);
}

const loadMealDetail = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`

    fetch(url)
      .then(res => res.json())
      .then(data => displayMealDetails(data.meals[0]));
}

const displayMealDetails = (meal) => {
  const detailContainer = document.getElementById('detail-container');
  detailContainer.innerHTML='';
  const mealDiv = document.createElement('div');
  mealDiv.classList.add('card');
  mealDiv.classList.add('mb-3');
  mealDiv.innerHTML = `
  <div class="row g-0">
      <div class="col-md-4">
          <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
          <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions}</p>
          </div>
      </div>
  </div>
  `;
  detailContainer.appendChild(mealDiv);
}