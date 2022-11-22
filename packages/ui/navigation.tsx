import { useState } from "react"
import User from '@neoflix/core/auth/user'
import Logo from './images/logo'

interface NavigationProps {
    user?: User;
}

function UserMenu({ user }: NavigationProps) {
    const greeting = `Hello, ${user.name}`

    return (
        <div className="header__actions">
            {/* <router-link :to="{ name: 'Favorites' }" className="header__user"> */}
            <a href="#" className="header__user">
                <span>{greeting}</span>
            </a>
            {/* </router-link> */}
            {/* <router-link :to="{ name: 'Logout' }" className="header__register"> */}
            <a href="#" className="header__register">
                <span>Sign Out</span>
            </a>
            {/* </router-link> */}
        </div >
    )
}

function AnonymousMenu() {
    return (
        <div className="header__actions">
            {/* <router-link :to="{ name: 'Login' }" className="header__user"> */}
            <a href="#" className="header__user">
                <span>Sign in</span>
                {/* </router-link> */}
            </a>

            {/* <router-link :to="{ name: 'Register' }" className="header__register"> */}
            <a href="#" className="header__register">
                <span>Register</span>
                {/* </router-link> */}
            </a>
        </div >
    )
}

export default function Navigation({ user }: NavigationProps) {
    const [menu, toggleMenu] = useState<boolean>(false)

    return (
        <header className={`header header--static ${menu ? 'header--menu' : ''}`}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="header__content">
                            <button
                                className={`header__menu ${menu ? 'header__menu--active' : ''}`}
                                type="button"
                                onClick={() => toggleMenu(!menu)}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>

                            <div className="header__logo">
                                <Logo />
                            </div>

                            {/* <router-link :to="{ name: 'Home' }" className="header__logo">

                            </router-link> */}

                            <ul className={`header__nav ${menu ? 'header__nav--active' : ''}`}>
                                <li className="header__nav-item">
                                    {/* <router-link className="header__nav-link" :to="{ name: 'GenreList' }"> */}
                                    Genres
                                    {/* </router-link> */}
                                </li>
                                <li className="header__nav-item">
                                    {/* <router-link className="header__nav-link" :to="{ name: 'PeopleList' }"> */}
                                    People
                                    {/* </router-link> */}
                                </li>
                                <li className="header__nav-item">
                                    {/* <router-link className="header__nav-link" :to="{ name: 'PopularMovies' }"> */}
                                    Popular Movies
                                    {/* </router-link> */}
                                </li>
                                <li className="header__nav-item">
                                    {/* <router-link className="header__nav-link" :to="{ name: 'LatestMovies' }"> */}
                                    Latest Releases
                                    {/* </router-link> */}
                                </li>
                                <li className="header__nav-item">
                                    {/* <router-link className="header__nav-link" :to="{ name: 'Favorites' }"> */}
                                    My Favorites
                                    {/* </router-link> */}
                                </li >
                            </ul >

                            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
                        </div >
                    </div >
                </div >
            </div >
        </header >
    )
}