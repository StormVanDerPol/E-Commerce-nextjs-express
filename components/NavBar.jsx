import authService from "../utils/AuthService";
import { useEffect, useState } from "react";
import localStorageService from "../utils/LocalStorageService";
import Link from "next/link";

import styles from '../styles/NavBar.module.css';

const DropDown = ({ title, active: _active = false, children }) => {

    //init set active to active boolean from props
    const [active, setActive] = useState(_active);

    //Make sure both 'active' state and prop remain consistent
    useEffect(() => {
        _active = active;
    }, [active])

    return (
        <span className={styles.dropDown}>
            <span className={styles.dropDownTitle}
                onClick={() => {
                    setActive((active) ? false : true);
                }}
            >
                {title}
            </span>
            <span
                className={(active) ? styles.dropDownContent : `${styles.dropDownContent} ${styles.dropDownContent_hidden}`}
            >
                {children}
            </span>
        </span>
    );
}

const Cart = ({ active: _active = false }) => {

    const [active, setActive] = useState(_active);

    return (
        <div className={styles.cart}>
            <span onClick={() => { setActive((active) ? false : true); }}>
                Cart
            </span>
            <div className={(active) ? styles.cartContent : styles.cartContent_hidden}>
                its cart xD
            </div>
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
        userDropDownSet = <>
            <li className={styles.dropDownItem}><Link href={"/profile"}>Profile</Link></li>
            <li className={styles.dropDownItem}><Link href={"/orders"}>Orders</Link></li>
            <li className={styles.dropDownItem}><span onClick={authService.logout}>Logout</span></li>
        </>
    } else {
        userDropDownSet = <>
            <li className={styles.dropDownItem}><Link href={"/login?to=/"}>Login</Link></li>
            <li className={styles.dropDownItem}><Link href={"/signup?to=/"}>Sign-up</Link></li>
        </>
    }

    return (
        <nav>
            <ul className={styles.menu}>
                <li className={styles.menuItem}>
                    <Link href={"/"}>Home</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href={"/products"}>Products</Link>
                </li>
                <li className={styles.menuItem}>
                    <DropDown title={(user.loggedIn) ? `welcome, ${user.username}` : 'Login/Signup'} >
                        {userDropDownSet}
                    </DropDown>
                </li>
                <li className={styles.menuItem}>
                    <Cart />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;