import * as yup from 'yup';

const validateMessage = {
    newPasswordValidate: 'Vui lòng nhập mật khẩu mới',
    confirmPasswordValidate: 'Vui lòng nhập lại mật khẩu mới'
}

export const resetPasswordFormSchema = yup.object({
    newPassword: yup.string().required(validateMessage.newPasswordValidate).min(6, 'Password must be greater than 6'),
    confirmPassword: yup.string().required(validateMessage.confirmPasswordValidate).oneOf([yup.ref('newPassword'), null], 'Vui lòng nhập đúng mật khẩu')
})