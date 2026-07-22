export type StatusType = "success" | "error";

export function setStatus(
  valueElement: HTMLElement,
  descriptionElement: HTMLElement,
  value: string,
  description: string,
  type: StatusType
) {
  valueElement.textContent = value;
  descriptionElement.textContent = description;

  valueElement.classList.remove("text-red-600", "text-green-600");
  descriptionElement.classList.remove("text-red-600", "text-green-600");

  if (type === "success") {
    valueElement.classList.add("text-green-600");
    descriptionElement.classList.add("text-green-600");
  } else {
    valueElement.classList.add("text-red-600");
    descriptionElement.classList.add("text-red-600");
  }
}

export function clearStatus(
  valueElement: HTMLElement,
  descriptionElement: HTMLElement
) {
  valueElement.textContent = "—";
  descriptionElement.textContent =
    "Enter values and click Calculate.";

  valueElement.classList.remove("text-red-600", "text-green-600");
  descriptionElement.classList.remove("text-red-600", "text-green-600");
}