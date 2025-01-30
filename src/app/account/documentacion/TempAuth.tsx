import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UploadDocumentation from './UploadDocumentation';
import { Alert, Box, CircularProgress } from '@mui/joy';

export interface PreventaResponse {
  status: number;
  message: string;
  data: {
    status: number;
    message: string;
    data: PreventaData;
  };
}

export interface PreventaData {
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
}

export interface PostAuth {
  status: string;
  message: string;
  data: {
    token: boolean;
  };
}

const TempAuth: React.FC = () => {
  const { uuid } = useParams<Record<string, string | undefined>>();
  const [preventa, setPreventa] = useState<PreventaResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    authLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authLogin = async (): Promise<void> => {
    try {
      setLoading(true);
      const requestOptions2: RequestInit = {
        method: 'GET',
      };
      const response2: Response = await fetch(
        `${import.meta.env.VITE_API_ERP}/preventa/free/${uuid}/`,
        requestOptions2
      );
      const result2: string = await response2.text();
      const result = JSON.parse(result2);
      // Extraemos los datos de PreventaData
      const preventaData: PreventaData = result.data.data;
     
      // Establecemos el estado preventa con toda la respuesta
      setPreventa(result); // Aquí seguimos almacenando el objeto completo PreventaResponse

      if (result?.data?.status === 200) {
        if (preventaData.contrato_aceptado === false) {
          setLoading(false);
        } else {
          navigate('/accounts/success');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return loading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  ) : preventa?.status !== 200 ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Alert color="danger" size="lg" variant="soft">
      Preventa no encontrada
      </Alert>
    </Box>
  ) : (
    // Pasamos preventa.data.data al componente UploadDocumentation
    <UploadDocumentation data={preventa.data.data} />
  );
};

export default TempAuth;
