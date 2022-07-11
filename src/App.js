import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Todo from './feature/index'
import { ThemeContext, ThemeProvider } from './theme'

function App() {
  return (
    <ThemeProvider>
      <Todo />
    </ThemeProvider>
  )
}

export default App
