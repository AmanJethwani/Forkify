// Global app controller
// import x from './test';
// const num = 23;
// // whatever we export from the file that will save in x..
// console.log(`I imported ${x} from another module called test.js! variable num is ${x}`);

// import str from './models/Search';

// // import {add as a, multiply as m, ID} from './views/searchView';

// import * as searchView from './views/searchView';

// console.log(`Using imported functions! ${a(ID, 2)} add ${m(3, 5)}. ${str}`);

// console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} add ${searchView.multiply(3, 5)}. ${str}`);
import "../sass/main.scss";

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView'; // Here * is for every thing and as is for from which object where we want to declare it..!!
 // Here * is for every thing and as is for from which object where we want to declare it..!!
import { elements, renderLoader, clearLoader } from './views/base'; // elements is object thats why we write it into curly braces.

/**Global state of the app 
 * - Search object
 * - Current recipe object
 *  - Shopping list object
 * - Liked recipes
*/

const state = {}

/**
* SEARCH CONTROLLER
*/

const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    // const query = 'pizza';

    //console.log(query); //TODO

    if(query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();
    
            // 5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result); // here state.search.result is array with all 30 results...!!
        } catch (err) {
            alert('Something went wrong with the search...');
            clearLoader();
        }

        // we actually want to render the results but when we actually gets the results so we use await function meanwhile we get our result now if we use await in this so we basically use async in beginnig of the function

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();// what is this?
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline'); // closest method = ?
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); //  ye line nahi samajh aayi
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        // console.log(goToPage);
    }
});




/**
* RECIPE CONTROLLER
*/

// const r = new Recipe(46956);
// r.getRecipe();
// console.log(r);
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', ''); // window.location is entire URL and hash is the id
    console.log(id);

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highligt selected search item
        if (state.search) searchView.highlightSelected(id);

        //Create new recipe object
        state.recipe = new Recipe(id);


        try {
            // Get recipe data & parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();
    
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert('Error processing recipe!');
        }
        

    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// it basically fires when the load event is happened

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));




