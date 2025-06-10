"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Calculator } from "lucide-react"
import { MODCalculator } from "@/components/mod-calculator"
import { BestMixCalculator } from "@/components/best-mix-calculator"
import { EADCalculator } from "@/components/ead-calculator"
import { DivePlanner } from "@/components/dive-planner"
import { Resources } from "@/components/resources"

export default function NitroxCalculator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111729] to-[#1a1f3a]">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-white">Nitrox Calculator</h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Professional diving gas calculations for certified Nitrox divers. Calculate MOD, Best Mix, EAD, and plan
            your dives safely.
          </p>
        </div>

        <Tabs defaultValue="mod" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/10 backdrop-blur-sm border-white/20">
            <TabsTrigger value="mod">MOD</TabsTrigger>
            <TabsTrigger value="bestmix">Best Mix</TabsTrigger>
            <TabsTrigger value="ead">EAD</TabsTrigger>
            <TabsTrigger value="planner">Planner</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="mod">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-200">Maximum Operating Depth (MOD)</CardTitle>
                <CardDescription className="text-gray-300">
                  Calculate the maximum safe depth for a given Nitrox mix based on partial pressure limits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MODCalculator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bestmix">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-200">Best Mix Calculator</CardTitle>
                <CardDescription className="text-gray-300">
                  Determine the optimal Nitrox mix for your planned maximum depth.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BestMixCalculator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ead">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-200">Equivalent Air Depth (EAD)</CardTitle>
                <CardDescription className="text-gray-300">
                  Calculate the equivalent air depth for decompression planning with Nitrox.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EADCalculator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planner">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-200">Dive Planner</CardTitle>
                <CardDescription className="text-gray-300">
                  Plan your Nitrox dive with comprehensive gas calculations and safety information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DivePlanner />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-gray-200">Resources & Information</CardTitle>
                <CardDescription className="text-gray-300">
                  Diving terminology, safety guidelines, and useful references for Nitrox diving.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Resources />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Alert className="mt-8 border-amber-400 bg-amber-900/20">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            <strong>Warning:</strong> These calculations should only be used by certified Nitrox divers. Always verify
            calculations independently and follow safe diving practices. The application is provided 'as is' without
            warranty of any kind. We do not accept any responsibility for inaccuracies, errors, or any consequences that
            may result from the use of the application.
          </AlertDescription>
        </Alert>
        <div className="flex flex-col items-center justify-center">
          <p className="mt-4 text-gray-200">
          <a href="https://app.millibar.io/terms">Terms</a> | <a href="https://app.millibar.io/privacy">Privacy</a> | <a href="https://app.millibar.io/security">Security</a> | <a href="https://app.millibar.io/imprint">Imprint</a> </p>
          <p className="mt-4 text-gray-200">{new Date().getFullYear()} © Millibar - All Rights Reserved</p>
        </div>
      </div>
    </div>
  )
}
