import styles from './Recipe.module.css';

import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

function Recipe() {
  let { id } = useParams();
  const { data: recipe, isPending, error } = useDocument(id, 'recipies');

  const output =
    recipe !== null ? (
      <div className={styles.recipe}>
        <h2>{recipe.title}</h2>
        <p>
          <b>Ingredients:</b> {recipe.ingredients.join(' ,')}
        </p>
        <p>
          <b>Cooking Time:</b> {recipe.time} minutes
        </p>
        <p>
          {' '}
          <b>Method:</b> {recipe.method}
        </p>
      </div>
    ) : (
      <p>No recipes found</p>
    );
  return (
    <>
      {error && <p>{error}</p>}
      {isPending && <p>{isPending}</p>}
      {output}
    </>
  );
}

export default Recipe;
