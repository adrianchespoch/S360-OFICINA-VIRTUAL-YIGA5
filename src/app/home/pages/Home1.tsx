import { Card, Grid, CardContent, Container, Typography, Stack, Box, Select, InputLabel, MenuItem, Button, DialogActions, CircularProgress } from "@mui/material";
const Home1: React.FC = () => {
  const btnStyles = {
    borderRadius: 4
  };
  const cardStyles = {
    borderRadius: 8
  };
  return (
    <Container>
      <Stack spacing={5}>
        <Typography variant="h1">Hola, Sebastián Mite <span>👋</span></Typography>
        <Card sx={cardStyles} elevation={3}>
          <CardContent>
            <InputLabel id="demo-simple-select-label">Seleciona tu Linea de Contrato</InputLabel>
            <Box pt={1}></Box>
            <Select
              value={1}
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              <MenuItem value={1}>GYQ-01492-HOG - CALLE EL ORO Y GARCIA MORENO</MenuItem>
            </Select>
          </CardContent>
        </Card>
        <Box>
          <Grid container spacing={5}>
            <Grid item md={6}>
              <Card sx={cardStyles} variant="elevation" elevation={4}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography>Plan Gravity</Typography>
                    <Typography variant="h1">$ 20,00</Typography>
                    <Typography>Su valor pendiente de pago</Typography>
                  </Stack>
                  <DialogActions>
                    <Button sx={btnStyles} color="info" size="large" variant="contained">Pagar</Button>
                    <Button sx={btnStyles} color="primary" size="large" variant="contained">Suscripción</Button>
                  </DialogActions>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6}>
              <Card sx={cardStyles} variant="elevation" elevation={4}>
                <CardContent>
                  <Stack spacing={1}>

                    <Typography variant="h1">YigaCoins</Typography>
                    <Typography>Descubre tus YigaCoins y conoce los beneficios que Yiga5 tiene para ti.</Typography>
                    <DialogActions>
                      <Button sx={btnStyles} color="info" size="large" variant="contained">Ingresar</Button>

                    </DialogActions>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="h1">Beneficios</Typography>
        <Box>
          <Grid container spacing={5}>
            <Grid item md={6}>
              <Card sx={{ height: 200, backgroundColor: "red" }} variant="elevation" elevation={4}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography sx={{ color: "#FFC908" }} variant="h1">McDonal</Typography>
                    <Typography sx={{ color: "white" }} variant="h3">Beneficio exclusivo por ser cliente Yiga5</Typography>
                  </Stack>
                  <Box py={1}></Box>
                  <DialogActions>
                    <Button
                      sx={btnStyles}
                      color="warning" size="large" variant="contained">
                      <Box my={1}>
                        <Typography variant="h3"><strong>Obtener</strong> </Typography>
                      </Box>
                    </Button>
                  </DialogActions>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6}>
              <Card sx={{ height: 200, backgroundColor: "#FF245D", color: "#FDE676" }} variant="elevation" elevation={4}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography sx={{ color: "#FDE676" }} variant="h1">Zapping</Typography>
                    <Typography sx={{ color: "white" }} variant="h3">Descubre tus licencia Zapping y mira tus partidos.</Typography>
                    <Box py={1}></Box>
                  </Stack>
                  <DialogActions>
                  <Button
                      sx={{...btnStyles,
                        backgroundColor: "#FDE676",
                      }}
                       size="large" variant="contained">
                      <Box my={1}>
                        <Typography variant="h3"><strong>Obtener</strong> </Typography>
                      </Box>
                    </Button>
                  </DialogActions>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Container>
  )
};
export default Home1;