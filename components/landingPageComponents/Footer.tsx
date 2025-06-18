import Link from "next/link"
import Image from "next/image"
import nusync_logo from "../../public/NuSync_logo.png"
import siteLogo from "../../public/logo.png"
import { BugIcon, RocketIcon } from "lucide-react"

export default function Footer() {
  return(
    <footer className="mt-10">
      

      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between gap-5">
          <div className="flex justify-center text-teal-600 sm:justify-start dark:text-teal-300">
            <Image alt="logo" src={siteLogo} className="w-xs lg:px-5"/>
          </div>

          <div>
            <p className="mt-4 max-w-md text-center leading-relaxed text-gray-500 sm:text-left lg:mt-0 dark:text-gray-400">
              Powering a More Holistic Student Life
            </p>
            <div className="flex items-center gap-3 justify-center">
              <p className="font-extralight text-sm dark:text-gray-500">Sourced from:</p>
              <Link href="https://nus.campuslabs.com/engage/" target="__blank">
                <Image src={ nusync_logo } alt="Nusync Logo" className="w-30 mt-2"/>
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-5 grid grid-cols-1 gap-8 border-t border-gray-100 pt-5 md:grid-cols-4 lg:grid-cols-6 dark:border-gray-800"
        >
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900 dark:text-white">Quick Links</p>

            <ul className="mt-3 space-y-4 text-sm">
              <li>
                <Link
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  href="/browse"
                >
                  All CCAs
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  href="/login"
                >
                  Login
                </Link>
              </li>              

               <li>
                <Link
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  href="/login/signup"
                >
                  Sign-up
                </Link>
              </li> 
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900 dark:text-white">Find Out More</p>

            <ul className="mt-3 space-y-4 text-sm">
              <li>
                <Link
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  href="https://nusskylab-dev.comp.nus.edu.sg/" target="_blank"
                >
                  Orbital 
                  <RocketIcon className="inline ml-3 text-"/>
                </Link>
              </li>

            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900 dark:text-white">Resources</p>

            <ul className="mt-3 space-y-4 text-sm">
              <li>
                <Link
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  href="https://osa.nus.edu.sg/experience-communities/clubs-and-groups-nusync/nusync/" target="_blank"
                >
                  NusSync
                </Link>
              </li>

              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  Support
                </a>
              </li>

              <li>
                <Link
                  className="group flex justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                  href="https://cloud.umami.is/share/IdW7f5cV8MZkK1hi/nusccas-web.vercel.app" target="_blank"
                >
                  <span
                    className="text-gray-700 transition group-hover:text-gray-700/75 dark:text-white dark:group-hover:text-white/75"
                  >
                    Web Traffic
                  </span>

                  <span className="relative flex size-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"
                    ></span>
                    <span className="relative inline-flex size-2 rounded-full bg-teal-500"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left md:col-span-4 lg:col-span-2 lg:col-start-5">
            <p className="text-lg font-medium text-gray-900 dark:text-white">Bug Reporting</p>
            <div className="flex gap-5 justify-center md:justify-start"><BugIcon /> <BugIcon className="text-red-600"/> <BugIcon /></div>

            <div className="mx-auto mt-3 max-w-md sm:ms-0">
              <p
                className="text-center leading-relaxed text-gray-500 ltr:sm:text-left rtl:sm:text-right dark:text-gray-400"
              >
                Noticed a bug? Write us down below
              </p>

              <div>CHANGE WITH FORM COMPONENT</div>
            </div>
          </div>
        </div>

        <div
          className="mt-16 border-t border-gray-100 pt-6 sm:flex sm:items-center sm:justify-between dark:border-gray-800"
        >
          <p className="text-center text-sm text-gray-500 sm:text-left dark:text-gray-400">
            Copyright &copy; 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

  )
}