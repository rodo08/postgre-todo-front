// mport { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ChevronDown, ChevronUp } from "lucide-react";

// // Simulación de cartas de tarot
// const tarotCards = [
//   {
//     id: 1,
//     name: "El Loco",
//     description: "Nuevos comienzos, espontaneidad, fe en la vida.",
//     invertedDescription:
//       "Imprudencia, riesgo innecesario, decisiones apresuradas.",
//   },
//   {
//     id: 2,
//     name: "El Mago",
//     description: "Poder personal, habilidad, concentración, acción.",
//     invertedDescription: "Manipulación, habilidades sin desarrollar, engaño.",
//   },
//   {
//     id: 3,
//     name: "La Sacerdotisa",
//     description: "Intuición, sabiduría inconsciente, misterio.",
//     invertedDescription:
//       "Secretos ocultos, intuición ignorada, superficialidad.",
//   },
// ];

// export default function Component() {
//   const [question, setQuestion] = useState("");
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [readings, setReadings] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [revealedCards, setRevealedCards] = useState([]);

//   const handleGetReading = () => {
//     if (question) {
//       const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
//       const selected = shuffled.slice(0, 3).map((card) => ({
//         ...card,
//         isInverted: Math.random() < 0.5,
//       }));
//       setRevealedCards(selected);
//       setSelectedCard(null);
//     }
//   };

//   const handleCardClick = (card) => {
//     setSelectedCard(card);
//   };

//   const handleSaveReading = () => {
//     if (question && selectedCard) {
//       const newReading = {
//         question,
//         card: selectedCard.name,
//         description: selectedCard.isInverted
//           ? selectedCard.invertedDescription
//           : selectedCard.description,
//         isInverted: selectedCard.isInverted,
//       };
//       setReadings([...readings, newReading]);
//       setQuestion("");
//       setSelectedCard(null);
//       setRevealedCards([]);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <div className="mb-6">
//         <div className="flex gap-2 mb-4">
//           <Input
//             type="text"
//             placeholder="Escribe tu pregunta aquí"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="flex-grow"
//           />
//           <Button onClick={handleGetReading} disabled={!question}>
//             Obtener Lectura
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           {[0, 1, 2].map((index) => (
//             <Card
//               key={index}
//               className={`cursor-pointer transition-all ${
//                 revealedCards[index]
//                   ? selectedCard?.id === revealedCards[index].id
//                     ? "ring-2 ring-primary"
//                     : ""
//                   : "bg-blue-500"
//               }`}
//               onClick={() =>
//                 revealedCards[index] && handleCardClick(revealedCards[index])
//               }
//             >
//               <CardContent className="p-4 text-center">
//                 <div
//                   className={`w-full h-40 mb-2 flex items-center justify-center ${
//                     revealedCards[index]
//                       ? "bg-gray-200 text-gray-500"
//                       : "bg-blue-500 text-white"
//                   } ${revealedCards[index]?.isInverted ? "rotate-180" : ""}`}
//                 >
//                   {revealedCards[index] ? revealedCards[index].name : "?"}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold mb-2">
//             Descripción de la carta:
//           </h3>
//           <p>
//             {selectedCard
//               ? selectedCard.isInverted
//                 ? `(Invertida) ${selectedCard.invertedDescription}`
//                 : selectedCard.description
//               : "Selecciona una carta para ver su descripción."}
//           </p>
//         </div>
//         {selectedCard && (
//           <Button onClick={handleSaveReading} className="mt-2">
//             Guardar Lectura
//           </Button>
//         )}
//       </div>
//       <div className="relative">
//         <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
//           <CollapsibleTrigger asChild>
//             <Button
//               variant="outline"
//               className="flex items-center justify-between w-full"
//             >
//               Lecturas Guardadas
//               {isOpen ? (
//                 <ChevronUp className="h-4 w-4 ml-2" />
//               ) : (
//                 <ChevronDown className="h-4 w-4 ml-2" />
//               )}
//             </Button>
//           </CollapsibleTrigger>
//           <CollapsibleContent className="absolute top-full left-0 right-0 z-10 bg-background border rounded-md mt-2">
//             <ScrollArea className="h-[200px] w-full p-4">
//               {readings.length > 0 ? (
//                 readings.map((reading, index) => (
//                   <div
//                     key={index}
//                     className="mb-4 pb-2 border-b last:border-b-0"
//                   >
//                     <p className="font-medium">Pregunta: {reading.question}</p>
//                     <p>
//                       Carta: {reading.card}{" "}
//                       {reading.isInverted ? "(Invertida)" : ""}
//                     </p>
//                     <p>Lectura: {reading.description}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No hay lecturas guardadas aún.
//                 </p>
//               )}
//             </ScrollArea>
//           </CollapsibleContent>
//         </Collapsible>
//       </div>
//     </div>
//   );
// }
