import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Request a Private Audit — BIGWEB Digital',
  description: "Request a private revenue audit. We'll analyze your digital infrastructure and expose exactly where the opportunity is — whether you hire us or not.",
};

export default function ContactPage() {
  return <ContactClient />;
}
