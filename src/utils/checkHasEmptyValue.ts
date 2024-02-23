import { IFormValue } from "../interface/wikiForm";

export const checkFormValue = (formValue: IFormValue) => {
  let result = false;

  const hasEmptyValue = Object.values(formValue).every(
    (value) => value.length === 0
  );

  const confirmAlert = () => {
    const confirmResult = confirm(
      "입력한 내용이 있습니다. 그래도 취소하시겠습니까?"
    );

    if (confirmResult) result = true;
  };

  hasEmptyValue ? (result = true) : confirmAlert();

  return result;
};
