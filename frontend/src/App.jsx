import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Register from './pages/Register';
import Users from './pages/Users';
import Products from './pages/Products';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/books" element={<Products />} />
        <Route path="/books/add" element={<AddProduct />} />
          <Route path="/books/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
