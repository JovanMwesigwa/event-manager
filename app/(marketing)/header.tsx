import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignUpButton,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { ArrowUpRight, Loader } from "lucide-react";
import Image from "next/image";
import Logo from "../components/Logo";

const MainHeader = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="h-20 hidden  w-full px-4 md:block fixed">
      <div className="mx-auto flex items-center justify-between h-full ">
        <Logo />

        {/* Trigger redeploy */}
        <div className="p-4 flex flex-row gap-x-2">
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignInUrl="/events"
                afterSignUpUrl="/events"
              >
                <Button
                  className={`text-white hover:text-blue-500 flex flex-row ${
                    !isSignedIn ? "bg-green-500 " : "bg-green-500"
                  } h-8 rounded-full`}
                  variant="ghost"
                >
                  {!isSignedIn ? "Get started" : "Joined"}
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </SignUpButton>
            </SignedOut>
          </ClerkLoaded>

          <ClerkLoading>
            <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
          </ClerkLoading>

          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
