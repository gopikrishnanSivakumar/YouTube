import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const[category, setCategory] = useState(0);
  return (
    <>
        <Navbar setSidebar={setSidebar}/>
        <Routes>
            <Route path ="/" element = {<Home sidebar ={sidebar} category={category} setCategory={setCategory} />}></Route>
            <Route path ="/video/:categoryId/:videoId" element = {<Video/>}></Route>
        </Routes>
    </>

  )
}

export default App