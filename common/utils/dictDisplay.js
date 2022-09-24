export function dictDisplay(data, value, keys = { lable: 'typeName', value: 'typeId' }) {
  if (data) {
    const item = data.find((i) => i[keys.value] == value)
    return item ? item[keys.lable] : ''
  }
  return ''
}
