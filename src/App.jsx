import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
// import { useState } from 'react'

import '../src/css/index.css'
import { store } from './store/store.js'
import { About } from './pages/About'
import { Home } from './pages/Home'

import { ToyIndex } from './pages/ToyIndex'
import { ConfirmModal } from './cmps/ConfirmModal'

// import { AppHeader } from './cmps/AppHeader'

// import './App.css'

////////////////////////////////////////////////////
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { Provider } from 'react-redux'
import { UserMsg } from './cmps/UserMsg.jsx'
import { ThemeContext } from './contexts/ThemeContext.jsx'
import { useState } from 'react'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'

function App() {
  const [theme, setTheme] = useState()
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Router>
          <AppHeader />
          <main className={`main-container ${theme ? 'dark' : ''}`}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/toy' element={<ToyIndex />}>
                <Route path='edit/:toyId?' element={<ToyEdit />} />
              </Route>
              /
              <Route path='/toy/:toyId' element={<ToyDetails />} />
            </Routes>
          </main>
          <AppFooter />
          <ConfirmModal />
          <UserMsg />
        </Router>
      </ThemeContext.Provider>
    </Provider>
  )
}

export default App
