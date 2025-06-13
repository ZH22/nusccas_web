
import AllCCAList from "./all-cca-list"

export default function BrowsePage() {
  return (
    <>
      <div className="md: max-w-3/4 m-auto">
        <h2 className="text-3xl font-bold">All CCAs</h2>
        <AllCCAList />
      </div>
    </>
  )
}