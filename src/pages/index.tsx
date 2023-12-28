
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Home = () => {
  return (
    <>
      <Box display="flex" alignItems="center" minHeight="100vh" style={{ marginTop: "-100px" }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12}>
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant='h1' style={{ fontWeight: 600, textAlign: 'center' }}>Blast through writer's block</Typography>
              <Typography variant='h4' style={{ fontWeight: 400, textAlign: 'center' }}>Songwriting inspiration with AI superpowers</Typography>
            </Box>
            <Box display="flex" style={{ justifyContent: 'center' }}>
                <Button variant='contained' href='/login'>Get started</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Home
