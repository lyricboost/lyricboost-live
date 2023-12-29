// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

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

const BlankLayoutAppBar = () => {
  // ** Hooks & Vars
  const theme = useTheme()
  const { settings } = useSettings()
  const { skin } = settings

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
        <LinkStyled href='/'>
          <HeaderTitle
            variant='h6'
            sx={{ ml: 0, my: 6 }}
          >
            <Image src='/images/lyric-boost-logo.svg' alt={themeConfig.templateName} width='162' height='50' />
          </HeaderTitle>
        </LinkStyled>
      </Toolbar>
    </AppBar>
  )
}

export default BlankLayoutAppBar
