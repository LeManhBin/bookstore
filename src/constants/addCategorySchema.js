import * as yup from 'yup';

const validateMessage = {
    nameValidate: 'Vui lòng nhập tên danh mục',
}

export const addCategorySchema = yup.object({
    name: yup.string().required(validateMessage.nameValidate),
})