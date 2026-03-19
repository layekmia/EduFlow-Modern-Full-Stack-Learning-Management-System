import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function EmptyCertificates() {
  return (
    <Card className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
          <Award className="h-10 w-10 text-yellow-600" />
        </div>
        
        <h2 className="text-2xl font-bold mb-3">No Certificates Yet</h2>
        
        <p className="text-muted-foreground mb-8">
          Complete courses to earn certificates and showcase your achievements. 
          Start learning today and build your credential collection!
        </p>

        <div className="space-y-3">
          <Button size="lg" className="w-full" asChild>
            <Link href="/courses">
              <GraduationCap className="h-5 w-5 mr-2" />
              Browse Courses
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" className="w-full" asChild>
            <Link href="/dashboard/my-courses">
              View My Courses
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}