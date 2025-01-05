import { useContext } from 'react';
import './App.css'
import Form from './components/form/Form';
import Table from './components/table/Table'
import { GlobalContext } from './GlobalContext';
import { ToastContainer } from 'react-toastify';

function App() {

  const context = useContext(GlobalContext);
  const {isFormOn} = context || {};

  return (
    <main className='main_section'>
      <h1>Produtos</h1>
      <Table />
      {isFormOn && <Form />}
      <ToastContainer />
    </main>
  )
}

export default App
