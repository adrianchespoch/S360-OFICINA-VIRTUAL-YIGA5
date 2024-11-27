import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import image from './success.png';
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
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={5}>
              <img src={image} width="100%" alt="" />
              <div>
                <Typography align="center" variant="h6">
                  Tu documentación para la validación de identidad ha sido
                  subida con éxito.{' '}
                </Typography>
                <Typography align="center">
                  Te notificaremos una vez que el proceso haya sido completado.{' '}
                </Typography>
              </div>

              {/* <div>
              <Typography variant="h4"><strong>Cédula de Identidad</strong></Typography>
              <img src={preventa?.data?.url_foto_cedula_frontal || ""} width="100%" alt="" />
            </div>
            <Typography variant="h4"><strong>Validacion de identidad</strong></Typography>
            <Typography>Usaremos tu cámara para verificar tu identidad</Typography> */}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
export default SuccessDocumentation;
