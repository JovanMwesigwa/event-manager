"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { siteUrl } from "@/data";
import { Check, Copy, Link as LucideLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function ShareDialog({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const path = usePathname();

  // const eventUrl = siteUrl + path + "/" + title.replace(/ /g, "");
  const eventUrl = siteUrl + path;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="border max-w-40 border-b-2 border-b-neutral-300 bg-white flex flex-row items-center gap-2"
        >
          <LucideLink size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] ">
        <DialogHeader>
          <DialogTitle>Share the event rundown</DialogTitle>
          <DialogDescription>
            Scan the QR code or share the link with your audience to flow
            through the event activities.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center flex-col gap-y-5">
          <div className="flex items-center justify-center size-64 rounded-md  border shadow-sm p-5">
            <QRCodeSVG value={eventUrl} className="w-full h-full " />
          </div>

          <div className="flex flex-row items-center w-full justify-between gap-x-2">
            <div className="flex flex-1 bg-neutral-200 p-2 w-full rounded-sm px-2 text-sm">
              <CopyToClipboard text={eventUrl}>
                <h1 className="text-xs line-clamp-1">{eventUrl}</h1>
              </CopyToClipboard>
            </div>
            <CopyToClipboard
              text={eventUrl}
              onCopy={() => {
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              <Button variant="ghost" className="border rounded-sm" size="sm">
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
