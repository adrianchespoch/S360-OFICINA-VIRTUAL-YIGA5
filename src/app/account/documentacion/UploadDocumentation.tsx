import { Box, Button, Card, CardContent, Typography, Checkbox, Link, Dialog, DialogContent } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import Webcam from 'react-webcam';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import PersonIcon from '@mui/icons-material/Person';
import CameraIcon from '@mui/icons-material/Camera';
import LightModeIcon from '@mui/icons-material/LightMode';
import WarningIcon from '@mui/icons-material/Warning';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";
//export type Home1Props = {};
export interface GetPreventa {
  data: {
    contrato_aceptado: boolean,
    url_foto_cedula_frontal: string,
    linea_servicio_data: {
      contrato_data: {
        url_contrato: string
      }
    },
    solicitud_servicio_data: {
      razon_social: string
    }
  }
}
interface MyComponentProps {
  dataPreventa: string;
  token: string;
}
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
type WebcamInstance = Webcam & { getScreenshot: () => string | null };
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0; // Generar un número aleatorio entre 0 y 15
    const v = c === 'x' ? r : (r & 0x3 | 0x8); // Formatear el número
    return v.toString(16); // Convertir a hexadecimal
  });
}
const UploadDocumentation: React.FC<MyComponentProps> = ({ dataPreventa, token }) => {
  const webcamRef = useRef<WebcamInstance>(null);
  const [openPdf, setOpenpdf] = useState(false);
  const [onCamera, setOncamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {

    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };
    // Fetch de la imagen en formato binario (blob)
    fetch(
      "http://192.168.10.103:5000/yiga5-erp-dev/images/identificacion/cedula_frontal_1949ade4-0fa6-4016-92c2-b31c91d63616",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob(); // Convierte la respuesta en un blob
      })
      .then((blob) => {
        // Crea un URL para el blob
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl); // Guarda la URL en el estado
      })
      .catch((error) => console.error("Error al obtener la imagen:", error));

    // Limpiar el objeto URL al desmontar el componente
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);
  const uploadImage = async (): Promise<void> => {
    console.log('UploadImage')
    if (capturedImage) {
      const uuid = generateUUID();
      const storageRef = `yiga5/images/aceptacioncontrato/aceptacioncontrato_${uuid}`;
      const myHeaders: Headers = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);
      const requestOptions2: RequestInit = {
        method: "GET",
        headers: myHeaders
      };
      const response2: Response = await fetch(`${import.meta.env.VITE_API_ERP}/auth/generate-temporary-upload-link/?file_name=${storageRef}`, requestOptions2);
      const result2: string = await response2.text();
      const data2 = JSON.parse(result2);
      console.log("preventa:", data2);
      if (data2?.message === "Temporary upload link generated successfully") {
        console.log("temporary uploaud", data2.data);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "image/jpeg");
        const blob = await fetch(capturedImage).then(res => res.blob());
        //const file = "<file contents here>";
        const requestOptions3: RequestInit = {
          method: "PUT",
          headers: myHeaders,
          body: blob,
          redirect: "follow"
        };
        const response3: Response = await fetch(data2.data, requestOptions3);
        if (!response3.ok) {
          throw new Error(`Error en la subida: ${response3.statusText}`);
        }
        const result3: string = await response3.text();
        navigate('/accounts/success');
        
        //const data3 = JSON.parse(result3);
        console.log(result3);
      }
      try {
        // Subir la imagen en formato de base64 a Firebase Storage
        //alert('Imagen subida exitosamente a Firebase Storage');
      } catch (error) {
        console.error('Error subiendo la imagen: ', error);
      }
    }
  };
  const capture = (): void => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      console.log(imageSrc)
      setCapturedImage(imageSrc);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const formatName = (fullName: string): string => {
    const nameParts = fullName.split(" ");
    const firstTwoNames = nameParts.slice(0, 2);
    const capitalizedNames = firstTwoNames.map(
      (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    );
    return capitalizedNames.join(" ");
  };
  const fullName = dataPreventa?.data?.solicitud_servicio_data?.razon_social;
  const nombreCliente = formatName(fullName ? fullName : "");
  return <>
    <Container maxWidth="sm">
      {/*      <Typography align="center" variant="h2"> <strong>Aceptación de Contrato</strong> </Typography> */}
      <Box p={2}></Box>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={5}>
            <Typography variant="h2">Hola, {nombreCliente} validemos tu identidad a través de una foto.</Typography>
            <img src={dataPreventa?.data?.url_foto_cedula_frontal || ""} width="100%" alt="" />
            {/* <div>
              <Typography variant="h4"><strong>Cédula de Identidad</strong></Typography>
              
            </div>
            <Typography variant="h4"><strong>Validacion de identidad</strong></Typography>
            <Typography>Usaremos tu cámara para verificar tu identidad</Typography> */}
            {
              onCamera ? capturedImage ?
                <Stack spacing={1}>
                  {/* <Typography sx={{ fontWeight: "normal" }} variant="h4" >Usaremos esta foto para validar tu identidad</Typography> */}
                  <img src={capturedImage} alt="Captura" width="100%" />
                  <Button
                    startIcon={<DeleteIcon />}
                    style={{ textTransform: "none" }}
                    variant="outlined"
                    color="error"
                    onClick={() => setCapturedImage(null)}
                  >Eliminar foto</Button>
                </Stack> :
                <>
                  <Stack spacing={1}>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      height={290}
                    />
                    <Stack direction="row" spacing={2}>
                      <Button startIcon={<CameraAltIcon />} color="error" variant="outlined" onClick={() => setOncamera(false)}>Cancelar</Button>
                      <Button startIcon={<CameraIcon />} variant="outlined" onClick={capture}>Tomar foto</Button>
                    </Stack>

                  </Stack>
                </>
                :
                <Stack spacing={3}>
                  <Typography>Para continuar necesitamos comprobar que eres tú, por favor revisa las siguientes recomendaciones:</Typography>
                  <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <CameraAltIcon color="primary" />
                    <Typography>Acepta el acceso a tu cámara</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <ContactEmergencyIcon color="primary" />
                    <Typography>Debe ser la misma persona de la cedula</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <PersonIcon color="primary" />
                    <Typography>Tu rostro debe estar centrado</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <LightModeIcon color="primary" />
                    <Typography>Busca un lugar iluminado</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <WarningIcon color="primary" />
                    <Typography>No uses lentes, gorras ni mascarillas</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{
                    justifyContent: "space-evenly",
                  }}>
                    <Button
                      component="label"
                      role={undefined}
                      variant="outlined"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Subir archivos
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => {
                          const filePreview = URL.createObjectURL(event.target.files[0])
                          setCapturedImage(filePreview)
                          setOncamera(true)
                        }}
                        multiple
                      />
                    </Button>
                    <Button startIcon={<CameraAltIcon />} variant="outlined" onClick={() => setOncamera(true)}>Habilitar Camara</Button>
                  </Stack>
                </Stack>
            }
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Checkbox size="large" checked={checked} onChange={handleChange} />
              <Typography>He leído y acepto los</Typography>
              <Link
                component="button"
                variant="body2"
                onClick={() => setOpenpdf(true)}
              >
                Términos y Condiciones del Contrato
              </Link>
            </Stack>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              {/* <img src={avatarfoto} alt="" width="50%" /> */}
            </div>
            <Stack direction="row" spacing={2} sx={{
              justifyContent: "flex-end",
              alignItems: "center",
            }}>
              <Button
                size="large"
                onClick={uploadImage}
                disabled={checked === false || capturedImage == null}
                variant="contained">Enviar confirmación</Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Dialog
        maxWidth="md"
        fullWidth
        onClose={() => setOpenpdf(false)}
        open={openPdf}>
        <DialogContent>
          <embed
            type="application/pdf"
            src="http://192.168.10.103:5000/yiga5-erp-dev/yiga5/pdfs/contratos/contrato-fe821d95-e5d2-4f98-903e-2817c73253b3.pdf"
            width="100%"
            height="800"
          />
        </DialogContent>
      </Dialog>
    </Container>
  </>;
};
export default UploadDocumentation;