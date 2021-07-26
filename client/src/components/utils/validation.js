export const CHECK = {
    //공통
    EngCheck : /^[a-zA-Z]*$/,
    SmallEngCheck : /^[a-z]*$/,
    SmallEngNumCheck : /^[a-z0-9+]*$/,
    EngNumCheck: /^[A-Za-z0-9+]*$/,
    NumCheck: /^[0-9]+$/,
    NormalPasswordCheck: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/,
    
    //우리 사이트 전용
    IdCheck : /^[a-z0-9+]{4,12}$/,
    PasswordCheck: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/ // 영문 소문자 1자 이상, 숫자 1자 이상, 특수문자 1자 이상 포함
}

export const VALIDATION = (check, input) => {
    return check.test(input);
}