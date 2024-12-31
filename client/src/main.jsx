import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import TaskBox from './components/TaskBox.jsx'
import Swipe from './components/Swipe.jsx'
import InputOnButtonClick from './components/InputOnButtonClick.jsx'
import DragDrop from './components/DragDrop.jsx'


createRoot(document.getElementById('root')).render(
  <>
    {/* <App /> */}
    <Home />
    {/* <DragDrop /> */}
    {/* <InputOnButtonClick /> */}
    {/* <TaskBox /> */}
  </>,
)
