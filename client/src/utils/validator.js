export function bodyValidator(body) {
    if (!/^([a-z0-9A-Z_]+)@(naver|gmail)\.com$/.test(body.email)) {
        throw new Error('naver.com 나 gmail.com 으로만 가입 가능합니다.')
    } else if (!/^[a-z0-9A-Z]{8,16}$/.test(body.password)) {
        throw new Error('비밀번호는 8자 이상, 16자 이하여야 합니다.')
    } else if (!/[a-z]+/.test(body.password) || !/[A-Z]+/.test(body.password) || !/[0-9]+/.test(body.password)) {
        throw new Error('비밀번호에는 영문 대문자, 영문 소문자, 숫자가 각각 1글자 이상 포함되어야 합니다.')
    } else if (body.password_confirm && body.password !== body.password_confirm) {
        throw new Error('비밀번호와 비밀번호 확인값이 다릅니다.')
    }
}