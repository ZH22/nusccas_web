"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { parse, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Typescript Interface for incoming data
type Event = {
  id: number;
  name: string;
  description: string;
  from: string;
  to: string;
  location: string;
  image_url: string;
};

type HostCCA = {
  cca_data: {
    id: number;
    name: string;
    logo_url: string;
  } | null;
};

export default function EventPage({ id }: { id: number }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [hostCCAs, setHostCCAs] = useState<HostCCA[]>([]);

  useEffect(() => {
    async function fetchEventData() {
      // Have to useEffect to run async fetch calls
      const supabase = createClient();

      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("id, name, description, from, to, location, image_url")
        .eq("id", id)
        .single();

      if (eventError) throw eventError;

      setEvent(eventData);

      const { data: hostCCAData, error: hostCCAError } = await supabase
        .from("events_host_ccas")
        .select("cca_data! cca_id (id, name, logo_url)")
        .eq("event_id", id);

      if (hostCCAError) throw hostCCAError;

      setHostCCAs(hostCCAData as unknown as HostCCA[]);
    }

    fetchEventData();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  console.log("Host CCAs", hostCCAs);

  return (
    <div>
      <div className="display: flex mb-4">
        {event.image_url && (
          <Image
            alt={event.name}
            src={event.image_url}
            width={400}
            height={300}
            className="mr-10"
          />
        )}
        <div>
          <h2 className="text-4xl font-bold mb-8">{event.name}</h2>
          <div className="flex gap-4">
            <CalendarDays />
            <p className="mb-5">
              {format(
                parse(event.from, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
                "EEEE, MMMM d yyyy 'at' h:mmaaa"
              )}{" "}
              to
              <br />
              {format(
                parse(event.to, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
                "EEEE, MMMM d yyyy 'at' h:mmaaa"
              )}
            </p>
          </div>
          <div className="flex gap-4">
            <MapPin />
            <p>{event.location}</p>
          </div>
        </div>
      </div>
      <br />
      <p className="whitespace-pre-line">{event.description}</p>
      <br />

      <h2 className="text-2xl font-semibold mb-4">Host CCA</h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
        {hostCCAs?.map((cca, i) => (
          <Button
            className="p-5 py-7 cursor-pointer"
            key={i}
            variant="outline"
            onClick={() => window.open("/ccas/" + cca.cca_data?.id)}
          >
            <div className="flex gap-3 max-w-50 truncate justify-start text-lg text-gray-400">
              <Avatar>
                <AvatarImage src={cca.cca_data?.logo_url} className="z-0" />
                <AvatarFallback>
                  {cca.cca_data?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {cca.cca_data?.name}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
