import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import ProjectDetails from '../pages/ProjectDetails'
import About from '../pages/About'
import Media from '../pages/Media'
import News from '../pages/News'
import Careers from '../pages/Careers'
import Contact from '../pages/Contact'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Admin from '../pages/Admin/Admin'
import Dashboard from '../pages/Admin/Dashboard'
import AllUsers from '../pages/Admin/AllUsers'
import AllProjects from '../pages/Admin/AllProjects'
import AllNews from '../pages/Admin/AllNews'
import Oops from '../pages/Oops'
import HomeSlider from '../pages/Admin/HomeSlider'
import NewsDetails from '../pages/NewsDetails'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Oops />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'projects',
                element: <Projects />
            },
            {
                path: 'project-details/:url',
                element: <ProjectDetails />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'media',
                element: <Media />
            },
            {
                path: 'news',
                element: <News />
            },
            {
                path: 'news-details/:title',
                element: <NewsDetails />
            },
            {
                path: 'careers',
                element: <Careers />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            }
        ]
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: 'home-slider',
                element: <HomeSlider />
            },
            {
                path: 'all-users',
                element: <AllUsers />
            },
            {
                path: 'all-projects',
                element: <AllProjects />
            },
            {
                path: 'all-news',
                element: <AllNews />
            }
        ]
    },
    {
        path: '/oops',
        element: <Oops />
    }
])

export default router