//import _errorToJson from 'error-to-json';
////@ts-ignore, Error in library
//const errorToJson = _errorToJson.default;

const customSerializers = {
  _collection: function(collection) {
    if(collection?.dbName && collection?.collectionName) {
      return {
        dbName: collection.dbName,
        collectionName: collection.collectionName
      }
    }
    return collection
  }
};

export { 
  customSerializers
}
