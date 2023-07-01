
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './About'
import Contact from './Contact'
import LogFood from './LogFood'
import HomeDisplay from './HomeDisplay'



export default function HomePage() {
    return <body class="home-page">
        <h1>Fitness Tracker(LOGO)</h1>
        <header>
            <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/track">Track Your Progress</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<HomeDisplay />} />
                <Route path='/track' element={<LogFood />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
            </Router>
        </header>
        
    </body>
}