import React from "react";
import { useGetExampleRequestQuery } from "./services/example";
import Form from "./components/Form";
import './App.scss'

function App() {
  const { data: receivedData, isLoading } = useGetExampleRequestQuery();
  return (
    <div className="App">
      {!isLoading ? <Form defaultData={receivedData} /> : "Loading"}
    </div>
  );
}

export default App;
