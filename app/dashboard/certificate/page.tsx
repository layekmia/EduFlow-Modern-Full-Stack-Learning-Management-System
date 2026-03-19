import { Metadata } from "next";

import { getUserCertificates } from "@/app/data/user/get-user-certificates";
import CertificatesGrid from "./_components/CertificatesGrid";
import CertificatesHeader from "./_components/CertificatesHeader";
import EmptyCertificates from "./_components/EmptyCertificates";

export const metadata: Metadata = {
  title: "My Certificates",
  description: "View and download your earned certificates",
};

export default async function CertificatesPage() {
  const certificates = await getUserCertificates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      <CertificatesHeader />

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {certificates.length === 0 ? (
            <EmptyCertificates />
          ) : (
            <CertificatesGrid certificates={certificates} />
          )}
        </div>
      </div>
    </div>
  );
}
