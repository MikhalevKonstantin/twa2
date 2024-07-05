import WebApp from '@twa-dev/sdk';

const getCloudStorageItem = (key: string): Promise<string | undefined> => {
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

export default getCloudStorageItem;
