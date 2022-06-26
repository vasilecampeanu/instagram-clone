import { addDoc, collection } from "firebase/firestore";

// NOTE: replace 'RZS9rEIh8gQ3bzj2OBtiDYoncnG3' with your Firebase auth user id (can be taken from Firebase at the auth section! Look for User UID)
export const seedDatabase = (db : any) => {
    const dbRefUsers  = collection(db, "users");
    const dbRefPhotos = collection(db, "photos");

    const users = [
        {
            userId: 'RZS9rEIh8gQ3bzj2OBtiDYoncnG3',
            username: 'karl',
            fullName: 'Karl Hadwen',
            emailAddress: 'karlhadwen@gmail.com',
            following: ['2'],
            followers: ['2', '3', '4'],
            dateCreated: Date.now()
        },
        {
            userId: '2',
            username: 'raphael',
            fullName: 'Raffaello Sanzio da Urbino',
            emailAddress: 'raphael@sanzio.com',
            following: [],
            followers: ['RZS9rEIh8gQ3bzj2OBtiDYoncnG3'],
            dateCreated: Date.now()
        },
        {
            userId: '3',
            username: 'dali',
            fullName: 'Salvador Dalí',
            emailAddress: 'salvador@dali.com',
            following: [],
            followers: ['RZS9rEIh8gQ3bzj2OBtiDYoncnG3'],
            dateCreated: Date.now()
        },
        {
            userId: '4',
            username: 'orwell',
            fullName: 'George Orwell',
            emailAddress: 'george@orwell.com',
            following: [],
            followers: ['RZS9rEIh8gQ3bzj2OBtiDYoncnG3'],
            dateCreated: Date.now()
        }
    ];

    for (let i = 0; i < users.length; i++) {
        // Prior to firebase V9: firebase.firestore().collection('users').add(users[k]);
        addDoc(dbRefUsers, users[i]).then(docRef => {
            console.log("Document has been added successfully");
        }).catch(error => {
            console.log(error);
        })
    }

    for (let i = 1; i <= 5; ++i) {
        // Prior to firebase v9
        // firebase
        //     .firestore()
        //     .collection('photos')
        //     .add({
        //         photoId: i,
        //         userId: '2',
        //         imageSrc: `/images/users/raphael/${i}.jpg`,
        //         caption: 'Saint George and the Dragon',
        //         likes: [],
        //         comments: [
        //             {
        //                 displayName: 'dali',
        //                 comment: 'Love this place, looks like my animal farm!'
        //             },
        //             {
        //                 displayName: 'orwell',
        //                 comment: 'Would you mind if I used this picture?'
        //             }
        //         ],
        //         userLatitude: '40.7128°',
        //         userLongitude: '74.0060°',
        //         dateCreated: Date.now()
        //     });
        addDoc(dbRefPhotos, {
            photoId: i,
            userId: '2',
            imageSrc: `/assets/scrimba/users/raphael/${i}.jpg`,
            caption: 'Saint George and the Dragon',
            likes: [],
            comments: [
                {
                    displayName: 'dali',
                    comment: 'Love this place, looks like my animal farm!'
                },
                {
                    displayName: 'orwell',
                    comment: 'Would you mind if I used this picture?'
                }
            ],
            userLatitude: '40.7128°',
            userLongitude: '74.0060°',
            dateCreated: Date.now()
        }).then(docRef => {
            console.log("Document has been added successfully");
        }).catch(error => {
            console.log(error);
        });
    }
}
