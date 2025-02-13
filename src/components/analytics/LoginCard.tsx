
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginCardProps {
  loading: boolean;
  passphrase: string;
  onPassphraseChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginCard = ({ loading, passphrase, onPassphraseChange, onSubmit }: LoginCardProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Analytics Dashboard Access</CardTitle>
          <CardDescription>Enter the passphrase to view analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter passphrase"
              value={passphrase}
              onChange={(e) => onPassphraseChange(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Checking..." : "Access Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
