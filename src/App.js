import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box";
import { useState, useEffect } from "react";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [title, setTitle] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) =>
      monster.name.toLocaleLowerCase().includes(searchField)
    );

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="Search Monsters"
        className="monsters-search-box"
      />
      <SearchBox
        onChangeHandler={onTitleChange}
        placeholder="set title"
        className="title-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};
// function App() {
//   const [state, setState] = useState({
//     monsters: [],
//     searchField: "",
//   });

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) => setState({ monsters: users }))
//       .catch((error) => console.log(error));
//   }, []);

//   const handleChange = (e) => {
//     const searchField = e.target.value.toLocaleLowerCase();
//     setState((prevState) => {
//       return { ...prevState, searchField };
//     });
//   };

//   const filteredMonsters = state.monsters.filter((monster) =>
//     !state.searchField
//       ? monster.name.includes("")
//       : monster.name.includes(state.searchField)
//   );

//   useEffect(() => {}, [filteredMonsters]);
// }

export default App;
