import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";

export type Profile = {
  id: string;
  name: string;
  age: number;
  photo: string;
  role: string;
  company: string;
  industry: string;
  distance: string;
  bio: string;
  interests: string[];
  schedule: string;
  prompt: { q: string; a: string };
};

export const profiles: Profile[] = [
  {
    id: "amara",
    name: "Amara",
    age: 29,
    photo: p1,
    role: "Senior Product Manager",
    company: "Flutterwave",
    industry: "Fintech",
    distance: "3 km away",
    bio: "Shipping products by day, hunting the best jollof in Lekki by night. Looking for someone who gets that calendars are love languages.",
    interests: ["Brunch", "Pilates", "Afrobeats", "Travel"],
    schedule: "Free weekday evenings after 7pm",
    prompt: { q: "My ideal after-work date", a: "Rooftop mocktails and a long walk with zero Slack notifications." },
  },
  {
    id: "daniel",
    name: "Daniel",
    age: 32,
    photo: p2,
    role: "Investment Analyst",
    company: "Stanbic IBTC",
    industry: "Banking",
    distance: "5 km away",
    bio: "Spreadsheets are my cardio. Weekends are for tennis, sunsets and trying new restaurants.",
    interests: ["Tennis", "Cooking", "Jazz", "Podcasts"],
    schedule: "Weekends + Thursday nights",
    prompt: { q: "Green flag I look for", a: "Someone who replies to texts like they reply to emails — promptly." },
  },
  {
    id: "priya",
    name: "Priya",
    age: 27,
    photo: p3,
    role: "Management Consultant",
    company: "Deloitte",
    industry: "Consulting",
    distance: "2 km away",
    bio: "Always on a flight, always with coffee. Let's swap travel stories and book-club picks.",
    interests: ["Books", "Coffee", "Yoga", "Hiking"],
    schedule: "Lunch breaks & Sunday mornings",
    prompt: { q: "The way to win me over", a: "Remember my coffee order. Bonus points for oat milk." },
  },
  {
    id: "tobi",
    name: "Tobi",
    age: 31,
    photo: p4,
    role: "Corporate Lawyer",
    company: "Aluko & Oyebode",
    industry: "Legal",
    distance: "6 km away",
    bio: "Contracts by day, comedy shows by night. Big on family, faith and fine dining.",
    interests: ["Comedy", "Football", "Fine dining", "Gym"],
    schedule: "Friday evenings",
    prompt: { q: "I'm looking for", a: "A partner in crime — legally speaking, of course." },
  },
];

export const getProfile = (id: string) => profiles.find((p) => p.id === id);

export type Message = { from: "me" | "them"; text: string; time: string };

export const conversations: { id: string; unread: number; messages: Message[] }[] = [
  {
    id: "amara",
    unread: 2,
    messages: [
      { from: "them", text: "Hey! Fellow product person 👋", time: "12:31" },
      { from: "me", text: "Haha yes! How's the sprint going?", time: "12:40" },
      { from: "them", text: "Chaotic as always. Coffee on Thursday?", time: "12:42" },
      { from: "them", text: "I'm free after 7 😊", time: "12:42" },
    ],
  },
  {
    id: "priya",
    unread: 0,
    messages: [
      { from: "them", text: "Just landed in Lagos ✈️", time: "Yesterday" },
      { from: "me", text: "Welcome back! Sunday brunch?", time: "Yesterday" },
    ],
  },
];

export const me = {
  name: "Chidi",
  age: 30,
  role: "Software Engineer",
  company: "Andela",
  photo: p4,
};
