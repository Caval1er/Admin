export function getSidebarOpenedStatus() {
  const status = sessionStorage.getItem('sidebarStatus')
  if (status) {
    const flag = !!+status // +"0"->0 +"1"->1, !!0 = false !!1 = true
    return flag
  } else {
    return true
  }
}
