'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const dynamic = "force-dynamic";

export default function SoloIntroPage() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(`/quiz?flow=solo&name=${encodeURIComponent(name.trim())}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
            <User className="w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-bold mt-4">Discover Your Personal Style</CardTitle>
          <CardDescription>
            This short quiz is designed for self-reflection. Learn about your personality, attachment style, and what you value in relationships.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContinue} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">First, what should we call you?</Label>
              <Input
                id="name"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 text-lg"
              />
            </div>
            <Button type="submit" size="lg" className="w-full font-bold" disabled={!name.trim()}>
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
