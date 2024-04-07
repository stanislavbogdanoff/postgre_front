import { useEffect, useState } from "react";
import "./App.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PERSONS } from "./graphql/query/person";
import { CREATE_PERSON } from "./graphql/mutation/person";

function App() {
  const [personInput, setPersonInput] = useState({ name: "", lastname: "" });
  console.log("personInput", personInput);

  const [users, setUsers] = useState([]);
  const { data: personsData, refetch: refetchPersons } =
    useQuery(GET_ALL_PERSONS);

  const [createPerson] = useMutation(CREATE_PERSON);

  useEffect(() => {
    setUsers(personsData?.getAllPersons);
  }, [personsData]);

  console.log(personsData);

  const handleInput = (e) => {
    setPersonInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addPerson = () => {
    createPerson({
      variables: {
        input: {
          name: personInput.name,
          lastname: personInput.lastname,
        },
      },
    }).then(({ data }) => {
      console.log("DATA", data);
      setPersonInput({ name: "", lastname: "" });
      refetchPersons();
    });
  };

  return (
    <>
      <input
        type="text"
        name="name"
        value={personInput.name}
        onChange={handleInput}
      />
      <input
        type="text"
        name="lastname"
        value={personInput.lastname}
        onChange={handleInput}
      />
      <button onClick={() => addPerson()}>Create</button>

      <div>
        {users?.map((user) => {
          return (
            <div key={user.id}>
              #{user.id}. {user.name}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
