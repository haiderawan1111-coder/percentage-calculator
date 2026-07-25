export function loadValuesFromUrl(
  inputX: HTMLInputElement,
  inputY: HTMLInputElement
) {
  const params = new URLSearchParams(window.location.search);

  const x = params.get("x");
  const y = params.get("y");

  if (x !== null) {
    inputX.value = x;
  }

  if (y !== null) {
    inputY.value = y;
  }
}

export function saveValuesToUrl(
  x: string,
  y: string
) {
  const params = new URLSearchParams(window.location.search);

  if (x) {
    params.set("x", x);
  } else {
    params.delete("x");
  }

  if (y) {
    params.set("y", y);
  } else {
    params.delete("y");
  }

  const query = params.toString();

  const url = query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;

  window.history.replaceState({}, "", url);
}