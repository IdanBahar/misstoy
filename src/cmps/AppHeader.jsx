import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '../contexts/ThemeContext'

export function AppHeader() {
  const { theme, setTheme } = useContext(ThemeContext)

  function onToggleTheme() {
    console.log('theme:', theme)
    setTheme((prevTheme) => (prevTheme ? '' : 'dark'))
  }
  return (
    <header className={`app-header ${theme ? 'dark' : ''} `}>
      <section className='app-header-container'>
        <h1>Miss Toys</h1>
        <nav className='app-header-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/toy'>Our Toys!</NavLink>
          <button
            className={`theme-toggle-switch ${theme ? 'dark' : 'light'}`}
            onClick={() => onToggleTheme()}
            aria-label='Toggle theme'
          >
            <span className='toggle-circle' />
          </button>
        </nav>
      </section>
    </header>
  )
}
