/* eslint-disable react/no-unescaped-entities */
"use client";
// import { useState } from "react";
import { useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const Home: React.FC = () => {
//   const [calculsCount, setCalculsCount] = useState<number>(5);
//   const [delay, setDelay] = useState<number>(30);
//   const [operation, setOperation] = useState<string>("addition");
//   const [leftDigits, setLeftDigits] = useState<number>(2);
//   const [rightDigits, setRightDigits] = useState<number>(2);
//   const router = useRouter();

//   const startSession = () => {
//     let path = "";

//     switch (operation) {
//       case "addition":
//         path = `/addition?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
//         break;
//       case "soustraction":
//         path = `/soustraction?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
//         break;
//       case "addition-soustraction":
//         path = `/addition-soustraction?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
//         break;
//       case "multiplication":
//         path = `/multiplication?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
//         break;
//       case "division":
//         path = `/division?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
//         break;
//       default:
//         path = `/calculs?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
//     }

//     router.push(path);
//   };

//   return (
//     <div className="w-full">
//       <div className="flex items-center justify-center">
//         <Card>
//           <CardHeader>
//             <CardTitle>Générateur de Calculs</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-">
//             <label>
//               Nombre de calculs:
//               <input
//                 type="number"
//                 value={calculsCount}
//                 min="1"
//                 max="100"
//                 onChange={(e) => setCalculsCount(parseInt(e.target.value, 10))}
//               />
//             </label>

//             <label>
//               Délai entre les calculs (secondes):
//               <input
//                 type="number"
//                 value={delay}
//                 min="1"
//                 max="60"
//                 onChange={(e) => setDelay(parseInt(e.target.value, 10))}
//               />
//             </label>

//             <label>
//               Chiffres max à gauche:
//               <input
//                 type="number"
//                 value={leftDigits}
//                 min="1"
//                 max="10"
//                 onChange={(e) => setLeftDigits(parseInt(e.target.value, 10))}
//               />
//             </label>

//             <label>
//               Chiffres max à droite:
//               <input
//                 type="number"
//                 value={rightDigits}
//                 min="1"
//                 max="10"
//                 onChange={(e) => setRightDigits(parseInt(e.target.value, 10))}
//               />
//             </label>

//             <label>
//               Type d'opération:
//               <select
//                 value={operation}
//                 onChange={(e) => setOperation(e.target.value)}
//               >
//                 <option value="addition">Addition</option>
//                 <option value="soustraction">Soustraction</option>
//                 <option value="addition-soustraction">
//                   Addition / Soustraction
//                 </option>
//                 <option value="multiplication">Multiplication</option>
//                 <option value="division">Division</option>
//               </select>
//             </label>
//           </CardContent>
//           <CardFooter>
//             <button onClick={startSession}>Démarrer la session</button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { ClipboardCheck, Clipboard } from "lucide-react";

const FormSchema = z.object({
  calculsLength: z.string({
    required_error: "Nombre de calculs requis",
    invalid_type_error: "Nombre de calculs doit être un nombre",
  }),
  delai: z.string({
    required_error: "Délai requis",
    invalid_type_error: "Délai doit être un nombre",
  }),
  maxLeft: z.string({
    required_error: "Chiffres max à gauche requis",
    invalid_type_error: "Chiffres max à gauche doit être un nombre",
  }),
  maxRight: z.string({
    required_error: "Chiffres max à droite requis",
    invalid_type_error: "Chiffres max à gauche doit être un nombre",
  }),
  operationType: z.string({
    required_error: "Type d'opération requis",
    invalid_type_error: "Type d'opération doit être une string",
  }),
});

const Home: React.FC = () => {
  const [calculsCount, setCalculsCount] = useState<number>(5);
  const [delay, setDelay] = useState<number>(30);
  const [operation, setOperation] = useState<string>("addition");
  const [leftDigits, setLeftDigits] = useState<number>(2);
  const [rightDigits, setRightDigits] = useState<number>(2);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let path = "";

    switch (data.operationType) {
      case "addition":
        path = `/addition?count=${data.calculsLength}&delay=${data.delai}&leftDigits=${data.maxLeft}&rightDigits=${data.maxRight}`;
        break;
      case "soustraction":
        path = `/soustraction?count=${data.calculsLength}&delay=${data.delai}&leftDigits=${data.maxLeft}&rightDigits=${data.maxRight}`;
        break;
      case "addition-soustraction":
        path = `/addition-soustraction?count=${data.calculsLength}&delay=${data.delai}&leftDigits=${data.maxLeft}&rightDigits=${data.maxRight}`;
        break;
      case "multiplication":
        path = `/multiplication?count=${data.calculsLength}&delay=${data.delai}&leftDigits=${data.maxLeft}&rightDigits=${data.maxRight}`;
        break;
      case "division":
        path = `/division?count=${data.calculsLength}&delay=${data.delai}&leftDigits=${data.maxLeft}&rightDigits=${data.maxRight}`;
        break;
      default:
        path = `/calculs?count=${data.calculsLength}&delay=${data.delai}&leftDigits=${data.maxLeft}&rightDigits=${data.maxRight}`;
    }

    router.push(path);
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Générateur de Calculs</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <div className="w-full space-y-4">
                  <FormField
                    control={form.control}
                    name="calculsLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de calculs:</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisissez un nombre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* delai */}
                  <FormField
                    control={form.control}
                    name="delai"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Délai (secondes):</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisissez un délai" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* Génération dynamique des éléments de sélection tous les 5 */}
                            {[...Array(12)].map((_, i) => (
                              <SelectItem
                                key={(i + 1) * 5}
                                value={((i + 1) * 5).toString()}
                              >
                                {(i + 1) * 5}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* max L */}
                  <FormField
                    control={form.control}
                    name="maxLeft"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chiffres max à gauche:</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="ex: 1: 0 à 9, 2: 0 à 99" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem
                                key={i + 1}
                                value={(i + 1).toString()}
                              >
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* max R */}
                  <FormField
                    control={form.control}
                    name="maxRight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chiffres max à droite:</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="ex: 1: 0 à 9, 2: 0 à 99" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem
                                key={i + 1}
                                value={(i + 1).toString()}
                              >
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Type d'opé */}
                  <FormField
                    control={form.control}
                    name="operationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type d'opération:</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisissez un type d'opération" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="addition">Addition</SelectItem>
                            <SelectItem value="soustraction">
                              Soustraction
                            </SelectItem>
                            <SelectItem value="addition-soustraction">
                              Addition / Soustraction
                            </SelectItem>
                            <SelectItem value="multiplication">
                              Multiplication
                            </SelectItem>
                            <SelectItem value="division">Division</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" variant="outline">
                Démarrer la session
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
