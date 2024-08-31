// import { useState } from "react";

// const tarotCards = [
//   { 
//     id: 1, 
//     name: "El Loco", 
//     description: "Nuevos comienzos, espontaneidad, fe en la vida.",
//     invertedDescription: "Imprudencia, riesgo innecesario, decisiones apresuradas."
//   },
//   { 
//     id: 2, 
//     name: "El Mago", 
//     description: "Poder personal, habilidad, concentración, acción.",
//     invertedDescription: "Manipulación, habilidades sin desarrollar, engaño."
//   },
//   { 
//     id: 3, 
//     name: "La Sacerdotisa", 
//     description: "Intuición, sabiduría inconsciente, misterio.",
//     invertedDescription: "Secretos ocultos, intuición ignorada, superficialidad."
//   },
// ]

// const SavedReadings = ({ readings, isOpen, onClose }) => {
//   return (
//     <div className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
//       <div className="p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Lecturas Guardadas</h2>
//           <Button variant="ghost" onClick={onClose} className="p-1">
//             <X className="h-6 w-6" />
//             <span className="sr-only">Cerrar panel</span>
//           </Button>
//         </div>
//         <ScrollArea className="h-[calc(100vh-100px)] pr-4">
//           {readings.length > 0 ? (
//             readings.map((reading, index) => (
//               <div key={index} className="mb-6 pb-4 border-b last:border-b-0">
//                 <p className="font-medium mb-2">Pregunta: {reading.question}</p>
//                 {reading.cards.map((card, cardIndex) => (
//                   <div key={cardIndex} className="mb-2">
//                     <p className="font-semibold">{card.name} {card.isInverted ? "(Invertida)" : ""}</p>
//                     <p>{card.isInverted ? card.invertedDescription : card.description}</p>
//                   </div>
//                 ))}
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">No hay lecturas guardadas aún.</p>
//           )}
//         </ScrollArea>
//       </div>
//     </div>
//   )
// }

// export default function Component() {
//   const [question, setQuestion] = useState("")
//   const [selectedCard, setSelectedCard] = useState(null)
//   const [readings, setReadings] = useState([])
//   const [revealedCards, setRevealedCards] = useState([])
//   const [isReadingsOpen, setIsReadingsOpen] = useState(false)

//   const handleGetReading = () => {
//     if (question) {
//       const shuffled = [...tarotCards].sort(() => 0.5 - Math.random())
//       const selected = shuffled.slice(0, 3).map(card => ({
//         ...card,
//         isInverted: Math.random() < 0.5
//       }))
//       setRevealedCards(selected)
//       setSelectedCard(null)
//     }
//   }

//   const handleCardClick = (card) => {
//     setSelectedCard(card)
//   }

//   const handleSaveReading = () => {
//     if (question && revealedCards.length === 3) {
//       const newReading = {
//         question,
//         cards: revealedCards.map(card => ({
//           name: card.name,
//           description: card.isInverted ? card.invertedDescription : card.description,
//           isInverted: card.isInverted
//         }))
//       }
//       setReadings([...readings, newReading])
//       setQuestion("")
//       setSelectedCard(null)
//       setRevealedCards([])
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl relative">
//       <div className="mb-6">
//         <div className="flex flex-col sm:flex-row gap-2 mb-4">
//           <Input
//             type="text"
//             placeholder="Escribe tu pregunta aquí"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="flex-grow"
//           />
//           <Button onClick={handleGetReading} disabled={!question} className="w-full sm:w-auto">
//             Obtener Lectura
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
//           {[0, 1, 2].map((index) => (
//             <Card
//               key={index}
//               className={`cursor-pointer transition-all ${
//                 revealedCards[index] ? (
//                   selectedCard?.id === revealedCards[index].id ? "ring-2 ring-primary" : ""
//                 ) : "bg-blue-500"
//               }`}
//               onClick={() => revealedCards[index] && handleCardClick(revealedCards[index])}
//             >
//               <CardContent className="p-4 text-center">
//                 <div className={`w-full h-40 mb-2 flex items-center justify-center ${
//                   revealedCards[index] ? "bg-gray-200 text-gray-500" : "bg-blue-500 text-white"
//                 } ${revealedCards[index]?.isInverted ? "rotate-180" : ""}`}>
//                   {revealedCards[index] ? revealedCards[index].name : "?"}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//         {revealedCards.length > 0 && (
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold mb-2">Lectura completa:</h3>
//             {revealedCards.map((card, index) => (
//               <div key={index} className="mb-2">
//                 <p className="font-medium">{card.name} {card.isInverted ? "(Invertida)" : ""}</p>
//                 <p>{card.isInverted ? card.invertedDescription : card.description}</p>
//               </div>
//             ))}
//           </div>
//         )}
//         {revealedCards.length === 3 && (
//           <Button onClick={handleSaveReading} className="mt-2 w-full sm:w-auto">
//             Guardar Lectura Completa
//           </Button>
//         )}
//       </div>
      
//       <Button 
//         className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-40"
//         onClick={() => setIsReadingsOpen(true)}
//       >
//         <BookOpen className="w-6 h-6" />
//         <span className="sr-only">Ver lecturas guardadas</span>
//       </Button>

//       <SavedReadings 
//         readings={readings} 
//         isOpen={isReadingsOpen} 
//         onClose={() => setIsReadingsOpen(false)} 
//       />
//     </div>
//   )