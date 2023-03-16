import * as yup from 'yup';

const validateMessage = {
    nameValidate: 'Vui lòng nhập tên danh mục',
    iconValidate: 'Vui lòng nhập Icon',
}

export const addCategorySchema = yup.object({
    name: yup.string().required(validateMessage.nameValidate),
    icon: yup.string().required(validateMessage.iconValidate)
})