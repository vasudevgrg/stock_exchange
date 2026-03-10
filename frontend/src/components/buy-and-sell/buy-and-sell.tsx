import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BuyAndSell = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[420px] bg-white p-6 rounded-xl shadow-lg">
        <Tabs defaultValue="buy">

          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>

          <TabsContent value="buy">
            <div className="space-y-4">

              <Field>
                <FieldLabel>Quantity</FieldLabel>
                <Input placeholder="Enter quantity" />
              </Field>

              <Field>
                <FieldLabel>Price</FieldLabel>
                <Input placeholder="Enter price" />
              </Field>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Buy Stock
              </Button>

            </div>
          </TabsContent>

          <TabsContent value="sell">
            <div className="space-y-4">

              <Field>
                <FieldLabel>Quantity</FieldLabel>
                <Input placeholder="Enter quantity" />
              </Field>

              <Field>
                <FieldLabel>Price</FieldLabel>
                <Input placeholder="Enter price" />
              </Field>

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                Sell Stock
              </Button>

            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default BuyAndSell;