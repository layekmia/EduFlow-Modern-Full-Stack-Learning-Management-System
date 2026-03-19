import { Award } from "lucide-react";

export default function CertificatesHeader() {
  return (
    <div className="bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-transparent border-b border-yellow-500/10 mb-8">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="h-10 w-10 text-yellow-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
              My Certificates
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Celebrate your achievements and showcase your expertise with earned
            certificates
          </p>
        </div>
      </div>
    </div>
  );
}
