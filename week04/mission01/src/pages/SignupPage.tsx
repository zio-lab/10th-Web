import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignupByStep } from "../utils/validate";
import type { SignupFormValues } from "../utils/validate";

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const validate = (values: SignupFormValues) =>
    validateSignupByStep(values, step);

  const { values, errors, handleBlur } = useForm<SignupFormValues>({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
    },
    validate,
  });

  const handleNext = () => {
    if (step === 1) {
      handleBlur("email");

      if (errors.email || !values.email.trim()) return;

      setStep(2);
      return;
    }

    if (step === 2) {
      handleBlur("password");
      handleBlur("passwordConfirm");

      if (
        errors.password ||
        errors.passwordConfirm ||
        !values.password.trim() ||
        !values.passwordConfirm.trim()
      ) {
        return;
      }

      setStep(3);
      return;
    }

    handleBlur("nickname");

    if (errors.nickname || !values.nickname.trim()) return;

    console.log("회원가입 완료", values);
    navigate("/");
  };

  const handleBack = () => {
    if (step === 1) {
      navigate(-1);
      return;
    }

    if (step === 2) {
      setStep(1);
      return;
    }

    setStep(2);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-6">
        <div className="flex items-center justify-between py-5">
          <h1 className="text-3xl font-extrabold text-pink-500">돌려돌려LP판</h1>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="rounded border border-gray-500 bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              로그인
            </button>

            <button
              type="button"
              className="rounded bg-pink-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-600"
            >
              회원가입
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[360px]">
            <button
              type="button"
              onClick={handleBack}
              className="mb-6 flex items-center text-white"
            >
              <IoChevronBack size={24} />
            </button>

            <h2 className="mb-8 text-center text-3xl font-bold">회원가입</h2>

            <div className="mb-6 text-center text-sm text-gray-400">
              현재 단계: {step}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="h-[48px] w-full rounded-md bg-[#1f1f1f] text-base font-semibold text-gray-500"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}