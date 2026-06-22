import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Book a Call — BIGWEB Digital',
  description: "Book a free 20-minute diagnostic call. We'll tell you exactly where your revenue is leaking — and how to fix it.",
};

export default function ContactPage() {
  return <ContactClient />;
}
