import * as yup from 'yup';

export const zonaFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  has_coverage: yup
    .boolean()
    .typeError('El campo has coverage es requerido')
    .required('El campo has coverage es requerido'),
  state: yup
    .boolean()
    .typeError('El campo state es requerido')
    .required('El campo state es requerido'),

  pais: yup
    .number()
    .typeError('El campo pais es requerido')
    .required('El campo pais es requerido'),
  provincia: yup
    .number()
    .typeError('El campo provincia es requerido')
    .required('El campo provincia es requerido'),
  ciudad: yup
    .number()
    .typeError('El campo ciudad es requerido')
    .required('El campo ciudad es requerido'),
});
