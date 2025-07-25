import EventGrid from "./EventGrid";

export default function BrowsePage() {
  return (
    <>
      <div className="mx-5 md:mx-0">
        <h2 className="text-3xl font-bold mb-5">All Events</h2>
        <EventGrid />
      </div>
    </>
  );
}
