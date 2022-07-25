import { object, string } from "yup";
import debounce from "lodash/debounce";

const form = document.querySelector(".form");
const formSchema = object().shape({
  fname: string().required("First Name cannot be empty"),
  lname: string().required("Last Name cannot be empty"),
  email: string()
    .email("Looks like this is not an email")
    .required("Email cannot be empty"),
  password: string()
    .min(8, "Password must be 8 chars or more")
    .required("Password cannot be empty"),
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const dataObject = {
    fname: formData.get("fname"),
    lname: formData.get("lname"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    await formSchema.validate(dataObject, { abortEarly: false });
    form.classList.add("success");
  } catch ({ inner }) {
    inner.forEach(({ path, message }) => {
      const label = form.querySelector(`label[for="${path}"]`);
      const labelError = label.querySelector(".label__error");
      label.classList.add("has-error");
      labelError.textContent = message;
    });
  }
});
