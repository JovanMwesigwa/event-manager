import { EventActivityType } from "@/types";
import staticImg from "../public/event.jpeg";

export const activities: EventActivityType[] = [
  {
    id: 1,
    title: "Welcome & Registration",
    description:
      "Begin the meetup with registration and a warm welcome from the event organizers.",
    host: "Web3 Community Leaders",
    start: "9:00 AM",
    end: "9:30 AM",
    duration: "30 minutes",
    image: "/images/1.jpg",
    active: false,
    isPaused: false,
    isReset: false,
    currentTime: "00:00:00",
    done: true,
  },
  {
    id: 2,
    title: "Introduction to Web3",
    description:
      "An overview of Web3 concepts, technologies, and the future of decentralized internet.",
    host: "Blockchain Expert",
    start: "9:30 AM",
    end: "10:00 AM",
    duration: "30 minutes",
    image: "/images/2.jpg",
    isPaused: false,
    isReset: false,
    active: true,
    currentTime: "03:12:23",
    done: false,
  },
  {
    id: 3,
    title: "Panel Discussion: The State of Web3",
    description:
      "A panel discussion with industry leaders on the current and future state of Web3.",
    host: "Tech Entrepreneurs",
    start: "10:15 AM",
    isPaused: false,
    isReset: false,
    end: "11:00 AM",
    duration: "45 minutes",
    image: "/images/3.jpg",
    active: false,
    currentTime: "0:00:00",
    done: false,
  },
  {
    id: 4,
    title: "Networking Break",
    description:
      "Connect with fellow Web3 enthusiasts and professionals over coffee and snacks.",
    host: "Event Organizers",
    start: "11:00 AM",
    end: "11:30 AM",
    isPaused: false,
    isReset: false,
    duration: "30 minutes",
    image: "/images/4.jpg",
    active: false,
    currentTime: "0:00:00",
    done: false,
  },
  {
    id: 5,
    title: "Workshop: Building on Blockchain",
    description:
      "Hands-on workshop on developing decentralized applications (dApps) on the blockchain.",
    host: "Blockchain Developers",
    start: "11:30 AM",
    end: "1:00 PM",
    duration: "1 hour 30 minutes",
    isPaused: false,
    isReset: false,
    image: "/images/5.jpg",
    active: false,
    currentTime: "0:00:00",
    done: false,
  },
  {
    id: 6,
    title: "Closing Remarks & Networking",
    description:
      "Summarize the day's insights and continue networking with the Web3 community.",
    host: "Event Organizers",
    start: "1:00 PM",
    end: "2:00 PM",
    duration: "1 hour",
    image: "/images/6.jpg",
    active: false,
    isPaused: false,
    isReset: false,
    currentTime: "0:00:00",
    done: false,
  },
];

export const hours = Array.from({ length: 24 }, (_, i) => i);
export const minutes = Array.from({ length: 60 }, (_, i) => i);
export const seconds = Array.from({ length: 60 }, (_, i) => i);

// dev URL
// export const siteUrl = "http://localhost:3000";

// production URL
export const siteUrl = "https://events-manager-ui.vercel.app";

// export const thumnailUrl = staticImg;
export const thumnailUrl =
  "https://images.lemonade.social/eyJidWNrZXQiOiJsZW1vbmFkZS11cGxvYWRzLWV1LWNlbnRyYWwtMSIsImtleSI6IjY1YzBkMjhhYTZhNGRhMDFkMGQ3ODE1My9ldmVudC82NjE0MjU3ODlhOTQ5MTc0NDgxMjhlMWMucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7ImhlaWdodCI6NTQwLCJmaXQiOiJjb3ZlciJ9fX0=";
// "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/fv/8583f85e-8bb5-4d29-95e3-27c50a2277de";
