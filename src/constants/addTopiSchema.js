import * as yup from 'yup';

const validateMessage = {
    nameValidate: 'Vui lòng nhập tên chủ đề',
}

export const addTopicSchema = yup.object({
    name: yup.string().required(validateMessage.nameValidate),

})