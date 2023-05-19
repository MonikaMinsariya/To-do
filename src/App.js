
import './App.css';
import Todo from './Todo';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const addSuccess = () =>
    toast.success("Task Added Successfully!", { Position: toast.POSITION.BOTTOM_RIGHT })

  const deleteSuccess = () => {
    toast.success("Task Deleted Successfully!")
  }

  const editSuccess = () => toast.success('Task Updated Successfully')

  return (
    <div className="App">
      <Todo
        addSuccess={addSuccess}
        deleteSuccess={deleteSuccess}
        editSuccess={editSuccess}
      />
      <ToastContainer
        transition={Bounce}
        position='bottom-right'
        hideProgressBar={true}
        pauseOnHover={false}
        autoClose={1000}
        theme='dark'
      />
    </div>
  );
}

export default App;
