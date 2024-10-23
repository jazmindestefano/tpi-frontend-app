export const getJustifyClass = (index: number) => {
  switch (index % 3) {
    case 0:
      return 'justify-end'
    case 2:
      return 'justify-start'
    default:
      return 'justify-center'
  }
}
