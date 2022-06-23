export function improveUI(element, text) {
  element.textContent = text;
}

export function resetAndCloseForm(form, popup) {
  form.reset();
  popup.close();
}
