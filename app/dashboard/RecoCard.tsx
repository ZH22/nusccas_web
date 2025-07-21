import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function RecoCard({
  title,
  description,
  imgSrc,
  ccaId,
  topCCAs,
}: {
  title: string;
  description: string;
  imgSrc: string;
  ccaId: string;
  topCCAs: string[];
}) {
  const rank = topCCAs.indexOf(title) + 1;

  return (
    <Link href={"/ccas/" + ccaId} target="_blank">
      <Badge>{rank}</Badge>
      <div className="max-w-sm overflow-hidden shadow-lg bg-slate-50 dark:bg-slate-800 p-5 rounded-xl">
        {imgSrc && (
          <Image
            className="w-full bg-slate-50 dark:bg-slate-900 p-3"
            src={imgSrc}
            alt="Sunset in the mountains"
            width={200}
            height={50}
          />
        )}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 dark:text-gray-400 text-base line-clamp-4">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
