import { Link } from "react-router"

export function App() {
  return (
    <Link
      to={"packages"}
      className="flex h-screen items-center justify-center text-blue-500 underline"
    >
      Navigate to packages page
    </Link>
  )
}

export default App
