import AllCCAList from "./all-cca-list-updated";

export default function BrowsePage() {
  return (
    <>
      <div className="mx-5 md:mx-0">
        <h2 className="text-3xl font-bold mb-5">All CCAs</h2>
        <AllCCAList />
      </div>
    </>
  );
}
