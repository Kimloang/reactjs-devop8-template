import { BrowserRouter as BigRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CustomNavBar from './components/CustomNavBar';
import NotFoundPage from './pages/NotFoundPage';
import Service from './pages/Service';
import AboutUs from './pages/AboutUs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductDashBoard from './pages/admin/ProductDashBoard';
import Dashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/admin/UserDashboard';
import { useContext, useEffect, useState } from 'react';
import Layout from './components/routes/Layout';
import { ToastContainer } from 'react-toastify';
import AuthContext, { AuthContextProvider } from './components/shared/AuthContext';
import { GET_OWN_PROFILE } from './services/userService';
function App() {

  const [isValidated, setIsValidated] = useState(
    localStorage.getItem("tokens") ? true : false
  )
   
  
  const handleLoginCallBack = (value) => {
    setIsValidated(value) // get value from navbar 
  }


  // What make reactjs failed in sonarqube 
  
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  // Code smell: unused variable
  const unusedVariable = "SonarQube Testing";

  // Security hotspot / hardcoded credential
  const API_KEY = "1234567890_SECRET_API_KEY";

  // Code smell: duplicated logic
  const calculateTotal = (a, b) => {
    return a + b;
  };

  const calculateSum = (x, y) => {
    return x + y;
  };

  // High cognitive complexity and nested conditions
  const validateUser = (user) => {
    if (user) {
      if (user.name) {
        if (user.name.length > 0) {
          if (user.age) {
            if (user.age > 18) {
              if (user.email) {
                if (user.email.includes("@")) {
                  return true;
                }
              }
            }
          }
        }
      }
    }

    return false;
  };

  // Potentially unsafe DOM manipulation
  const displayMessage = (message) => {
    document.getElementById("message").innerHTML = message;
  };

  const addUser = () => {
    if (name !== "") {
      const newUser = {
        id: users.length + 1,
        name: name,
        age: 20,
        email: name + "@example.com",
      };

      if (validateUser(newUser)) {
        setUsers([...users, newUser]);
        setName("");
        displayMessage("User added successfully!");
      } else {
        displayMessage("Invalid user!");
      }
    } else {
      displayMessage("Name is required!");
    }
  };

  // Potential division by zero
  const divideNumbers = (a, b) => {
    return a / b;
  };

  // Unnecessary condition
  const checkStatus = (status) => {
    if (status === true) {
      return true;
    } else {
      return false;
    }
  };

  // Function with unused parameters
  const processData = (data, unusedParam) => {
    return data.map((item) => item * 2);
  };




  return (

    // !isLoading && 

    <BigRouter>
      <AuthContextProvider>
        <CustomNavBar
          isAuthenticated={isValidated}
          loginCallBack={handleLoginCallBack}
        />
        <Routes>

          {!isValidated ?
            <>
              <Route index
                element={
                  <Layout includeFooter={true}>
                    <HomePage />
                  </Layout>
                } />

              <Route path="/service"
                element={
                  <Layout includeFooter={true}>
                    <Service />
                  </Layout>} />
              <Route path="/aboutus"
                element={
                  <Layout includeFooter={true}>
                    <AboutUs />
                  </Layout>
                } />
              <Route path="/products" element={<Products />} />
              {/* /products/12 */}
              <Route path="/products/:id" element={<ProductDetail />} />
            </>
            :
            <>
              {/* these are for the admin page  */}
              <Route path='/admin/products' element={<ProductDashBoard />} />
              <Route index element={<Dashboard />} />
              <Route path='/admin/users' element={<UserDashboard />} />
            </>
          }
          <Route path="*" element={<NotFoundPage />} />

        </Routes>

        <ToastContainer />
      </AuthContextProvider>
    </BigRouter>

  );
}

export default App;
