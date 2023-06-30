import homeImage from '../images/home-image.png'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './About'
import Contact from './Contact'
import LogFood from './LogFood'



export default function HomePage() {
    return <body class="home-page">
        <h1>Fitness Tracker(LOGO)</h1>
        <header>
            <Router>
            <nav>
                <ul>
                    <li className="selectedTab"><Link className="selectedTabLink" to="/">Home</Link></li>
                    <li><Link to="/track">Track Your Progress</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path='/track' element={<LogFood />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
            </Router>
        </header>
        <img src={homeImage} alt="Nutritious foods" />
        <div class="intro">
            <h1>WELCOME!</h1>
            <h3>The world's #1 food and calorie tracking website.
                Let's get you started on a journey toward an healthier lifestyle.</h3>
        </div>
    </body>
}