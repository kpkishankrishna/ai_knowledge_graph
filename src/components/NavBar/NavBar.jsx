import React from 'react'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import useStyles from './styles';
// import { ClassNames } from '@emotion/react';

const NavBar = () => {
    const classes = useStyles()
    const isMobile = useMediaQuery('(max-width:600px)');
    const theme = useTheme();
    // const dispatch = useDispatch();


    return (
    <>
			<AppBar position="fixed">
				<Toolbar className={classes.toolBar}>
						{isMobile && (
								<IconButton
								color="inherit"
								edge="start"
								style={ {outline : 'none'}}
								onClick={() => {}}
								className={classes.menubutton}
								>
									<Menu />
								</IconButton>
						)}
						<IconButton color="inherit" sx={{ ml: 1}} onClick={() => {}}>
								{theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
						</IconButton>
						{/* {!isMobile && 'Search...'} */}
						<div>
								<Button
										color="inherit"
										component={Link}
										to="/"
										className={classes.linkButton}
										onClick={() => {}}
								>
										{!isMobile && <>Home &nbsp;</>}
								</Button>
								<Button
										color="inherit"
										component={Link}
										to="/cat_dog_classifier"
										className={classes.linkButton}
										onClick={() => {}}
								>
										{!isMobile && <>CatDogClassifier &nbsp;</>}
								</Button>
								<Button
										color="inherit"
										component={Link}
										to="/stable_Diffussion"
										className={classes.linkButton}
										onClick={() => {}}
								>
										{!isMobile && <>Stable Diffussion &nbsp;</>}
								</Button>
						</div>
						
				</Toolbar>
			</AppBar>
    </>
    )
}

export default NavBar