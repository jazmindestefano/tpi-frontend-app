const SpinnerLoader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <img src="/c.svg" className="w-auto h-16 animate-spin" />
    </div>
  )
}

export default SpinnerLoader
