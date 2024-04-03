import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  // Create an event
  const event = await prisma.event.create({
    data: {
      title: "Web3 Summit 2024",
      starts: new Date(2024, 3, 22), // Example date: April 22, 2024
      host: "Blockchain Innovators",
      location: "Decentraland",
      duration: "Full Day",
      image: "/images/event.jpg",
      active: true,
      isPaused: false,
      isReset: false,
      currentTime: "08:00:00",
    },
  });

  const activities = [
    {
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
      eventId: event.id,
    },
    {
      title: "Introduction to Web3",
      description:
        "An overview of Web3 concepts, technologies, and the future of decentralized internet.",
      host: "Blockchain Expert",
      start: "9:30 AM",
      end: "10:00 AM",
      duration: "30 minutes",
      image: "/images/2.jpg",
      active: true,
      isPaused: false,
      isReset: false,
      currentTime: "03:12:23",
      done: false,
      eventId: event.id,
    },
    {
      title: "Blockchain & Sustainability",
      description:
        "Exploring the role of blockchain in promoting sustainability and ethical practices.",
      host: "EcoTech Innovators",
      start: "10:15 AM",
      end: "11:00 AM",
      duration: "45 minutes",
      image: "/images/3.jpg",
      active: false,
      isPaused: false,
      isReset: false,
      currentTime: "00:00:00",
      done: false,
      eventId: event.id,
    },
    {
      title: "Decentralized Finance (DeFi) Workshop",
      description:
        "Interactive workshop on DeFi applications, smart contracts, and financial security.",
      host: "DeFi Experts",
      start: "11:15 AM",
      end: "12:30 PM",
      duration: "1 hour 15 minutes",
      image: "/images/4.jpg",
      active: false,
      isPaused: false,
      isReset: false,
      currentTime: "00:00:00",
      done: false,
      eventId: event.id,
    },
    {
      title: "Networking Luncheon",
      description:
        "An opportunity to network with other attendees and discuss collaboration opportunities.",
      host: "Event Organizers",
      start: "12:30 PM",
      end: "1:30 PM",
      duration: "1 hour",
      image: "/images/5.jpg",
      active: false,
      isPaused: false,
      isReset: false,
      currentTime: "00:00:00",
      done: false,
      eventId: event.id,
    },
  ];

  for (const activity of activities) {
    await prisma.activity.create({
      data: activity,
    });
  }
}

main()
  .then(async () => {
    console.log("Seeding finished.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
