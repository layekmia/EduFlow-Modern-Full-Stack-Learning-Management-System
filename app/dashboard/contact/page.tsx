import { Metadata } from "next";
import ContactForm from "./_components/ContactForm";
import SupportOptions from "./_components/SupportOptions";
import OfficeLocation from "./_components/OffieLocation";
import FAQ from "./_components/FAQ";

export const metadata: Metadata = {
  title: "Contact Us | Get Help & Support",
  description:
    "Get in touch with our support team. We're here to help you with any questions or issues.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
              How can we help you?
            </h1>
            <p className="text-lg text-muted-foreground">
              We&apos;re here to help and answer any questions you might have.
              We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <SupportOptions />
          </div>
        </div>

        <div className="mt-10">
          <FAQ />
        </div>

        <div className="mt-10">
          <OfficeLocation />
        </div>
      </div>
    </div>
  );
}
