
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const currencies = [
  { value: "USD", label: "US Dollar ($)" },
  { value: "GHS", label: "Ghana Cedi (₵)" },
  { value: "EUR", label: "Euro (€)" },
  { value: "GBP", label: "British Pound (£)" },
  { value: "JPY", label: "Japanese Yen (¥)" },
  { value: "CAD", label: "Canadian Dollar (C$)" },
  { value: "AUD", label: "Australian Dollar (A$)" },
  { value: "ZAR", label: "South African Rand (R)" },
  { value: "NGN", label: "Nigerian Naira (₦)" },
  { value: "KES", label: "Kenyan Shilling (KSh)" }
];

const currencySymbols: Record<string, string> = {
  USD: "$",
  GHS: "₵",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  ZAR: "R",
  NGN: "₦",
  KES: "KSh"
};

const availabilityOptions = [
  { value: "available", label: "Available", color: "bg-green-500" },
  { value: "limited", label: "Limited Availability", color: "bg-yellow-500" },
  { value: "unavailable", label: "Unavailable", color: "bg-red-500" }
];

interface BasicInfoSectionProps {
  name: string;
  location: string;
  address: string;
  postalCode: string;
  priceRange: [number, number];
  currency: string;
  maxCapacity: number;
  description: string;
  availability: "available" | "limited" | "unavailable";
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPriceRangeChange: (value: number[]) => void;
  onCurrencyChange: (value: string) => void;
  onMaxCapacityChange: (value: number[]) => void;
  onAvailabilityChange: (value: "available" | "limited" | "unavailable") => void;
}

export const BasicInfoSection = ({
  name,
  location,
  address,
  postalCode,
  priceRange,
  currency,
  maxCapacity,
  description,
  availability,
  onInputChange,
  onPriceRangeChange,
  onCurrencyChange,
  onMaxCapacityChange,
  onAvailabilityChange
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Basic Information</h2>
      
      <div className="grid gap-4">
        <div>
          <Label htmlFor="name">Hostel Name *</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={onInputChange}
            placeholder="Enter hostel name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="location">City, Country *</Label>
          <Input
            id="location"
            name="location"
            value={location}
            onChange={onInputChange}
            placeholder="City, Country"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="address">Street Address *</Label>
          <Input
            id="address"
            name="address"
            value={address}
            onChange={onInputChange}
            placeholder="Enter street address"
            required
          />
        </div>

        <div>
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={postalCode}
            onChange={onInputChange}
            placeholder="Enter postal code"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="priceRange">Price Range *</Label>
            <div className="pt-6 px-2">
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                max={200}
                min={0}
                step={1}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={onPriceRangeChange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{currencySymbols[currency]}{priceRange[0]}</span>
                <span>{currencySymbols[currency]}{priceRange[1]}</span>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="currency">Currency *</Label>
            <Select
              value={currency}
              onValueChange={onCurrencyChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Currencies</SelectLabel>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maxCapacity">Maximum Room Capacity *</Label>
            <div className="pt-6 px-2">
              <Slider
                defaultValue={[maxCapacity]}
                max={5}
                min={1}
                step={1}
                value={[maxCapacity]}
                onValueChange={onMaxCapacityChange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Min: 1</span>
                <span className="flex items-center gap-1.5">
                  <Users size={16} className="text-primary" /> 
                  <span className="font-semibold text-primary">{maxCapacity} {maxCapacity === 1 ? 'person' : 'people'}</span>
                </span>
                <span className="text-muted-foreground">Max: 5</span>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="availability">Availability *</Label>
            <div className="mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        availabilityOptions.find(opt => opt.value === availability)?.color
                      }`} />
                      {availabilityOptions.find(opt => opt.value === availability)?.label}
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full" align="end">
                  {availabilityOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => onAvailabilityChange(option.value as "available" | "limited" | "unavailable")}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${option.color}`} />
                        {option.label}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={onInputChange}
            placeholder="Describe your hostel..."
            className="min-h-32"
            required
          />
        </div>
      </div>
    </div>
  );
};
