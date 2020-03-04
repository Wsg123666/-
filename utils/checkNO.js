function checkNO(item){
  for(key in item){
    if (!item[key]||item[key]==""){
      return false
    }
    
  }
  return true
}
module.exports = {
  checkNO: checkNO
}