"use client";

import EventCard from "./EventCard";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";

type Event = {
  id: string;
  name: string;
  description: string;
  from: string;
  location: string;
  image_url: string;
  events_host_ccas: {
    cca_data: {
      name: string;
      logo_url: string;
    };
  }[];
};

export const PlaceholderCards = ({ className }: { className?: string }) => {
  return (
    <div className={className + ` flex flex-col space-y-3`}>
      <Skeleton className="h-[125px] w-[250px] rounded-xl m-auto mb-3 dark:bg-slate-800 bg-slate-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] m-auto mb-3 bg-slate-300 dark:bg-slate-800" />
        <Skeleton className="h-4 w-[200px] m-auto mb-3 bg-slate-300 dark:bg-slate-800" />
      </div>
    </div>
  );
};

export default function EventGrid() {
  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    async function fetchEventData() {
      // Have to useEffect to run async fetch calls
      const supabase = createClient();

      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select(
          "id, name, description, from, location, image_url, events_host_ccas! event_id (cca_data (name, logo_url))"
        )
        .order("from", { ascending: true });

      if (eventError) throw eventError;

      setEvents(eventData as unknown as Event[]);
      console.log(eventData);
    }

    fetchEventData();
  }, []);

  if (!events) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        {[...Array(10)].map((e, i) => (
          <PlaceholderCards key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 mx-3 md:mx-0 m-auto">
      {events?.map((event) => (
        <EventCard
          key={event.id}
          eventId={event.id}
          title={event.name}
          from={event.from}
          location={event.location}
          imgSrc={event.image_url}
          hostCca={
            event.events_host_ccas
              ?.map((cca) => cca.cca_data?.name)
              .join(", ") || "—"
          }
          hostCcaLogo={event.events_host_ccas[0].cca_data?.logo_url}
        />
      ))}
    </div>
  );
}
