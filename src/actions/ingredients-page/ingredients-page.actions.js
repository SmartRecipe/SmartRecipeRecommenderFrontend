import { apiProxy } from '../../utils/api-proxy.service';
import { apiConstants } from '../../utils/app.constants';
import { actionsIngredients } from '../../utils/app.constants';

/**
 * Sets request as pending
 */
function setRequestPending() {
  return { type: actionsIngredients.pending };
}

/**
 * Sets request as failed
 */
function setRequestFailed() {
  return { type: actionsIngredients.failed };
}

/**
 * Populates redux store with ingredients list
 * @param  {[Object]} ingredients List of ingredients
 */
function update(user) {
  return { type: actionsIngredients.update, user };
}

/**
 * Add new ingredient to Redux store
 * @param  {Object} ingredient  Ingredient to add
 * @return 
 */
export function updateUser(user) {
  const requestBody = {
    user: user,
  }; 

  return (dispatch) => {
    dispatch(setRequestPending());
    apiProxy.post(`${apiConstants.baseUrl}${apiConstants.updateUser}`, requestBody, '123')
    .then((response) => {
      console.log(response);
      dispatch(update(response.user));
    })
    .catch((e) => { // eslint-disable-line
      dispatch(setRequestFailed());
      console.log('Error updating ingredient', e);
    })
  };
}