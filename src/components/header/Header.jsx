import React from 'react';
import Container from '../container/Container';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true,
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus,
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus,
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus, // means you are logged in
        },
        {
            name: 'Add Posts',
            slug: '/add-posts',
            active: authStatus,
        },
    ];

    return (
        <div className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {/* Conditionally rendered */}
                        {/* Only showing logout button to people who are logged in */}
                        {authStatus ? (
                            <li>
                                <LogoutBtn />
                            </li>
                        ) : null}
                    </ul>
                </nav>
            </Container>
        </div>
    );
};

export default Header;
