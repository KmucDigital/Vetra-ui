"use client";

import { memo } from "react";
import * as React from "react";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PricingToggle } from "@/components/PricingToggle";
import { cn } from "@/lib/utils";

export const Pricing = memo(function Pricing() {
  const [isAnnual, setIsAnnual] = React.useState(true);

  return (
    <section id="pricing" className="py-20 border-t border-zinc-800/50">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {siteConfig.pricing.headline}
          </h2>
          <p className="text-lg text-zinc-200 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.pricing.subheadline}
          </p>

          {/* Toggle */}
          <div className="pt-4">
            <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {siteConfig.pricing.plans.map((plan) => (
            <div key={plan.name} className="transition-transform duration-300 hover:-translate-y-2">
              <Card
                className={cn(
                  "relative h-full flex flex-col transition-all duration-300 border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm hover:border-zinc-700 hover:shadow-2xl",
                  plan.highlighted &&
                    "border-purple-500/50 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      Popular
                    </span>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-zinc-500">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl md:text-5xl font-bold">
                      ${isAnnual ? Math.floor(plan.price * 10) : plan.price}
                    </span>
                    <span className="text-zinc-500">/{isAnnual ? 'year' : 'month'}</span>
                    {isAnnual && (
                      <div className="text-sm text-zinc-500 mt-2">
                        ${plan.price}/month billed annually
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className={cn(
                          "h-5 w-5 shrink-0 mt-0.5",
                          plan.highlighted ? "text-purple-300" : "text-zinc-300"
                        )} />
                        <span className="text-sm text-zinc-200/90 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={cn(
                      "w-full transition-all duration-300",
                      plan.highlighted
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
                        : "border-zinc-700 hover:bg-zinc-800"
                    )}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
