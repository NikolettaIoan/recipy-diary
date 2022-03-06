import { doc, deleteDoc } from 'firebase/firestore';
import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import styles from './RecipeList.module.css';

function RecipeList({ recipies }) {
  const deleteRep = async (id) => {
    try {
      await deleteDoc(doc(db, 'recipies', id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.reclist}>
      {recipies.map((rec) => {
        return (
          <div key={rec.id} className={styles.recipy}>
            <div className={styles.head}>
              <h2>{rec.title}</h2>
              <button
                className={styles.delete}
                onClick={() => deleteRep(rec.id)}
              >
                ✖
              </button>
            </div>
            <div className={styles.inglist}>
              <b>Ingredients:</b>
              <span>{rec.ingredients.join(', ').substring(0, 30)}...</span>
            </div>
            <div>
              <b>Cooking Time:</b> {rec.time} minutes
            </div>

            <div>
              <b>Method:</b> {rec.method.substring(0, 30)}...
            </div>
            <Link to={`/recipe/${rec.id}`} className={styles.link}>
              See more ➡
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default RecipeList;
