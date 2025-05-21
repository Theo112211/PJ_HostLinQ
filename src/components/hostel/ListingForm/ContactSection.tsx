
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactSectionProps {
  phone: string;
  email: string;
  website: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactSection = ({
  phone,
  email,
  website,
  onChange
}: ContactSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Contact Information</h2>
      
      <div className="grid gap-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={phone}
            onChange={onChange}
            placeholder="Enter phone number"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            placeholder="Enter email"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            value={website}
            onChange={onChange}
            placeholder="https://your-website.com"
          />
        </div>
      </div>
    </div>
  );
};
