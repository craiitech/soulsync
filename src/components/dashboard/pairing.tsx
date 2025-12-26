"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Copy, Users, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const pairCodeSchema = z.object({
  code: z.string().length(6, { message: 'Pair code must be 6 digits.' }).regex(/^\d{6}$/, { message: 'Pair code must be 6 digits.' }),
});

// Placeholder for server action
async function connectToPartner(code: string) {
  console.log('Connecting with code:', code);
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (code === '999999') {
      return { error: 'Invalid or expired pair code.' };
  }
  return { success: true };
}

export function Pairing({ user, pairCode }: { user: { name?: string | null }, pairCode: string }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof pairCodeSchema>>({
    resolver: zodResolver(pairCodeSchema),
    defaultValues: { code: '' },
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(pairCode);
    toast({
      title: 'Copied to clipboard!',
      description: 'Your pair code has been copied.',
    });
  };

  const onSubmit = (values: z.infer<typeof pairCodeSchema>) => {
    startTransition(async () => {
      const result = await connectToPartner(values.code);
      if (result.error) {
        form.setError('code', { type: 'manual', message: result.error });
      } else {
        toast({
          title: 'Successfully Paired!',
          description: "You can now start your quiz.",
        });
        // In a real app, we'd re-validate the page data to show the next state
        window.location.reload();
      }
    });
  };
  
  return (
    <div className="flex flex-col items-center text-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <div className="p-4 rounded-full bg-accent">
          <Users className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-headline">Connect with Your Partner</h1>
        <p className="text-muted-foreground max-w-md">
          To begin, one of you needs to share their Pair Code with the other. Once connected, you can both take the quiz.
        </p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Share Your Code</h2>
          <p className="text-sm text-muted-foreground">Share this code with your partner for them to connect with you.</p>
          <div className="flex items-center gap-2 p-2 border rounded-lg bg-secondary">
            <span className="flex-1 text-2xl font-bold tracking-widest text-center text-primary">{pairCode}</span>
            <Button size="icon" variant="ghost" onClick={handleCopy}>
              <Copy className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground font-semibold">OR</span>
            <Separator className="flex-1" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Enter Partner's Code</h2>
          <p className="text-sm text-muted-foreground">If your partner sent you a code, enter it below.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">Pair Code</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} className="text-center text-lg h-12" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="h-12" disabled={isPending}>
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Connect'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
