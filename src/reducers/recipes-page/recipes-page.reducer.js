import initialState from './initial.state';
import { actionsRecipes } from '../../utils/app.constants';

/**
 * Reducer responsible for handling actions performed on Recipes page
 * @param  {Object} state  Initial State to start 
 * @param  {Object} action Which action to perform
 * @return {Object}        New State 
 */
export default function recipesReducer(state = initialState, action = {}) {
 const { recipes } = state;
 
 let recipe = null;

 if (action.recipe) recipe = action.recipe;

 let updatedRecipes = [];

 let index = null;

 switch (action.type) {
    case actionsRecipes.add:
      let found = false;
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id === action.recipe.id) {
          recipes[i] = action.recipe;
          found = true;
        }
      }
      if (!found) {
        recipes.push(action.recipe);
      }
      return {
        ...state,
        recipes,
      };

    case actionsRecipes.get:
      return {
        ...state,
        recipes: action.recipes,
        isFailed: false,
        isPending: false,
      };

    case actionsRecipes.recommend:
      index = state.recipes.findIndex(x=> x.name === recipe.name);
      if (index != -1) {
        state.recipes.splice(index, 1);
      }
      recipe = {
        ...recipe,
        recommended: true,
      }
      if (recipe) updatedRecipes = [recipe, ...state.recipes];
      return {
        ...state,
        recipes: updatedRecipes,
        isFailed: false,
        isPending: false,
      };

    case actionsRecipes.update:
      index = state.recipes.findIndex(x=> x.name === recipe.name);
      if (index != -1) {
        updatedRecipes = [
          ...state.recipes.slice(0, index),
          Object.assign({}, state.recipes[index], recipe),
          ...state.recipes.slice(index+1),
        ];   
      }
      return {
        ...state,
        recipes: updatedRecipes,
        isFailed: false,
        isPending: false,
      };

    case actionsRecipes.pending:
      return {
        ...state,
        isPending: true,
        isFailed: false,
      };

    case actionsRecipes.failed:
      return {
        ...state,
        isFailed: true,
        isPending: false,
      };

    default:
      return state;
  }
}
