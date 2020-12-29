
import './App.css';
import firebase from 'firebase/app';
import "firebase/auth";
import { config } from './config'
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth"
function App() {

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        <button onClick={() => {
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
          firebase.auth().signInWithPopup(googleAuthProvider)
        }}>
          sign in
        </button>
        <button onClick={() => {
          firebase.auth().signOut()
        }}>
          sign out
        </button>
        <FirebaseAuthConsumer>
          {(props) => {
            console.log(props)
            let {isSignedIn, user, providerId} = props;
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }}
        </FirebaseAuthConsumer>
      </div>
      <IfFirebaseAuthed>
            {() => {
              return <div>You are authenticated</div>;
            }}
      </IfFirebaseAuthed>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>;
            }}
          </IfFirebaseAuthedAnd>
      <div>
      </div>
    </FirebaseAuthProvider>
  );
}

export default App;
