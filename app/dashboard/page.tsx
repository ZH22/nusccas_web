import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = await createClient();

  // Check if user authenticated
  const {data: { user }, error} = await supabase.auth.getUser()
  // Redirect if unauthenticated
  if (error || !user) {
    redirect('/login')
  }


  const { data: cca_data } = await supabase
    .from('cca_data')
    .select('id, name, website_url, logo_url, branch, ig_url')
    .range(0, 20);

  if(!cca_data) {
    return <p>No CCA Data :/</p>
  }

  return(
    <>
      <h1 className="font-bold text-3xl mb-4">All CCAs</h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {cca_data.map((cca) => 
          <Link href={cca.website_url} key={cca.id} target="_blank">
            <Card>
              <CardHeader>
                <CardTitle>{cca.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {cca.logo_url && <Image src={cca.logo_url} alt="cca Logo" width={100} height={100}/>}
              </CardContent>
              <CardFooter>
                <Badge asChild>
                  <Link href="#">{cca.branch}</Link>
                </Badge>

                {cca.ig_url && 
                <Badge asChild variant="outline">
                  <Link href={cca.ig_url} target="_blank">
                    insta
                  </Link>
                </Badge>
                }
              </CardFooter>
            </Card>
          </Link>
        )}
      </div>
    </>
  )
}
