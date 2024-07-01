import WebApp from '@twa-dev/sdk';

const getTCSItem = (key: string) => {
  return new Promise((resolve, reject) => {
    WebApp.CloudStorage.getItem(key, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export default getTCSItem;
