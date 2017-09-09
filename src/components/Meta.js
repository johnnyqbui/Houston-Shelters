import React from 'react';
import {Helmet} from 'react-helmet';

import config from '../config';

const Meta = () => {
  return (
    <Helmet>
      <title>{config.meta.title}</title>
      <meta
        name='description'
        content={config.meta.description}/>
      <link
        rel='shortcut icon'
        href={config.meta.favicon}
        type='image/x-icon'/>
    </Helmet>
  );
}

export default Meta;
