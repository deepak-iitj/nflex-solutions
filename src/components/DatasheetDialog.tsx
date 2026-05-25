import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email is required").max(255),
});

interface DatasheetDialogProps {
  open: boolean;
  onClose: () => void;
  productTitle: string;
}

const DatasheetDialog = ({ open, onClose, productTitle }: DatasheetDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ name, email });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    if (!ACCESS_KEY) {
      toast({
        title: "Request not configured",
        description: "Please contact us at Info@nflexsolutions.com to request the datasheet.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const message = [
      `Datasheet request from NFlex Solutions website`,
      ``,
      `Product: ${productTitle}`,
      `Requested by: ${name}`,
      `Send datasheet to: ${email}`,
      ``,
      `Please email the datasheet to the address above.`,
    ].join("\n");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Datasheet request: ${productTitle}`,
          from_name: name,
          email: email,
          message,
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast({
          title: "Request received!",
          description: `We'll email the datasheet for "${productTitle}" to ${email} within 24 hours.`,
        });
        setName("");
        setEmail("");
        onClose();
      } else {
        toast({
          title: "Could not send request",
          description: data.message || "Please try again or email Info@nflexsolutions.com",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please email Info@nflexsolutions.com to request the datasheet.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Get Datasheet by Email</DialogTitle>
          <DialogDescription>Enter your details and we&apos;ll email the datasheet for {productTitle} to you.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Name</label>
            <Input placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>
          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending request...
              </>
            ) : (
              <>
                <Download size={16} />
                Send datasheet to my email
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DatasheetDialog;
