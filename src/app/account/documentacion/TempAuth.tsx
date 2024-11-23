import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UploadDocumentation from './UploadDocumentation';
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
export interface PostAuth {
  status: string;
  message: string;
  data: {
    token: boolean;
  };
}
const defaultPreventa = {
  data: {
    url_foto_cedula_frontal: '',
    solicitud_servicio_data: {
      razon_social: '',
    },
  },
};
const TempAuth: React.FC = () => {
  const { uuid } = useParams<Record<string, string | undefined>>();
  const [preventa, setPreventa] = useState<GetPreventa>();
  const [loading, setLoading] = useState(false);
  const [contrato, setContrato] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    authLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const authLogin = async (): Promise<void> => {
    setLoading(true);
    const myHeaders: Headers = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      username: 'admin',
      password: 'Admin123.',
      force_login: true,
    });
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    try {
      const response: Response = await fetch(
        `${import.meta.env.VITE_API_ERP}/auth/login/`,
        requestOptions
      );
      const result: string = await response.text();
      const data = JSON.parse(result);
      console.log('api auth:', data);
      if (data?.message === 'Inicio de sesión exitoso') {
        const myHeaders2: Headers = new Headers();
        console.log(`Token ${data.data.token}`);
        setToken(data.data.token);
        myHeaders2.append('Authorization', `Token ${data.data.token}`);
        const requestOptions2: RequestInit = {
          method: 'GET',
          headers: myHeaders2,
        };
        const response2: Response = await fetch(
          `${
            import.meta.env.VITE_API_ERP
          }/preventa/free-sales-filters/${uuid}/`,
          requestOptions2
        );
        const result2: string = await response2.text();
        const data2 = JSON.parse(result2);
        console.log('preventa:', data2);
        if (data2?.message === 'Elemento encontrado') {
          console.log(data2.data.contrato_aceptado);
          if (data2.data.contrato_aceptado === false) {
            console.log('preventa', data2);
            setPreventa(data2);
            setLoading(false);
          } else {
            navigate('/accounts/success');
            setContrato(true);
            setLoading(false);
          }
        }
      }
    } catch (error) {
      console.error('Error en la autenticación o preventa:', error);
    }
  };
  return loading ? (
    'Cargando'
  ) : contrato ? (
    'Contrato Aceptado'
  ) : (
    <UploadDocumentation
      dataPreventa={preventa || defaultPreventa}
      token={token}
    />
  );
};
export default TempAuth;
