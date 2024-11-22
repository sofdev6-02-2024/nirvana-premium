'use client';

import elon from '@/assets/elon.jpg';
import gpt from '@/assets/gpt.png';
import mark from '@/assets/mark.jpg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Code2, Globe2, Rocket, Stars, Users2 } from 'lucide-react';
import Image from 'next/image';
import Badge from './badge';

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      <section className="border-b">
        <div className="mx-auto max-w-5xl space-y-6 px-3 py-24 md:py-32">
          <div className="flex max-w-[980px] flex-col items-start gap-4">
            <Badge className="text-sm" variant="secondary">
              🚀 Now with AI-powered matching
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              Find Your Next Tech
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                {' '}
                Chamba
              </span>
            </h1>
            <h2 className="text-2xl text-muted-foreground">
              We will not only surprise you, we will disappoint you.
            </h2>
            <div className="flex gap-4">
              <Button size="lg">
                Find Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-3 py-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 row-span-1">
              <CardHeader>
                <Globe2 className="h-6 w-6 text-primary" />
                <CardTitle>Global Opportunities</CardTitle>
                <CardDescription>
                  Connect with companies worldwide. Work from anywhere.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="col-span-1 row-span-1">
              <CardHeader>
                <Bot className="h-6 w-6 text-primary" />
                <CardTitle>AI-Powered Matching</CardTitle>
                <CardDescription>
                  Our AI helps you find the perfect fit for your skills and preferences.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="col-span-1 row-span-1">
              <CardHeader>
                <Code2 className="h-6 w-6 text-primary" />
                <CardTitle>Tech-First Platform</CardTitle>
                <CardDescription>
                  Built by developers, for developers. We speak your language.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-5xl px-3 py-12">
          <h2 className="mb-8 text-3xl font-bold">What People Say*</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Image
                    src={elon}
                    alt="Elon Musk"
                    width={250}
                    height={250}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">Elon Musk**</p>
                    <p className="text-sm text-muted-foreground">
                      I would buy this instead of Twitter, but I already spent all my money.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Image
                    src={mark}
                    width={250}
                    height={250}
                    alt="Mark Zuckerberg"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">Mark Zuckerberg**</p>
                    <p className="text-sm text-muted-foreground">
                      Better UI than my Metaverse, ngl.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Image
                    src={gpt}
                    alt="GPT-4"
                    width={250}
                    height={250}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">GPT-4**</p>
                    <p className="text-sm text-muted-foreground">
                      Finally, a platform that does not try to replace me.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            * Totally real testimonials. Trust us.
            <br />
            ** AI generated humor. Please do not sue us.
          </p>
        </div>
      </section>

      <section className="border-t bg-muted/40">
        <div className="mx-auto max-w-5xl px-3 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <Users2 className="mb-2 h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold">10k+</h3>
              <p className="text-muted-foreground">Developers</p>
            </div>
            <div className="flex flex-col items-center">
              <Rocket className="mb-2 h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-muted-foreground">Companies</p>
            </div>
            <div className="flex flex-col items-center">
              <Stars className="mb-2 h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold">1M+</h3>
              <p className="text-muted-foreground">Job Matches</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-5xl px-3 py-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold">Ready for Your Primera Chamba?</h2>
            <p className="text-muted-foreground">
              Join thousands of developers finding their next opportunity
            </p>
            <div className="flex gap-4">
              <Button size="lg">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
