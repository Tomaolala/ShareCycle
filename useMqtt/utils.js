
export function transformData(msg) {
  // 数据对象
  const msgObj = {}
  msg
    .split(';')
    .filter(Boolean)
    .forEach(v => {
      const [key, value] = v.split('=')
      msgObj[key] = value
    })
  // mysql-data存储对象
  // const dbData = {}
  // Object.keys(msgObj).forEach(key => {
  //   const value = msgObj[key]
  //   if(key === 'D1') {
  //     dbData.status = value
  //   } else if (['ctime'].includes(key)) {
  //     dbData[key] = value
  //   } else {
  //     dbData['field' + key.replace('A', '')] = value
  //   }
  // })
  // 错误状态
  // if (dbData.status == 0) {
  //   dbData.type = '0'
  // } else {
  //   dbData.type = '1'
  // }
  return {msgObj}
}