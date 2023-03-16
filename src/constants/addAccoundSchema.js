import * as yup from 'yup';

const validateMessage = {
    emailValidate: 'Vui lòng nhập email',
    phoneNumberValidate: 'Vui lòng nhập số điện thoại',
    passwordValidate: 'Vui lòng nhập mật khẩu',
    fullNameValidate: 'Vui lòng nhập họ và tên',
    genderValidate: 'Vui lòng chọn giới tính',
    addressValidate: 'Vui lòng nhập địa chỉ',
    avatarValidate: 'Vui lòng chọn ảnh đại diện',
    roleValidate: 'Vui lòng chọn quyền truy cập',
}

export const addCategoryShema = yup.object({
    email: yup.string().required(validateMessage.nameValidate),
    phoneNumber: yup.string().required(validateMessage.iconValidate),

})