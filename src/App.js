import './App.css';

const formSubmit = (e) => {
  e.preventDefault();
  fetch('http://localhost:8000/api/register', {

    "method": "POST",

    "body": JSON.stringify({
      "name" : e.target[0].value,
      "email" : e.target[1].value,
      "password" : e.target[2].value
    }),

    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    
  }).then(response => response.json())
  .then(e => {
    if(e.status === 'success')localStorage.setItem('token', e.authorisation.token)
  }).catch(e=>console.log(e));
}

function currentUser(e){
  e.preventDefault();
  fetch('http://localhost:8000/api/get-user', {
    'method' : 'GET',
    headers : {
      'Authorization' : 'Bearer' + localStorage.getItem('token'),
      "Accept": "application/json",
    }
  }).then(res => res.json()).then(e=>console.log(e));
}

function App() {
  return (
    <div className="App">
      <div>
        <form onSubmit={formSubmit}>
            <input placeholder='name'/>
            <input placeholder='email'/>
            <input placeholder='password'/>
            <button>tite</button>
        </form>
      </div>
      <button onClick={currentUser}>Click me</button>
    </div>
  );
}

export default App;
