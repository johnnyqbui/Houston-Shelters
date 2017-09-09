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
      {Object.entries(config.openGraph).map((entry, index) => {
        if (entry[1]) {
          return (
            <meta
              property={`og:${entry[0]}`}
              content={entry[1]}
              key={`meta-og-${index}`}/>
          );
        } else {
          return null;
        }
      })}

      {Object.entries(config.twitter).map((entry, index) => {
        if (entry[1]) {
          return (
            <meta
              name={`twitter:${entry[0]}`}
              content={entry[1]}
              key={`meta-twitter-${index}`}/>
          );
        } else {
          return null;
        }
      })}

    </Helmet>
  );
}

export default Meta;
