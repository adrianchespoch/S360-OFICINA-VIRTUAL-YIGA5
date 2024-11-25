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
  const [loading, setLoading] = useState(true);
  const [contrato, setContrato] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    authLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const authLogin = async (): Promise<void> => {
    setLoading(true);
        const myHeaders2: Headers = new Headers();
        myHeaders2.append('Authorization', `Token ${import.meta.env.VITE_TOKEN_ERP}`);
        const requestOptions2: RequestInit = {
          method: 'GET',
          headers: myHeaders2,
        };
        const response2: Response = await fetch(
          `${
            import.meta.env.VITE_API_ERP
          }/preventa/free/${uuid}/`,
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
  };
  return loading ? (
    'Cargando'
  ) : contrato ? (
    'Contrato Aceptado'
  ) : (
    <UploadDocumentation
      dataPreventa={preventa || defaultPreventa}
      token={import.meta.env.VITE_TOKEN_ERP}
    />
  );
};
export default TempAuth;
