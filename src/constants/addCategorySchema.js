import * as yup from 'yup';

const validateMessage = {
    nameValidate: 'Vui lòng nhập tên danh mục',
    thumbnailValidate: 'Vui lòng nhập Icon',
}

export const addCategorySchema = yup.object({
    name: yup.string().required(validateMessage.nameValidate),
    thumbnail: yup.string().required(validateMessage.thumbnailValidate)
})