import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { 
  updateUser, 
} from '../../actions/auth/auth.actions';

import IngredientCardComponent from '../../components/cards/ingredient-card.component';
import AddIngredientDialog from '../../components/dialogs/add-ingredient-dialog.component';

const newIngredient = { name: "", quantity: "", unit: "" };

/**
 * Main container for ingredients page
 */
class IngredientsPageContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      ingredient: newIngredient,
      editMode: false,
      showDialog: false,
      ingredientId: null,
    }

    this.onDialogClosed = this.onDialogClosed.bind(this);
    this.onDialogSubmit = this.onDialogSubmit.bind(this);
    this.onDialogFormChange = this.onDialogFormChange.bind(this);
    this.onAddButtonClicked = this.onAddButtonClicked.bind(this);
    this.onIngredientDeleted = this.onIngredientDeleted.bind(this);
    this.onIngredientUnitChange = this.onIngredientUnitChange.bind(this);
    this.onEditIngredientButtonClicked = this.onEditIngredientButtonClicked.bind(this);
  }

  onAddButtonClicked() {
    this.setState({
      showDialog: true,
    });
  }

  onIngredientDeleted(id) {
    let { user } = this.props;

    let { fridge } = user; 

    let { ingredients } = fridge;

    ingredients.splice(id, 1);

    user = {
      ...user,
      fridge: {
        ...fridge,
        ingredients,
      },
    };

    this.props.updateUser(user);
  }

  onDialogClosed() {
    this.setState({
      showDialog: false,
      ingredient: newIngredient
    });
  }

  onDialogSubmit(e, ingredient) {
    this.onDialogClosed();

    let { user } = this.props;

    const { editMode, ingredientId } = this.state;

    let { fridge } = user; 

    let { ingredients } = fridge;

    if (editMode) {
      ingredients[ingredientId] = ingredient;
    } else {
      ingredients.push(ingredient);
    }

    user = {
      ...user,
      fridge: {
        ...fridge,
        ingredients,
      },
    };

    this.props.updateUser(user);

    this.setState({ editMode: false, ingredientId: null });
  }

  onDialogFormChange(e) {
    e.preventDefault();

    const { target } = e;

    switch (target.id) {
      case 'ingredientTitle':
        this.setState({
          ingredient: {
            ...this.state.ingredient,
            name: target.value,
          }
        });
        break;
      case 'quantity':
        this.setState({
          ingredient: {
            ...this.state.ingredient,
            quantity: target.value,
          }
        });
        break;
      default:
        break;
    }
  }

  onIngredientUnitChange(e) {
    const { target } = e;

    const { value } = target;

    this.setState({
      ingredient: {
        ...this.state.ingredient,
        unit: value,
      }
    });
  }

  onEditIngredientButtonClicked(id) {
    let { user } = this.props;

    let { fridge } = user; 

    let { ingredients } = fridge;

    const ingredient = ingredients[id];

    this.setState({
      ...this.state,
      ingredient,
      editMode: true,
      showDialog: true,
      ingredientId: id,
    });
  }


  getIngredientsGrid(ingredients) {
    let totalIngredients = 0;

    if (ingredients) {
      totalIngredients = ingredients.length;
    } 

    let ingredientItemComponents = [];

    for (var i = 0; i < totalIngredients; i++) {
      const currentIngredient = ingredients[i];
      if ((currentIngredient !== undefined) && (currentIngredient !== null)) {
        ingredientItemComponents.push(
          <Grid 
            item
            key={i} 
            container
            spacing={0}
            justify="center"
            alignItems="center"
            xs={6} sm={4} md={3} lg={2} xl={1}>
            <IngredientCardComponent
              id={i}
              key={i}
              ingredient={currentIngredient}
              onDeleteButtonClicked={this.onIngredientDeleted}
              onEditButtonClicked={this.onEditIngredientButtonClicked}
            />
          </Grid>);
      }
    }

    return( 
      <Grid 
        key={"ing_row"} 
        container 
        spacing={8}>
          {ingredientItemComponents}
      </Grid>);
  }

  render() {
    const { 
      user,
      classes, 
      isUserRequestPending,
    } = this.props;

    const { fridge } = user;

    let allIngredients = [];

    if (fridge) {
      const { ingredients } = fridge;
      allIngredients = ingredients;
    }

    const { ingredient, showDialog } = this.state;

    const ingredientsGrid = this.getIngredientsGrid(allIngredients);

    const contentClass = isUserRequestPending ? classes.content : classes.content;

    return (
        <div className={contentClass}>
          <Fab onClick={this.onAddButtonClicked} color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
          {
            isUserRequestPending &&
            <CircularProgress className={classes.progress} thickness={4} size={72}/>
          }
          {
            <AddIngredientDialog
              open={showDialog} 
              ingredient={ingredient}
              onClose={this.onDialogClosed} 
              onSubmit={this.onDialogSubmit} 
              onFormChange={this.onDialogFormChange}
              onUnitChange={this.onIngredientUnitChange}
            />
          }
          {
            ingredientsGrid
          }
        </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    marginTop: '50px',
  },
  contentHidden: {
    opacity: 0.5,
    marginTop: '50px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fab: {
    margin: 24,
    position: 'fixed',
    bottom: 0,
    right: 0,
  },
  progress: {
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    position: 'absolute',
  },
});

IngredientsPageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
  currentRoute: state.navigationReducer.currentRoute,
  isUserRequestFailed: state.authReducer.isUserRequestFailed,
  isUserRequestPending: state.authReducer.isUserRequestPending,
});


const mapDispatchToProps = dispatch => ({
  updateUser: (user) => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IngredientsPageContainer));