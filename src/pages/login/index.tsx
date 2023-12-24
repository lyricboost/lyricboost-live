// ** React Imports
import { ChangeEvent, ReactNode, useState } from 'react'
import { useRouter } from 'next/router'; // Import the useRouter hook
import { supabase } from './../../hooks/auth/supabase'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// import Image from 'next/image'

// const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
//   fontWeight: 600,
//   lineHeight: 'normal',
//   textTransform: 'uppercase',
//   color: theme.palette.text.primary,
//   transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
// }))

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

// ** Icon Imports
import Icon from 'src/@core/components/icon'


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'


interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))


const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginV1 = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })

  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null); // Add error state

  // ** Hook
  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const router = useRouter(); // Initialize the router

  const handleLogin = async () => {
    try {
      // Validate email and password
      if (!email || !values.password) {
        setError('Please provide both email and password.');

        return;
      }

      // Attempt to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: values.password })

      if (error) {
        setError('Error signing in: ' + error.message);
      } else {
        console.log('Signed in successfully:', data);
        router.push('/dashboard'); // Redirect to the dashboard route on success
      }
    } catch (error) {
      setError('Error signing in: ' + error.message);
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          {/* ... (other code) */}
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='email'
              label='Email'
              sx={{ mb: 4 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={e => e.preventDefault()}
                      aria-label='toggle password visibility'
                    >
                      <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {error && (
              <Typography variant='body2' sx={{ color: 'error', mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              fullWidth
              size='large'
              type='button'
              variant='contained'
              sx={{ mt: 2, mb: 7 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <LinkStyled href='/pages/auth/forgot-password-v1'>Forgot Password?</LinkStyled>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ mr: 2 }}>
                New to Lyric Boost?
              </Typography>
              <Typography variant='body2'>
                <LinkStyled href='/pages/auth/register-v1'>Create an account</LinkStyled>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

LoginV1.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginV1
