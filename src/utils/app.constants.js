import createHistory from 'history/createBrowserHistory'; // eslint-disable-line

export const history = createHistory();

export const appConstants = {
    appTitle: "Smart Recipe Recommender",
};

export const apiConstants = {
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    signin: 'signon?action=login',
    signup: 'signon?action=sign_up',
    updateUser: 'user?action=update',
    addRecipe: 'cookbook?action=add_recipe',
    editRecipe: 'cookbook?action=edit_recipe',
    getRecipes: 'cookbook?action=get_recipes',
    searchRecipes: 'cookbook?action=search_recipes',
    favouriteRecipe: 'cookbook?action=add_favorites',
    getShowcaseRecipe: 'cookbook?action=get_showcase',
    getRecommendedRecipes: 'cookbook?action=recommend_recipe',
};  

// constants related to in-memory ORM models 
export const ormConstants = {
    nameIngredientModel: 'Ingredient',
}

// properties of items in the navigation menu
export const menuItemProps = {
    loginMenu: {
        id: 0,
        key: "login",
        title: "Login",
        route: "/",
    },
    recipesMenu : {
        id: 1,
        key: "recipes",
        title: "Recipes",
        route: "/recipes",
    },
    ingredientsMenu: {
        id: 2,
        key: "ingredients", 
        title: "Ingredients",
        route: "/ingredients",
    },
    showcase: {
        id: 3,
        key: "showcase", 
        title: "Recommendations",
        route: "/showcase/:name",
    },
}

// constants related to user sign in actions
export const actionsSignIn = {
    failed: "ACTION_SIGN_IN_FAILED",
    pending: "ACTION_SIGN_IN_PENDING",
    success: "ACTION_SIGN_IN_SUCCESS",
    signout: "ACTION_SIGN_OUT",
};

// constants related to user sign in actions
export const actionsUser = {
    failed: "ACTION_USER_FAILED",
    pending: "ACTION_USER_PENDING",
    success: "ACTION_USER_SUCCESS",
    update: "ACTION_USER_UPDATE",
};

// constants related to ingredient actions
export const actionsIngredients = {
    get: "ACTION_GET_INGREDIENTS",
    add: "ACTION_ADD_INGREDIENT",
    delete: "ACTION_DELETE_INGREDIENT",
    update: "ACTION_UPDATE_INGREDIENT",
    pending: "REQUEST_PENDING",
    success: "REQUEST_SUCCESS",
    failed: "REQUEST_FAIL",
};

// constants related to recipe actions
export const actionsRecipes = {
    add: "ACTION_ADD_RECIPE",
    pending: "REQUEST_PENDING",
    success: "REQUEST_SUCCESS",
    failed: "REQUEST_FAIL",
    get: "ACTION_GET_RECIPES",
    delete: "ACTION_DELETE_RECIPE",
    update: "ACTION_UPDATE_RECIPE",
    search: "ACTION_SEARCH_RECIPES",
    recommend: "ACTION_GET_RECOMMEND",
};

// constants related to showcase actions
export const actionsShowcase = {
    get: "ACTION_GET_RECIPES",
    pending: "REQUEST_PENDING",
    failed: "REQUEST_FAILED",
};

// constants related to navigation reducer
// the information on the page changes based on which route user chose
export const actionsNavigation = {
    navigateTo: "ACTION_NAVIGATE_TO",
};

export const ingredientUnits = [
    { id: 1, val: 'lbs.' }, 
    { id: 2, val: 'oz.' }, 
    { id: 3, val: 'kg.' }, 
    { id: 4, val: 'gms.' },
    { id: 5, val: 'ct.' },
    { id: 6, val: 'pc.' },
];

/* eslint-disable */
export const sampleRecipe = {
    name: "Shrimp and Chorizo Paella", 
    description: "\
 \
Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 \
minutes. \
 \
 \
Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high \
heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly \
browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving \
chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, \
salt and pepper, and cook, stirring often until thickened and fragrant, about 10 \
minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil. \
 \
Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook \
without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat \
to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and \
cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 \
minutes more. (Discard any mussels that don’t open.) \
 \
Set aside off of the heat to let rest for 10 minutes, and then serve.",
    shortDescription: "This impressive paella is a perfect party dish and a fun meal to cook together with your \
guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    ingredients: [],
}
/* eslint-enable */