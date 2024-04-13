"use client";

import { useEffect, useState } from "react";
import MainHeader from "./header";
import { HiPaperAirplane } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ClerkLoaded,
  SignInButton,
  SignUpButton,
  SignedOut,
  useSignIn,
  useUser,
} from "@clerk/nextjs";
import { SendHorizonal } from "lucide-react";

export default function Home() {
  const words = ["brochures", "flyers", "guides", "leaflets"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const { isSignedIn } = useUser();

  const { signIn, isLoaded } = useSignIn();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change the word every 2 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <main className="flex-1 w-full flex-col h-screen relative bg-gradient-to-r from-rose-50 to-teal-50">
      <MainHeader />
      <div className="md:max-w-[1080px] mx-auto flex flex-1 w-full flex-col p-4 md:flex-row h-full gap-y-6 gap-2">
        <div className="flex flex-1  flex-col justify-center gap-y-10">
          <h1 className="text-5xl font-extrabold">
            <strong>
              No more{" "}
              <span className={`text-red-500 stroke-red-500 text-animation`}>
                {words[currentWordIndex]}
              </span>{" "}
              to follow what&apos;s happening at events...
            </strong>
          </h1>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-x-1">
              <HiPaperAirplane />
              <h1>Use a timer to track the flow of your event.</h1>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <HiPaperAirplane />
              <h1>Send live Polls to engage with the audience.</h1>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <HiPaperAirplane />
              <h1>Share the rundown with your audience to flow through.</h1>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <HiPaperAirplane />
              <h1>Pause, Rewind and Skip event activities in Real time.</h1>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center">
            {isSignedIn ? (
              <h1 className="text-sm wiggle-animation">
                🎉 Thanks for your interest in EventManager. 🤩
              </h1>
            ) : (
              <ClerkLoaded>
                <SignedOut>
                  <SignUpButton
                    mode="modal"
                    afterSignInUrl="/"
                    afterSignUpUrl="/"
                  >
                    <Button
                      className="rounded-md text-lg tracking-wide  text-white h-12"
                      size="lg"
                    >
                      Join the waitlist
                      <SendHorizonal className="size-5 ml-2" />
                    </Button>
                  </SignUpButton>
                </SignedOut>
              </ClerkLoaded>
            )}

            <div className="flex flex-row items-center gap-x-2">
              <p className="text-xs mb-2">See it in action </p>
              <h1 className="md:hidden">👇👇</h1>
              <Image
                src="/doodle.svg"
                height={40}
                width={100}
                alt="Doodle"
                className="hidden md:block"
              />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-1 items-center justify-center md:pl-5">
          <div className="w-full h-full md:h-1/2 bg-neutral-300 rounded-md overflow-hidden flex justify-center items-center">
            {/* Responsive iframe container */}
            <div className="w-full h-full aspect-w-16 aspect-h-9 overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/MVAj3zaKfvE"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
