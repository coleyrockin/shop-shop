import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';

const NoMatch = () => {
  return (
    <Jumbotron>
      <h1>404 — Page not found</h1>
      <p>
        <span role="img" aria-label="Looking around">
          🙄
        </span>{' '}
        That page doesn&rsquo;t exist.
      </p>
      <p>
        <Link to="/">← Back to products</Link>
      </p>
    </Jumbotron>
  );
};

export default NoMatch;
