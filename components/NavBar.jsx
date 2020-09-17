import authService from "../utils/AuthService";
import { useEffect, useState } from "react";
import localStorageService from "../utils/LocalStorageService";
import Link from "next/link";

const DropDown = ({ items = [], title, initActive = false, children }) => {

    const [active, setActive] = useState(initActive);

    return (
        <ul className={`dropdown${(active) ? "--active" : ''}`}>

            {/* <li onClick={() => {

            }}>{title}</li> */}

            {items.map((item, i) => {

                return <li className="dropdown-item" key={i}>
                    {
                        (!item.onClick) ? <Link className="dropdown-item-link" href={item.href}>{item.content}</Link> :
                            <span className="dropdown-item-link" onClick={item.onClick}>{item.content}</span>
                    }
                </li>
            })}
            {children}
        </ul>
    );
}

const Cart = ({ active = false }) => {
    return (
        <div className={`cart${(active) ? "--active" : ''}`}>
            its cart xD
        </div>
    )
}

const NavBar = () => {

    const [user, setUser] = useState({
        loggedIn: false,
        username: null,
    });

    useEffect(() => {
        const token = localStorageService.get('token');
        const username = localStorageService.get('username');

        setUser({
            loggedIn: (!!token),
            username,
        });
    }, [])

    var userDropDownSet = [];

    if (user.loggedIn) {
        userDropDownSet = [
            { content: 'Profile', href: '/profile' },
            { content: 'Orders', href: '/orders' },
            { content: 'Logout', onClick: authService.logout },
        ];
    } else {
        userDropDownSet = [
            { content: 'Login', href: '/login?to=/' },
            { content: 'Sign-up', href: '/signup?to=/' },
        ];
    }

    return (
        <nav>
            <ul className="menu">
                <li className="menu-item">
                    <Link href={"/"}>Home</Link>
                </li>
                <li className="menu-item">
                    <Link href={"/products"}>Products</Link>
                </li>
                <li className="menu-item">
                    <span>{(user.loggedIn) ? `welcome, ${user.username}` : 'Login/Signup'}</span>
                    <DropDown items={userDropDownSet} />
                </li>
                <li className="menu-item">
                    <span>Cart</span>
                    <Cart />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;