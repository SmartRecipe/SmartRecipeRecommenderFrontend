import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import IngredientListComponent from '../lists/ingredients-list.component';

/**
 * Dialog which shows recipe in a detailed view
 */
class RecipeViewCard extends Component {
  render() {
    const {
      open, 
      recipe,
      onClose,
      classes,
    } = this.props;
    
    const {
      name: title, 
      instructions: description,
      ingredients,
    } = recipe;

    const showIngredientList = (ingredients.length === 0) ? false : true;

    return (
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {
            showIngredientList &&
            <Typography className={classes.typography} component="h6" variant="h6">Ingredients</Typography>
          }
          {
            showIngredientList &&
            <IngredientListComponent ingredients={ingredients}/>
          }
          <Typography component="h6" variant="h6" className={classes.typography}>
            Method
          </Typography>
          <Typography component="p">
            {description} 
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = theme => ({
  divider: {
    marginTop: 15,
    marginBottom: 15,
  },
  typography: {
    marginTop : 5,
    marginBottom: 5,
  }
});

RecipeViewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeViewCard);