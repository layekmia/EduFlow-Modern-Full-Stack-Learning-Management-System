import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Building, Mail, Phone } from "lucide-react";

export default function OfficeLocation() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="bg-muted rounded-lg h-[250px] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Interactive Map Coming Soon
              </p>
            </div>
          </div>

          {/* Office Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold">Our Headquarters</h4>
                <p className="text-sm text-muted-foreground">
                  123 Learning Street
                  <br />
                  Education City, EC 12345
                  <br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-sm text-muted-foreground">
                  support@eduflow.com
                  <br />
                  partnerships@eduflow.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                  <br />
                  Mon-Fri, 9am-6pm EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
