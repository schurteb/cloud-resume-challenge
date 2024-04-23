import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import ColorModeToggleButton from './ColorModeToggleButton';
import LanguageSelector from './LanguageSelector';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const pages: string[] = ['Home', 'About'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElSetting, setAnchorElSetting] = React.useState<null | HTMLElement>(null);
    const theme = useTheme();
    const { t } = useTranslation();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenSettingMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElSetting(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseSettingMenu = () => {
        setAnchorElSetting(null);
    };

    const rootLinkMobile = () => {
        return (
            <Link to="/">
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography>
            </Link>
        );
    }

    const rootLink = () => {
        return (
            <Link to="/">
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: theme.palette.text.primary,
                        textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography>
            </Link>
        );
    }

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* Desktop logo & title */}
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: theme.palette.text.primary }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={rootLink}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        {/*LOGO*/}
                    </Typography>

                    {/* Desktop main menu */}
                    <Box sx={{ flexGrow: 0.75, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => {handleCloseNavMenu(); window.fullpage_api.moveTo(page.toLowerCase())}}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {/*page*/}
                                <Link to={"/#" + page.toLowerCase()}>
                                    <Typography textAlign="center" sx={{color: theme.palette.text.primary}}>
                                        {t("ResponsiveAppBar." + page)}
                                    </Typography>
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    {/* Mobile main menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Tooltip title="Open menu">
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                mt: '45px',
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => {handleCloseNavMenu(); window.fullpage_api.moveTo(page.toLowerCase())}}>
                                    <Link to={"/#" + page.toLowerCase()}><Typography textAlign="center" sx={{color: theme.palette.text.primary}}>{t("ResponsiveAppBar." + page)}</Typography></Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Mobile logo & title */}
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: theme.palette.text.primary }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={rootLinkMobile}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 0.9,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        {/*LOGO*/}
                    </Typography>

                    {/* Desktop theme toggler */}
                    <Box sx={{ flexGrow: 0.05, display: { xs: 'none', md: 'flex' }/*, mr: 2*/ }}>
                        <ColorModeToggleButton />
                    </Box>

                    {/* Desktop language toggler */}
                    <Box sx={{ flexGrow: 0.1, display: { xs: 'none', md: 'flex' }, mr: 2 }}>
                        <LanguageSelector />
                    </Box>

                    {/* Mobile settings box */}
                    <Box sx={{ flexGrow: 0.1, display: { xs: 'flex', md: 'none' } }}>
                        <Tooltip title={anchorElSetting ? "" : "Open settings"}>
                            <IconButton onClick={handleOpenSettingMenu} sx={{ p: 0 }}>
                                <Avatar variant="rounded" sx={{ backgroundColor: "transparent" }}>
                                    <SettingsIcon sx={{color: theme.palette.common.white}} />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElSetting}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElSetting)}
                            onClose={handleCloseSettingMenu}
                        >
                            {/* Mobile theme toggler */}
                            <MenuItem key={"ColorModeToggleMobile"} sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                                <ColorModeToggleButton />
                            </MenuItem>

                            {/* Mobile language toggler */}
                            <MenuItem key={"LanguageSelectorMobile"} sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                                <LanguageSelector />
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;