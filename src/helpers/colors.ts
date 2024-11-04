export const getRandomColor = () => {
  const colors = [
    '#f2c160',
    '#D1D1D1',
    '#cbe0fa',
    '#f472b9',
    '#f5b501',
    '#e78519',
    '#506bdb',
    '#9d1750',
    '#1d4ed8',
    '#ff4d00',
    '#fbbf24',
    '#3bbf77',
    '#16a34a',
    '#f8fafc',
    '#9e7b5a',
    '#60a5fa',
    '#22c55e',
    '#fca5a1'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export const getCardBgColor = (index: number) => {
  const colors = ['bg-blue-500', 'bg-orange-400', 'bg-yellow-500']
  return colors[index % colors.length]
}

export function getRandomColorDashboard() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
