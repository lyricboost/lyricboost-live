

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
        <Grid container>
          <Grid item xs={12}>
              <Grid container justifyContent="center">
                  <Grid item xs={8}>
                    <Box component="div" align="center">
                      <Box sx={{ mb: 10 }}>
                        <Typography sx={{ mb: 5 }} variant='h1' fontWeight={600} color="#ffffff" className="hero-heading fade-in">Boost your songwriting</Typography>
                        <Typography variant='h4'  fontWeight={300} color="#ffffff" className="hero-subheading fade-in">Blast through writer's block and finish songs faster</Typography>
                      </Box>
                      <Button className="fade-in" fontWeight={600} size='large' variant='contained' href='/login'>Start writing</Button>
                    </Box>
                  </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}


Home.getLayout = (page) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

export default Home

