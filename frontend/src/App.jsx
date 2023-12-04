import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SigninPage from './pages/SigninPage'
import AboutPage from './pages/AboutPage'
import CoursesPage from './pages/CoursesPage'
import CorporatePage from './pages/CorporatePage'
import ContactPage from './pages/ContactPage'
import SignupPage  from './pages/SignupPage'
import PrivateRoute from './components/PrivateRoute'
import ProfilePage from './pages/ProfilePage'




function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/courses' element={<CoursesPage/>} />
        <Route path='/corporate' element={<CorporatePage/>} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route element={<PrivateRoute />}>
       
          <Route path='/profile' element={<ProfilePage />} />
      
        </Route>
      </Routes>
      <p>Developed by: Arpit Lavera</p>
    </BrowserRouter>
  )
}

export default App
