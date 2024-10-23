import * as yup from 'yup';

export const cargoFormSchema = yup.object({
  name: yup
    .string()
    .required('El campo name es requerido')
    .max(200, 'El campo name no debe exceder los 200 caracteres'),
  description: yup
    .string()
    .optional()
    .max(200, 'El campo description no debe exceder los 200 caracteres'),

  state: yup
    .boolean()
    .typeError('El campo state es requerido')
    .required('El campo state es requerido'),

  empresa: yup
    .number()
    .typeError('El campo empresa es requerido')
    .optional()
    .nullable(),
});
