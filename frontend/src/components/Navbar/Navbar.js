

import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import Path from '../../constants/Path';

function NavbarFun() {
	const location = useLocation();
	const [open, setOpen] = React.useState(false);
	const [searchActive, setSearchActive] = React.useState(false);

	const handleOpen = () => {
		setOpen(!open);
	};

	let menuRef = useRef();

	useEffect(() => {
		let handler = (e) => {
			if (!menuRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);

	const [Mobile, setMobile] = useState(false);
	return (
		<>
			<nav className="navbar">
				<div className="nav-container">
					<div className="start">
						<div className="logo">
							<button
								className="mobile-menu-icon nav-button"
								onClick={() => setMobile(!Mobile)}
							>
								{Mobile ? <ImCross /> : <FaBars />}
							</button>
							<Link to={Path.HOME}>
								<span className="first-half-logo">TRIP</span>
								<span className="second-half-logo">EASE</span>
							</Link>
						</div>

						<ul
							className={Mobile ? 'navlinks-mobile' : 'navlinks'}
							onClick={() => setMobile(false)}
						>
							<Link
								to={Path.HOME}
								className={`${
									location.pathname === Path.HOME
										? 'active-tab'
										: 'inActive-tab'
								}`}
							>
								Feed
							</Link>
							<Link
								to={Path.MANAGE_EXPENSES}
								className={`${
									location.pathname === '/manageExpense'
										? 'active-tab'
										: 'inActive-tab'
								}`}
							>
								Expense
							</Link>
							<Link
								to={Path.MESSAGE}
								className={`${
									location.pathname === Path.MESSAGE
										? 'active-tab'
										: 'inActive-tab'
								}`}
							>
								Message
							</Link>

							<Link
								to={Path.ALL_PLAN}
								className={`${
									location.pathname === Path.ALL_PLAN
										? 'active-tab'
										: 'inActive-tab'
								}`}
							>
								Plan
							</Link>
						</ul>
					</div>

					<div className={`end ${searchActive ? 'search-active' : ''}`}>
						<div
							className="search"
							onClick={() => {
								setSearchActive(true);
							}}
						>
							<input
								type="text"
								placeholder="Search..."
							/>

							<FaSearch />
						</div>
						{searchActive ? (
							<div
								className="search-close"
								onClick={() => {
									setSearchActive(false);
								}}
							>
								<ImCross />
							</div>
						) : null}
						<div
							className="dropdown"
							ref={menuRef}
						>
							<button
								className="plus nav-button"
								onClick={handleOpen}
							>
								Create
							</button>
							{open ? (
								<ul className="menu">
									<li className="menu-item">
										<Link
											to={Path.CREATE_POST}
											onClick={handleOpen}
										>
											Post
										</Link>
									</li>
									<li className="menu-item">
										<Link
											to={Path.CREATE_LIVE_UPDATES}
											onClick={handleOpen}
										>
											Story
										</Link>
									</li>
									<li className="menu-item">
										<Link
											to={Path.CREATE_PLAN}
											onClick={handleOpen}
										>
											Plan
										</Link>
									</li>
								</ul>
							) : null}
						</div>

						<Link to={Path.PROFILE_PAGE}>
							<button className="profile-pic-navbar">
								<img
									src="/Images/profilePic.jpg"
									alt=" "
								/>
							</button>
						</Link>
					</div>
				</div>
			</nav>
		</>
	);
}

export default NavbarFun;
