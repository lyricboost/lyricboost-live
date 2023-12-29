
import { ReactNode } from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Layout Import
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'


const Home = () => {
  return (
    <>
      <Box display="flex" alignItems="center" minHeight="100vh" style={{ marginTop: "-100px" }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12}>
            <Box style={{ marginBottom: "50px" }}>
              <Typography variant='h1' style={{ fontWeight: 600, textAlign: 'center', color: '#ffffff', marginBottom: "30px" }}>Boost your songwriting</Typography>
              <Typography variant='h4' style={{ fontWeight: 300, textAlign: 'center', color: '#ffffff' }}>Blast through writer's block and finish songs faster</Typography>
            </Box>
            <Box display="flex" style={{ justifyContent: 'center' }}>
                <Button size='large' variant='contained' href='/login'>Get started</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}


Home.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

export default Home

