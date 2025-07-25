import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { parse, format } from "date-fns";

export default function EventCard({
  eventId,
  title,
  from,
  location,
  imgSrc,
  hostCca,
  hostCcaLogo,
}: {
  eventId: string;
  title: string;
  from: string;
  location: string;
  imgSrc: string;
  hostCca: string;
  hostCcaLogo: string;
}) {
  return (
    <Link href={"/events/" + eventId} target="_blank">
      <div className="max-w-sm overflow-hidden shadow-lg bg-slate-50 dark:bg-slate-800 p-5 rounded-xl">
        {imgSrc ? (
          <Image
            className="w-full bg-slate-50 dark:bg-slate-900 p-3"
            src={imgSrc}
            alt="Image"
            width={200}
            height={50}
          />
        ) : (
          <Image
            className="w-full bg-slate-50 dark:bg-slate-900 p-3"
            src={hostCcaLogo}
            alt="Image"
            width={200}
            height={50}
          />
        )}
        <div className="py-3">
          <div className="font-bold text-xl mb-3 text-center">{title}</div>
          <div className="flex gap-4">
            <CalendarDays />
            <p className="mb-5 text-sm">
              {format(
                parse(from, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
                "EEEE, MMMM d yyyy 'at' h:mmaaa"
              )}
            </p>
          </div>
          <div className="flex gap-4">
            <MapPin />
            <p className="text-sm">{location}</p>
          </div>
          <p className="text-gray-700 dark:text-gray-400 text-base line-clamp-4 mt-6">
            Host CCA: {hostCca}
          </p>
        </div>
      </div>
    </Link>
  );
}
