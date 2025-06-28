import { NavLink, useNavigate } from 'react-router-dom'

export function AppHeader() {
  return (
    <header className='app-header'>
      <section className='app-header-container'>
        <h1>Miss Toys</h1>
        <nav className='app-header-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/toy'>Our Toys!</NavLink>
        </nav>
      </section>
    </header>
  )
}
