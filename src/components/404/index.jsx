import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import ErrorPic from '../../assets/error-404-colour-800px.png';

function PageNotFound() {
  return (
    <div>
      <h3>
        Oops. There're nothing here. Head <Link to={ROUTES.HOME}>Home</Link>
      </h3>
      <img alt="error" src={ErrorPic} />
    </div>
  );
}

export default PageNotFound;
