// ** Next Import
import Link from 'next/link'

import { useState } from 'react'


// ** MUI Imports
import AppBar from '@mui/material/AppBar'
import { Grid, Box, Button } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from 'src/@core/components/icon'
import MenuItem from '@mui/material/MenuItem';

// ** Configs
import themeConfig from 'src/configs/themeConfig'

import Image from 'next/image'



// ** Hook
import { useSettings } from 'src/@core/hooks/useSettings'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const pages = [
  { name: 'Sign In', href: '/login', primary: false },
  { name: 'Sign Up', href: '/register', primary: true }
];


const BlankLayoutAppBar = () => {
  // ** Hooks & Vars
  const theme = useTheme()
  const { settings } = useSettings()
  const { skin } = settings

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      color='default'
      position='sticky'
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        ...(skin === 'bordered' && { borderBottom: `1px solid ${theme.palette.divider}` })
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          p: theme => `${theme.spacing(0, 6)} !important`,
          minHeight: `${(theme.mixins.toolbar.minHeight as number) - (skin === 'bordered' ? 1 : 0)}px !important`
        }}
      >

      <Grid container>
          <Grid item xs={6}>
            <LinkStyled href='/' style={{ display: "inline-flex" }}>
              <HeaderTitle
                variant='h6'
                sx={{ ml: 0, my: 6 }}
              >
                <Image src='/images/lyric-boost-logo.svg' alt={themeConfig.templateName} width='162' height='50' />
              </HeaderTitle>
            </LinkStyled>
          </Grid>

          <Grid item xs={6} sx={{ alignItems: "center" }}>
            <Box sx={{ mt: 3, flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: "end", alignItems: "center" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: "#ffffff" }}
              >
                <Icon icon='mdi:menu' />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
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
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, id) => (
                  <MenuItem key={id} onClick={() => window.location.href = page.href}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ pt: 3, flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "end", alignItems: "center" } }} >
            {pages.map((page, id) => (
              <Button
                variant={page.primary ? "contained" : "text"}
                href={page.href}
                key={id}
                onClick={handleCloseNavMenu}
                sx={{ mr: 5, my: 2, color: (page.primary ? 'black' : 'white'), fontWeight: 600, display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          </Grid>
      </Grid>

      </Toolbar>

    </AppBar>
  )
}

export default BlankLayoutAppBar
