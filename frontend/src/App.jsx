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
import AdminPage from './pages/AdminPage'
import ManageCourse from './pages/ManageCourse'
import AddCoursePage from './pages/AddCoursePage'
import CoursePage from './pages/CoursePage'
import UpdateCoursePage from './pages/UpdateCoursePage'




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
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/manage-course' element={<ManageCourse />} />
          <Route path='/add-new-course' element={<AddCoursePage />} />
          <Route path='/update-course/:courseId' element={<UpdateCoursePage />} />
          <Route path='/profile' element={<ProfilePage />} />
      
        </Route>
      </Routes>
      <p>Developed by: Arpit Lavera</p>
    </BrowserRouter>
  )
}

export default App
