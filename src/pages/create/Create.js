import styles from './Create.module.css';
import Card from '../../components/Card';

import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

function Create() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [method, setMethod] = useState('');
  const [ing, setIng] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const { user } = useAuthContext();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ingredients.length > 0) {
      await addDoc(collection(db, 'recipies'), {
        title,
        time,
        method,
        ingredients,
        uid: user.uid,
      });
      navigate('/');
    }
  };

  const deleteIng = (ing) => {
    setIngredients((prev) => prev.filter((item) => item !== ing));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create your Recipe!</h2>
      <label>
        <span>Title: </span>
        <input
          type="text"
          required
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Cooking Time(minutes): </span>
        <input
          type="number"
          required
          min="0"
          onChange={(event) => setTime(event.target.value)}
          value={time}
        />
      </label>
      <label>
        <span>Ingredients: </span>
        <div>
          <div className={styles.ingBox}>
            <div className={styles['add-ing']}>
              <input
                type="text"
                onChange={(event) => setIng(event.target.value)}
                value={ing}
              />
              <span
                className={styles.addSpan}
                onClick={() => {
                  setIngredients((prev) => [ing, ...prev]);
                  setIng('');
                }}
              >
                Add
              </span>
            </div>
            <p className={styles.ingredients}>
              {ingredients.length > 0 &&
                ingredients.map((ing) => (
                  <span key={ing} onClick={() => deleteIng(ing)}>
                    {ing}
                  </span>
                ))}
            </p>
          </div>
        </div>
      </label>
      <label>
        <span>Method: </span>
        <textarea
          onChange={(event) => setMethod(event.target.value)}
          value={method}
        />
      </label>
      <button>SUBMIT</button>
    </form>
  );
}

export default Create;
