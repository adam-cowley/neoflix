import React, { useState } from "react"
import User from '@neoflix/core/auth/user'
import Logo from './images/logo'

interface NavigationProps {
    user?: User;
}

function UserMenu({ user }: NavigationProps) {
    const greeting = `Hello, ${user!.name}`

    return (
        <div className="header__actions">
            <a href="#" className="header__user">
                <span>{greeting}</span>
            </a>
            <a href="#" className="header__register">
                <span>Sign Out</span>
            </a>
        </div >
    )
}

function AnonymousMenu() {
    return (
        <div className="header__actions">
            <a href="#" className="header__user">
                <span>Sign in</span>
            </a>

            <a href="#" className="header__register">
                <span>Register</span>
            </a>
        </div >
    )
}

export default function Navigation({ user }: NavigationProps) {
    // TODO: Error in react-apollo: TypeError: Cannot read properties of null (reading 'useState')
    const [menu, toggleMenu] = [false, (value: boolean) => { }]  // useState<boolean>(false)

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

                            <ul className={`header__nav ${menu ? 'header__nav--active' : ''}`}>
                                <li className="header__nav-item">
                                    <a href="#" className="header__nav-link">
                                        Genres
                                    </a>
                                </li>
                                <li className="header__nav-item">
                                    <a href="#" className="header__nav-link">
                                        People
                                    </a>
                                </li>
                                <li className="header__nav-item">
                                    <a href="#" className="header__nav-link">
                                        Popular Movies
                                    </a>
                                </li>
                                <li className="header__nav-item">
                                    <a href="#" className="header__nav-link">
                                        Latest Releases
                                    </a>
                                </li>
                                <li className="header__nav-item">
                                    <a href="#" className="header__nav-link">
                                        My Favorites
                                    </a>
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