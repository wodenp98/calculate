"use client";
/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const FormSchema = z.object({
  calculsLength: z.string({
    required_error: "Nombre de calculs requis",
  }),
  delai: z.string({
    required_error: "Délai requis",
  }),
  difficulty: z.string({
    required_error: "Niveau de difficulté requis",
  }),
  operationType: z.string({
    required_error: "Type d'opération requis",
  }),
});

const Home: React.FC = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(
      `/calculs?count=${data.calculsLength}&delay=${data.delai}&difficulty=${data.difficulty}&operation=${data.operationType}`
    );
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Calcul Mental - CM1</CardTitle>
          <CardDescription>
            Configurez votre séance de calcul mental
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="operationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'exercice :</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez un type d'exercice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="addition">Additions</SelectItem>
                        <SelectItem value="soustraction">
                          Soustractions
                        </SelectItem>
                        <SelectItem value="multiplication">
                          Tables de multiplication
                        </SelectItem>
                        <SelectItem value="division">
                          Divisions simples
                        </SelectItem>
                        <SelectItem value="mixed">
                          Opérations mélangées
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niveau de difficulté :</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez un niveau" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="facile">
                          Facile (petits nombres)
                        </SelectItem>
                        <SelectItem value="moyen">
                          Moyen (nombres à 2-3 chiffres)
                        </SelectItem>
                        <SelectItem value="difficile">
                          Difficile (grands nombres)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="calculsLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de calculs :</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Combien de calculs ?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5 calculs</SelectItem>
                        <SelectItem value="10">10 calculs</SelectItem>
                        <SelectItem value="15">15 calculs</SelectItem>
                        <SelectItem value="20">20 calculs</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="delai"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temps par calcul :</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Temps par calcul" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5 secondes</SelectItem>
                        <SelectItem value="10">10 secondes</SelectItem>
                        <SelectItem value="15">15 secondes</SelectItem>
                        <SelectItem value="20">20 secondes</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Démarrer la séance
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
