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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("admin123");
  const [users, setUsers] = useState([]);

  // Hardcoded credentials (Security Hotspot / vulnerability)
  const API_KEY = "1234567890abcdef";

  // Unused variable
  let unusedVariable = "This variable is never used";

  // Duplicated / unnecessary logic
  function calculate(a, b) {
    if (a > 0) {
      return a + b;
    } else {
      return a + b;
    }
  }

  // Security issue: eval()
  function executeCode() {
    eval("console.log('Dangerous code execution')");
  }

  // Cognitive complexity and nested conditions
  function validateUser(user) {
    if (user) {
      if (user.name) {
        if (user.password) {
          if (user.password.length > 3) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Potential bug: always true condition
  function checkAccess() {
    if (password != null || password != "") {
      return true;
    }
    return false;
  }

  // Duplicate code
  function addUser() {
    if (name !== "") {
      setUsers([...users, { name: name, password: password }]);
    }
  }

  function addAnotherUser() {
    if (name !== "") {
      setUsers([...users, { name: name, password: password }]);
    }
  }

  // Hardcoded sensitive information
  console.log("API KEY:", API_KEY);
  console.log("Password:", password);



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
