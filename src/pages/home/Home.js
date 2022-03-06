import styles from './Home.module.css';

import React from 'react';
import RecipeList from '../../components/RecipeList';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

function Home() {
  const { user } = useAuthContext();
  const { documents, error, isPending } = useCollection('recipies', [
    'uid',
    '==',
    user.uid,
  ]);

  return (
    <div className={styles.home}>
      {error && <h2 className="error">{error}</h2>}
      {isPending && <p className="error">{isPending}</p>}

      {documents && <RecipeList recipies={documents} />}
    </div>
  );
}

export default Home;
