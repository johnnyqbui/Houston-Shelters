import config from '../config';
import memoize from 'lodash/memoize';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import concat from 'lodash/concat';
import forEach from 'lodash/forEach';

import { getModel } from '../models';

// note that this fetch is memoized, thus only going to
// grab routes once unless cache is explicitly cleared.
const getOrganizationsRoutes = memoize(() => {
  return fetch(`${config.api.baseURLGeneric}/routes`)
    .then((res) => res.json())
    .then((response) => {
      return response.routes.filter((route) => {
        return config.api.organizations.indexOf(route.organization) >= -1;
      });
    });
});

const resetOrganizationsRoutes = getOrganizationsRoutes.cache.clear.bind(getOrganizationsRoutes.cache);

// also memoized.
// neither routes nor model definitions should change often and therefore
// will not re-fetch unless forced to limit api requests.
const getModelDefinition = memoize((routeHelp) => {
  return fetch(`${routeHelp.api_help_url}`);
});

const resetModelDefinitions = getModelDefinition.cache.clear.bind(getModelDefinition.cache);

const getCollection = (routeHelp) => {
  return fetch(`${routeHelp.api_url}`);
}

const mapResolveResponses = (responses) => {
  return responses.map((response) => {
    const responseClone = response.clone();
    return responseClone.json();
  });
}

const getAll = () => {
  return getOrganizationsRoutes()
    .then((routes) => {
      const getModelsDefinitions = routes.map(getModelDefinition);
      const getCollections = routes.map(getCollection);

      const models = Promise
        .all(getModelsDefinitions)
        .then(mapResolveResponses);

      const collections = Promise
        .all(getCollections)
        .then(mapResolveResponses);

      return { models, collections, routes };
    });
}

// This is gross and I will need to redo and add tests for.
// Also, can implement using a more light-weight model/collection implementation.
const getAndInitialize = () => {
  return getAll().then(function(response){ 
    return response.models.then((models) => {
      return response.collections
        .then((collections) => {
          return Promise.all(map(collections, (collection, index) => {
            return collection.then((collectionResponse) => {
              return models[index].then((modelConfig) => {
                  const Model = getModel(response.routes[index].legacy_table_name);
                  return map(collectionResponse.locations, (item) => new Model(modelConfig.fields, modelConfig.filters, item));
                });
            })
          }));
        })
        .then((loadedCollections) => {
          var collections = {};
          return reduce(loadedCollections, (result, collection) => {
            return concat(result, collection);
          }, []);
          return collections;
        });
    });
  });
}

export {
  getOrganizationsRoutes,
  getAll,
  getAndInitialize,
  getModelDefinition,
  resetModelDefinitions,
  resetOrganizationsRoutes
};
