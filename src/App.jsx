import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppHeader />
        <UserMsg />

        <ConfirmModal />
        <main className='main-container'>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/about' element={<About />} />

            <Route path='/toy' element={<ToyIndex />} />
          </Routes>
        </main>
        <AppFooter />
      </Router>
    </Provider>
  )
}

export default App
