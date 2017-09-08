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
        <meta property="og:url" content={config.meta.ogURL}/>
        <meta property="og:title" content={config.meta.ogTitle}/>
        <meta property="og:description" content={config.meta.ogDescription}/>
        <meta property="og:image" content={config.meta.ogImage}/>
      <link
        rel='shortcut icon'
        href={config.meta.favicon}
        type='image/x-icon'/>
    </Helmet>
  );
}

export default Meta;
