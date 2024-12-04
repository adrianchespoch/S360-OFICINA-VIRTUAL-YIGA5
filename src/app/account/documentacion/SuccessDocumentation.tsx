import {
  Box,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/joy';
import image from '../../../assets/report-analysis-8.svg';
export interface GetPreventa {
  data: {
    contrato_aceptado: boolean;
    url_foto_cedula_frontal: string;
    linea_servicio_data: {
      contrato_data: {
        url_contrato: string;
      };
    };
    solicitud_servicio_data: {
      razon_social: string;
    };
  };
}

const SuccessDocumentation: React.FC = () => {
  return (
    <>
      <Container maxWidth="sm">
        {/*      <Typography align="center" variant="h2"> <strong>Aceptación de Contrato</strong> </Typography> */}
        <Box p={2}></Box>

        <CardContent>
          <Stack spacing={5}>
            <img src={image} width="100%" alt="" />
            <Box sx={{ textAlign: "center"}}>
              <Typography level="h3" >
                Se ha enviado tu documentación para la validación de identidad.{' '}
              </Typography >
              <Typography >
                Te notificaremos una vez que el proceso haya sido completado.{' '}
              </Typography>
            </Box>
            {/* <div>
              <Typography variant="h4"><strong>Cédula de Identidad</strong></Typography>
              <img src={preventa?.data?.url_foto_cedula_frontal || ""} width="100%" alt="" />
            </div>
            <Typography variant="h4"><strong>Validacion de identidad</strong></Typography>
            <Typography>Usaremos tu cámara para verificar tu identidad</Typography> */}
          </Stack>
        </CardContent>

      </Container>
    </>
  );
};
export default SuccessDocumentation;
