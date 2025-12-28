'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Logo } from '@/components/logo';
import { Alert, AlertDescription } from '@/components/ui/alert';

const nameSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name cannot be longer than 50 characters." }),
});

export default function SoloIntroPage() {
  const router = useRouter();
  
  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = (values: z.infer<typeof nameSchema>) => {
    router.push(`/quiz?flow=solo&name=${encodeURIComponent(values.name)}`);
  };

  return (
    <div className="flex-1 flex flex-col">
        <Header user={null} />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Logo className="w-16 h-16" />
                    </div>
                    <CardTitle className="text-3xl font-bold">Your Personal Analysis</CardTitle>
                    <CardDescription>
                        Let's start your journey of self-discovery. First, what should we call you?
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert variant="default" className="text-left">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs text-muted-foreground space-y-2">
                           <p>
                             <strong>Data Privacy:</strong> We respect your privacy. This app does not collect or store any personal data. The name you provide is only used to personalize your results and is gone when you close the page.
                           </p>
                           <p>
                             <strong>Disclaimer:</strong> This tool is for informational and entertainment purposes only. It is not a clinical assessment. For serious relationship or psychological concerns, please consult a licensed professional.
                           </p>
                        </AlertDescription>
                    </Alert>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sr-only">Your Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter your first name or a nickname" {...field} className="text-center text-lg h-12" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full">
                            Start Quiz <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
