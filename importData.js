const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const data = require('./favourites.json'); 

// Function to import data into Firestore
const importData = async () => {
  try {
    // Loop through each item in the JSON data and add it to Firestore
    for (const item of data) {
      await db.collection('your_collection').add(item);
    }
    console.log('Data imported successfully.');
  } catch (error) {
    console.error('Error importing data:', error);
  }
};

// Call the function to import data
importData();
