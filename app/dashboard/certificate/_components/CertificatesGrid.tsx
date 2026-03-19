import { CertificateType } from "@/app/data/user/get-user-certificates";
import CertificateCard from "./CertificateCard";

interface CertificatesGridProps {
  certificates: CertificateType[];
}

export default function CertificatesGrid({
  certificates,
}: CertificatesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certificates.map((certificate) => (
        <CertificateCard key={certificate.id} certificate={certificate} />
      ))}
    </div>
  );
}
