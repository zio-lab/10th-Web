import type { FormErrors } from "../hooks/useForm";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const validateLogin = (
  values: LoginFormValues
): FormErrors<LoginFormValues> => {
  const errors: FormErrors<LoginFormValues> = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.email.trim()) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "올바른 이메일 형식을 입력해주세요.";
  }

  if (!values.password.trim()) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (values.password.length < 8) {
    errors.password = "비밀번호는 8자 이상이어야 합니다.";
  }

  return errors;
};