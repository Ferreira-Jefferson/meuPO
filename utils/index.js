function redefineTextAreaSize(textarea) {
  const size = textarea.value.split("\n").length + 15;
  textarea.rows = size;
}

export default redefineTextAreaSize;
