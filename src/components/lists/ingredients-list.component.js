import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class IngredientListItem extends React.Component {
  render() {
    const { classes, text, quantity, unit, onDelete } = this.props;

    const showDelete = (onDelete !== undefined) ? true : false;

    const description = `${text} (${quantity} ${unit})`

    return (
      <div>
        <ListItem className={classes.demo}>
          <ListItemText
            primary={description}
            // secondary={secondary ? 'Secondary text' : null}
          />
          <ListItemSecondaryAction>
            {
              showDelete && 
              <IconButton aria-label="Delete" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            }
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }
}

/**
 * Chip component to show ingredients associated with a recipe as a list of items
 */
class IngredientListComponent extends React.Component {

  render() {
    const { classes, ingredients, handleDelete } = this.props;

    return ( 
      <List>
          <Grid 
            key={"ing_row"} 
            container 
            spacing={8}>
               {
                  ingredients.map((data, id) => {
                    return (
                      <Grid 
                        item
                        key={id} 
                        container
                        spacing={0}
                        justify="flex-start"
                        alignItems="flex-start"
                        xs={12} sm={12} md={4} lg={6} xl={6}>
                          <IngredientListItem 
                            key={id} 
                            text={data.name}
                            quantity={data.quantity}
                            unit={data.unit}
                            classes={classes} 
                            onDelete={(handleDelete !== undefined) ? () => handleDelete(id) : undefined}
                          />
                      </Grid>
                    );
                  })
                }
          </Grid>

      </List>
    );
  }
}

IngredientListComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
});

export default withStyles(styles)(IngredientListComponent);

/*

 */