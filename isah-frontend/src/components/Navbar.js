import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'
import '../styles/Common.css'

const Navbar = (props) => {
	const {bgcolor} = props;
	return(
		<React.Fragment>
			{bgcolor ? 
			<nav>
				<div className='.container-fluid' style={{background: bgcolor}}>
					<div className='row navbar-main-color ml-0 mr-0 align-items-center'>
						<div className='col-5 col-md-2'>
							<Link to='/'>
								<img src={require('../logos/full_monochrome_logo_transparent.png')} width='100%' alt='logo'></img>
							</Link>
						</div>
						<div className='col-7 col-md-10 navbar-box-color'>
							<div className='justify-content-start'>
								{/* <div className='row h-100 align-items-center'>
									<div className='col'>
										LOGO
									</div>
									<div className='col d-none d-sm-block'>
										<Link to='/'>
											HOME
										</Link>
									</div> */}
									{/* SEARCH ON NAVBAR */}
									{/* <div className='col d-none d-sm-block'>
										<div className='input-container-color'>
											<i className="fas fa-search icon-color"></i>
											<input type='text' className='input-field-color' placeholder='SEARCH'></input>
										</div>
									</div>
									<div className='col d-xs-block d-sm-none'>
											<i className="fas fa-search icon text-white"></i>
									</div> */}
								{/* </div> */}
							</div>
							<div className='justify-content-end'>
								<Link to='/profile'>
									<button className='button-rounded-white'>
										<span className='mr-3'><i className="fas fa-user"></i></span>
										Profile
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>						
			</nav>
			:
			<nav>
				<div className='.container-fluid'>
					<div className='row navbar-main ml-0 mr-0 align-items-center'>
						<div className='col-5 col-md-2'>
							<Link to='/'>
								<img src={require('../logos/full_colored_logo.png')} width='100%' alt='logo'></img>
							</Link>
						</div>
						<div className='col-7 col-md-10 navbar-box'>
							<div className='justify-content-start'>
								{/* <div className='row h-100 align-items-center'> */}
									{/* <div className='col'>
										LOGO
									</div>
									<div className='col d-none d-sm-block'>
										<Link to='/'>
											HOME
										</Link>
									</div> */}
									{/* SEARCH ON NAVBAR */}
									{/* <div className='col d-none d-sm-block'>
										<div className='input-container'>
											<i className="fas fa-search icon"></i>
											<input type='text' className='input-field' placeholder='SEARCH'></input>
										</div>
									</div>
									<div className='col d-xs-block d-sm-none'>
											<i className="fas fa-search icon"></i>
									</div> */}
								{/* </div> */}
							</div>
							<div className='justify-content-end'>
								<Link to='/profile'>
									<button className='button-rounded-black'>
										<span className='mr-3'><i className="fas fa-user"></i></span>
										Profile
									</button>
								</Link>
							</div>
						</div>
					</div>
					
				</div>						
			</nav>}
		</React.Fragment>
	)
}

export default Navbar;