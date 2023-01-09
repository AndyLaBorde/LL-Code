import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the jate db');

  // create a connection to the database 'jate' version '1'
  const jateDb = await openDB('jate', 1);
  // create a new transaction and specify the database 'jate' and data privilages 'readwrite'
  const tx = jateDb.transaction('jate', 'readwrite');
  // open upthe desired objectStore
  const store = tx.objectStore('jate');
  // use the .add() method on the store and pass in content
  const request = store.add({ note: content });
  // Get the confirmation of request
  const result = await request;
  
  console.log('🚀 - Data saved to the database', result)

  // console.error('putDb not implemented');
}
// TODO: Add logic for a method that gets all the content from the database
// export a function we will, use to GET all data from database
export const getDb = async () => {
  console.log('GET all from the database');
   // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll('note');
   // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  // console.error('getDb not implemented');
  return result;

}
initdb();
