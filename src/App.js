import { useEffect, useState } from "react";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoKCPcZuQLCMW_zx_EziHM_YVZa-hVCDw",
  authDomain: "todo-list-af31c.firebaseapp.com",
  projectId: "todo-list-af31c",
  storageBucket: "todo-list-af31c.appspot.com",
  messagingSenderId: "245868901078",
  appId: "1:245868901078:web:0eb957cea4a9ccffc6cf77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let updatedNotes = [];

function App() {
  const [notes, setNote] = useState([]);
  const [input, setInput] = useState("");
  const [databaseNotes, setDatabaseNotes] = useState(updatedNotes);

  // get data from firebase
  const db = getFirestore(app);

  async function getNotes() {
    const getNotes = await getDocs(collection(db, "notes"));

    getNotes.forEach((doc) => {
      // setDatabaseNotes(...databaseNotes, doc.data().name);

      updatedNotes.push(doc.data().name);
      // console.log(doc.data().name);
      console.log(updatedNotes);
    });
  }

  // add note to database
  async function addNote() {
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        name: input,
      });

      console.log("Added sucesffully" + docRef.id);
    } catch (error) {
      console.log("Error occured" + error);
    }
  }

  useEffect(() => {
    getNotes();
  }, [updatedNotes]);

  return (
    <div className="App">
      <div className="noteContainer">
        <h1>NOTES</h1>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button onClick={addNote}>+</button>
        <div className="notes">
          {databaseNotes &&
            databaseNotes.map((item, index) => <h3 key={index}>{item}</h3>)}
        </div>
      </div>
    </div>
  );
}

export default App;
