import React, { useState } from 'react'
import './navbar.css';

const Navbar = () => {
    const [underline, setUnderline] = useState(0);
    const [active, setActive] = useState(3);
    const underline0 = () =>{
        setUnderline(0)
    }
    const underline1 = () =>{
        setUnderline(1)
    }
    const underline2 = () =>{
        setUnderline(2)
    }
    const underline3 = () =>{
        setUnderline(3)
    }
  return (
    <nav className='navbar'>
        <div className='logo'><h1>Gennotate</h1></div>
        <ul>
            <li style={{color: underline===1||active===1?'#10a36e':'#919191'}} onMouseEnter={underline1} onMouseLeave={underline0}><div>Home</div><div className='underline' style={{backgroundColor: underline===1||active===1?'#10a36e':'#ffffff', width: underline===1||active===1?'100%':'1%'}}></div></li>
            <li style={{color: underline===2||active===2?'#10a36e':'#919191'}} onMouseEnter={underline2} onMouseLeave={underline0}><div>Synthesis</div><div className='underline' style={{backgroundColor: underline===2||active===2?'#10a36e':'#ffffff', width: underline===2||active===2?'100%':'1%'}}></div></li>
            <li style={{color: underline===3||active===3?'#10a36e':'#919191'}} onMouseEnter={underline3} onMouseLeave={underline0}><div>Segmentation</div><div className='underline' style={{backgroundColor: underline===3||active===3?'#10a36e':'#ffffff', width: underline===3||active===3?'100%':'1%'}}></div></li>
        </ul>
        <div className='user-img'>H</div>
    </nav>
  )
}

export default Navbar
