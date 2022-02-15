export function getTitle(view) {
  let title = ''
  if (!view.meta || !view.meta.title) {
    const pathArr = view.path.split('/')
    console.log(pathArr)
    title = pathArr[pathArr.length - 1]
  } else {
    title = view.meta.title
  }
  return title
}
